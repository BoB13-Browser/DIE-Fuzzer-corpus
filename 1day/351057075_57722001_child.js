function attemptCloseTop() {
  try {
    top.close();
    alert('Attempt to close top window was made.');
  } catch (e) {
    alert('Failed to close top window: ' + e.message);
  }
}

window.onload = attemptCloseTop;