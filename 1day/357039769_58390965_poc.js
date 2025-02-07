function triggerCrash() {
  const inputValue = "invalid://uri";

  if (inputValue === "invalid://uri") {
    // crash by causing excessive resource usage
    try {
      const container = document.createElement('div');
      document.body.appendChild(container);
      let i = 0;

      function createElements() {
        for (let j = 0; j < 1000000; j++) {
          const element = document.createElement('div');
          element.textContent = 'Crash Test ' + i++;
          container.appendChild(element);
        }

        if (i < 10000000) {
          requestAnimationFrame(createElements); // Continue without yielding
        }
      }

      createElements();
    } catch (e) {
      setTimeout(() => {
        throw new Error('Simulated crash due to excessive DOM manipulation');
      }, 100);
    }
  }
}

window.onload = triggerCrash;