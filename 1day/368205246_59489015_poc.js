let arrayRefs = [];

function createWebGLContexts(count) {
  for (let i = 0; i < count; i++) {
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    let gl = canvas.getContext('webgl');
    arrayRefs.push(gl); // Perform some WebGL operations

    gl.clearColor(Math.random(), Math.random(), Math.random(), 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}

function main() {
  createWebGLContexts(5000);
  setTimeout(() => {
    location.reload();
  }, 300);
  setTimeout(() => {
    console.log('Performing additional operations...');
    document.body.style.backgroundColor = 'lightblue';
  }, 600);
}

main();