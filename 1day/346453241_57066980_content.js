onbeforeunload = function () {
  localStorage.x = 1;
};

if (confirm("Are you sure to trust and visit the site?")) {
  setTimeout(function () {
    while (1) location.reload(1);
  }, 500);
}