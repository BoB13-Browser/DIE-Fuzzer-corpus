function redirect() {
  var x = window.open('https://amazon.com');
  setTimeout(() => x.location = 'tel:1234', 10000);
}