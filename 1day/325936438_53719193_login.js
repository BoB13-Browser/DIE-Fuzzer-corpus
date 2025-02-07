async function test() {
  try {
    const credential = await navigator.credentials.get({
      identity: {
        context: 'signup',
        autoReauthn: false,
        mediation: "optional",
        providers: [{
          configURL: 'http://localhost:8000/config.json',
          clientId: 'aaa',
          nonce: '******'
        }]
      }
    });
  } catch (e) {
    console.log(e);
    IdentityProvider.close();
  }
}

window.onload = async function () {
  setTimeout(() => {
    test();
  }, 200);
};