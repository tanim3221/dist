 var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('img_view_showing');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }; //img_view