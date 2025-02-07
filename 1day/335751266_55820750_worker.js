'use strict';

const badChunks = [{
  name: 'undefined',
  value: undefined
}, {
  name: 'null',
  value: null
}, {
  name: 'numeric',
  value: 3.14
}, {
  name: 'object, not BufferSource',
  value: {}
}, {
  name: 'array',
  value: [65]
}, {
  name: 'SharedArrayBuffer',

  get value() {
    return new WebAssembly.Memory({
      shared: true,
      initial: 1,
      maximum: 1
    }).buffer;
  }

}, {
  name: 'shared Uint8Array',

  get value() {
    return new Uint8Array(new WebAssembly.Memory({
      shared: true,
      initial: 1,
      maximum: 1
    }).buffer);
  }

}];

function testGzip(chunk) {
  return new Promise((resolve, reject) => {
    const cs = new CompressionStream('gzip');
    const reader = cs.readable.getReader();
    const writer = cs.writable.getWriter();
    const writePromise = writer.write(chunk.value);
    const readPromise = reader.read();
    Promise.all([writePromise.catch(e => {
      if (e instanceof TypeError) {
        console.log(`Write rejected as expected for chunk of type ${chunk.name} with gzip`);
        return 'write_rejected';
      } else {
        throw e;
      }
    }), readPromise.catch(e => {
      if (e instanceof TypeError) {
        console.log(`Read rejected as expected for chunk of type ${chunk.name} with gzip`);
        return 'read_rejected';
      } else {
        throw e;
      }
    })]).then(results => {
      if (results.includes('write_rejected') && results.includes('read_rejected')) {
        resolve();
      } else {
        reject(new Error('Expected both write and read to be rejected'));
      }
    }).catch(reject);
  });
}

function testDeflate(chunk) {
  return new Promise((resolve, reject) => {
    const cs = new CompressionStream('deflate');
    const reader = cs.readable.getReader();
    const writer = cs.writable.getWriter();
    const writePromise = writer.write(chunk.value);
    const readPromise = reader.read();
    Promise.all([writePromise.catch(e => {
      if (e instanceof TypeError) {
        console.log(`Write rejected as expected for chunk of type ${chunk.name} with deflate`);
        return 'write_rejected';
      } else {
        throw e;
      }
    }), readPromise.catch(e => {
      if (e instanceof TypeError) {
        console.log(`Read rejected as expected for chunk of type ${chunk.name} with deflate`);
        return 'read_rejected';
      } else {
        throw e;
      }
    })]).then(results => {
      if (results.includes('write_rejected') && results.includes('read_rejected')) {
        resolve();
      } else {
        reject(new Error('Expected both write and read to be rejected'));
      }
    }).catch(reject);
  });
}

function testDeflateRaw(chunk) {
  return new Promise((resolve, reject) => {
    const cs = new CompressionStream('deflate-raw');
    const reader = cs.readable.getReader();
    const writer = cs.writable.getWriter();
    const writePromise = writer.write(chunk.value);
    const readPromise = reader.read();
    Promise.all([writePromise.catch(e => {
      if (e instanceof TypeError) {
        console.log(`Write rejected as expected for chunk of type ${chunk.name} with deflate-raw`);
        return 'write_rejected';
      } else {
        throw e;
      }
    }), readPromise.catch(e => {
      if (e instanceof TypeError) {
        console.log(`Read rejected as expected for chunk of type ${chunk.name} with deflate-raw`);
        return 'read_rejected';
      } else {
        throw e;
      }
    })]).then(results => {
      if (results.includes('write_rejected') && results.includes('read_rejected')) {
        resolve();
      } else {
        reject(new Error('Expected both write and read to be rejected'));
      }
    }).catch(reject);
  });
}

Promise.all(badChunks.flatMap(chunk => [testGzip(chunk), testDeflate(chunk), testDeflateRaw(chunk)])).then(() => {
  console.log('Done');
}).catch(error => {
  console.error('Some checks failed:', error);
});