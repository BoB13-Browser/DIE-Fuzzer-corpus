const displayMediaOptions = {
  video: {
    displaySurface: "browser"
  },
  audio: {
    suppressLocalAudioPlayback: false
  },
  preferCurrentTab: false,
  selfBrowserSurface: "exclude",
  systemAudio: "include",
  surfaceSwitching: "include",
  monitorTypeSurfaces: "include"
};

function startCapture(displayMediaOptions) {
  return navigator.mediaDevices.getDisplayMedia(displayMediaOptions).catch(err => {
    console.error(err);
    return null;
  });
}

startCapture(displayMediaOptions);