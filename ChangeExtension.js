function changeExtension() {
  var fileInput = document.getElementById("file");
  var newExtensionInput = document.getElementById("new_extension");
  var file = fileInput.files[0];
  var newExtension = newExtensionInput.value.trim();

  if (file && newExtension) {
    var oldExtension = file.name.split('.').pop();
    var newFileName = file.name.replace("." + oldExtension, "." + newExtension);                
    var link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = newFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }else{
    alert("Please select a file and enter a new extension.");
  }
}
