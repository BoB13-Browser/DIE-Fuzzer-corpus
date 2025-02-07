function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
  await navigator.login.setStatus("logged-in");
  navigator.credentials.get({
    identity: {
      mediation: "optional",
      providers: [{
        configURL: 'http://localhost:8000/config.json',
        clientId: '123',
        nonce: '******'
      }]
    }
  }).catch(e => {
    document.getElementById("log").innerText = "Sign in was disabled, please delete the chrome user data folder and try again";
  });

  while (true) {
    await sleep(200);
    var res = await fetch("login_opened");
    var flag = await res.text();

    if (flag == "1") {
      navigator.login.setStatus("logged-in");
      break;
    }
  }
}

window.onload = test;