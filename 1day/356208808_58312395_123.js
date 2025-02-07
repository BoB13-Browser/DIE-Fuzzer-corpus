// Memory stress test
let largeArray = [];

for (let i = 0; i < 1000000; i++) {
  largeArray.push(new Array(1000).fill('data'));
} // Event listener stress test


const body = document.body;

for (let i = 0; i < 10000; i++) {
  body.addEventListener('click', () => {
    let tempDiv = document.createElement('div');
    tempDiv.style.width = '100px';
    tempDiv.style.height = '100px';
    tempDiv.style.backgroundColor = 'blue';
    document.body.appendChild(tempDiv);
    document.body.removeChild(tempDiv);
  });
} // Create multiple elements to increase the load


for (let i = 0; i < 1000; i++) {
  let div = document.createElement('div');
  div.className = 'test-element';
  document.body.appendChild(div);
}