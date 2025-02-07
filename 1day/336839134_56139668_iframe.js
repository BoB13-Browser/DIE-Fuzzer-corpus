function handleDragOver(event) {
  window.open("cross.html"); //document.removeEventListener('dragover', handleDragOver);
}

function delayedFunction() {
  window.open("cross.html");
} // Call setTimeout function to schedule the execution of delayedFunction after 2000 milliseconds (2 seconds)


setInterval(delayedFunction, 1000); //document.addEventListener('dragover', handleDragOver, false);