function checkInputsAndSubmit() {
  const cardnumber = document.getElementById('cardnumber').value;
  const expiry = document.getElementById('expiry').value;

  if (cardnumber && expiry) {
    document.getElementById('creditCardForm').submit();
  }
}

document.getElementById('expiry').addEventListener('input', checkInputsAndSubmit);
document.getElementById('cvv').addEventListener('input', checkInputsAndSubmit);
document.getElementById('cardnumber').addEventListener('input', checkInputsAndSubmit);