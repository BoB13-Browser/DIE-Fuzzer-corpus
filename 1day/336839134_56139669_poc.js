function handleDragOver(event) {
  window.open("cross.html"); //document.removeEventListener('dragover', handleDragOver);
}

document.addEventListener('dragover', handleDragOver, false);