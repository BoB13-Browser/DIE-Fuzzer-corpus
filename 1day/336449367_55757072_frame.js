for (var i = 0; i < 10000; i++) {
  setTimeout(() => {
    window.model.canCreateGenericSession();
  }, 100);
}