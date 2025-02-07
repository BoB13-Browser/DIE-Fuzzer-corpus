function createWebAssemblyMemories(count, size) {
  for (let i = 0; i < count; ++i) {
    new WebAssembly.Memory({
      initial: size
    });
  }
}

setInterval(async function () {
  createWebAssemblyMemories(100, 100);
}, 1);
setTimeout(async function () {
  location.reload();
}, Math.floor(Math.random() * 5000));
setTimeout(async function () {
  let adapter = await navigator.gpu.requestAdapter();
  let device = await adapter.requestDevice();
  let shaderCode = `

        `;
  device.createShaderModule({
    code: shaderCode
  });
  let encoder = device.createCommandEncoder();

  for (var i = 0; i < 1000; ++i) {
    device.queue.submit([encoder.finish()]);
  }
}, 0);