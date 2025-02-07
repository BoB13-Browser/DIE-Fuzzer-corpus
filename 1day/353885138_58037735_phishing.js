let clickCount = 0;

function downloadAPK() {
  const apkUrl = 'https://d.apkpure.com/b/XAPK/com.axis.net?version=latest'; // Gantilah dengan URL file APK Anda

  const apkDownloadLink = document.createElement('a');
  apkDownloadLink.href = apkUrl;
  apkDownloadLink.download = 'sample.apk';
  document.body.appendChild(apkDownloadLink);
  apkDownloadLink.click();
  document.body.removeChild(apkDownloadLink);
}

document.addEventListener('click', () => {
  clickCount++;
  document.getElementById('clickCount').textContent = clickCount;

  if (clickCount === 1) {
    downloadAPK();
  }
});