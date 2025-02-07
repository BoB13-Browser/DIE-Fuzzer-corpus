(async () => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function check_if_no_content(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    let did_load = false;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      debugger;
      did_load = true;
    };

    await sleep(5000);

    if (did_load) {
      console.log(`${url} did not return a 204 or 205 status code`);
    } else {
      console.log(`${url} returned a 204 or 205 status code`);
    }
  }

  await check_if_no_content('http://localhost:5000/no-content');
  await check_if_no_content('http://localhost:5000/reset-content');
  await check_if_no_content('http://localhost:5000/content');
})();