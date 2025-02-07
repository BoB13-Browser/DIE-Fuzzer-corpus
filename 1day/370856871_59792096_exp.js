clientX = 1748;
clientY = 20;
const mousePositionDiv = document.getElementById('mouse-position');
document.addEventListener('mousemove', event => {
  const x = event.clientX;
  const y = event.clientY;
  mousePositionDiv.textContent = `Mouse Position: (${x}, ${y})`;
});
const button = document.getElementById('myButton');
button.addEventListener('mousedown', () => {
  const a = document.createElement('a');
  a.href = 'http://localhost:8000/a.exe';
  a.download = 'a.exe';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
button.addEventListener('mouseup', () => {
  console.log("mouseup");
  document.writeln("backdoor_" + clientX + "_" + clientY);
});