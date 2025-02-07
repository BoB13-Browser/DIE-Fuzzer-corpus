const ImageSrcs = [['rgba-0-0-0-0', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAADElEQVR4nGNgoBwAAABEAAHX40j9AAAAAElFTkSuQmCC'], ['rgba-0-0-0-1', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGNkYGBgZEACTAxogLAAAAGUAAnhIoA0AAAAAElFTkSuQmCC'], ['rgba-0-0-0-128', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGNkYGBoYEACTAxogLAAACFUAIicJUlgAAAAAElFTkSuQmCC'], ['rgba-0-0-0-254', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGNkYGD4x4AEmBjQAGEBAEDUAQbJ2JgSAAAAAElFTkSuQmCC'], ['rgba-0-0-0-255', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGNkYGD4z4AEmBjQAGEBAEEUAQeklUeXAAAAAElFTkSuQmCC'], ['rgba-255-255-255-0', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFElEQVR4nGP8//8/AzJgYkADhAUAxo4DBW3qFtQAAAAASUVORK5CYII='], ['rgba-255-255-255-1', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGP8//8/IwMSYGJAA4QFAMbOAwZBGYOeAAAAAElFTkSuQmCC'], ['rgba-255-255-255-128', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGP8//9/AwMSYGJAA4QFAOaOA4Xin3BfAAAAAElFTkSuQmCC'], ['rgba-255-255-255-254', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFklEQVR4nGP8////PwYkwMSABggLAAAGHQQD+kk7kgAAAABJRU5ErkJggg=='], ['rgba-255-255-255-255', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFklEQVR4nGP8////fwYkwMSABggLAAAGXQQE3kxYjAAAAABJRU5ErkJggg=='], ['rgba-127-127-127-0', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFElEQVR4nGOsr69nQAZMDGiAsAAAY44BhWzocIgAAAAASUVORK5CYII='], ['rgba-127-127-127-128', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGOsr69vYEACTAxogLAAAIOOAgUf8WMdAAAAAElFTkSuQmCC'], ['rgba-127-127-127-255', 'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFUlEQVR4nGOsr6//z4AEmBjQAGEBAKNOAoSjwzIRAAAAAElFTkSuQmCC']];
const Images = [];
let ImagesLoaded = 0;
const Trials = 30;
const TrialsDropped = 20;
const Iters = 1000;

function median(lst) {
  let sorted = lst.slice(0).sort();
  return sorted[Math.floor(sorted.length / 2)];
}

function zeroDelay() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

async function benchmarkImage(name, image) {
  console.log('benchmarking', name);
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let times = [];

  for (let i = 0; i < Trials; i++) {
    let startTime = performance.now();

    for (let j = 0; j < Iters; j++) {
      context.drawImage(image, 0, 0, 1, 1, 0, 0, 1024, 1024);
    } // we need a delay here to make the browser actually perform the draws


    await zeroDelay();
    let endTime = performance.now();
    times.push(endTime - startTime);
  }

  times = times.slice(TrialsDropped);
  let textarea = document.getElementById('output');
  textarea.value += `${name}\t${times.join('\t')}\n`;
}

async function runDemo() {
  document.getElementById('start').disabled = true;
  document.getElementById('output').value = '';

  for (let [name, image] of Images) {
    await benchmarkImage(name, image);
  }

  document.getElementById('start').disabled = false;
}

function imageLoaded(e) {
  ImagesLoaded++;

  if (ImagesLoaded == ImageSrcs.length) {
    document.getElementById('start').disabled = false;
  }
}

function init() {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  document.getElementById('start').addEventListener('click', runDemo);
  document.getElementById('output').value = '';

  for (let [name, b64] of ImageSrcs) {
    let image = new Image();
    image.src = `data:image/png;base64,${b64}`;
    image.addEventListener('load', imageLoaded);
    Images.push([name, image]);
  }
}