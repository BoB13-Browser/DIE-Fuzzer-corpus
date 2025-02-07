function F0() {
  if (!new.target) {
    throw 'must be called with new';
  }

  const v2 = this.constructor;

  try {
    new v2();
  } catch (e) {}

  const v5 = d8.getExtrasBindingObject();
  v5.setContinuationPreservedEmbedderData(this);
  const v7 = v5.getContinuationPreservedEmbedderData();
  const v8 = v7.constructor;

  try {
    new v8(this, F0, F0);
  } catch (e) {}

  try {
    v7.constructor();
  } catch (e) {}
}

new F0();