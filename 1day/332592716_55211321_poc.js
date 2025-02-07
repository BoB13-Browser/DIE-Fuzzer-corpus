var session = null;
model.createGenericSession().then(resolve => {
  for (let i = 0; i < 0x10000; i++) {
    resolve.executeStreaming("test");
  }
});