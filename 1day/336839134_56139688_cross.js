function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var dt = event.dataTransfer;
  var files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /^image\//;

    if (!imageType.test(file.type)) {
      alert("Please drop an image file.");
      continue;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      var dataURL = e.target.result;
      document.getElementById('data_url').value = dataURL;
      document.getElementById('drop_zone').style.display = 'none'; // Hide drop zone

      document.getElementById('image_data').style.display = 'block'; // Show image data container
    };

    reader.readAsDataURL(file);
  }
}