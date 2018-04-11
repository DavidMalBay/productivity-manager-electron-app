const Quill = require('quill');


var container = $('#quillEditor').get(0)
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{
    'header': [1, 2, 3, 4, 5, 6, false]
  }],
  ['link', 'image'], // add's image support
  [{
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }], // outdent/indent
  [{
    'color': []
  }, {
    'background': []
  }], // dropdown with defaults from theme
  [{
    'font': []
  }],
  [{
    'align': []
  }],
  ['clean'] // remove formatting button
];
var quill = new Quill(container, {
  modules: {
    toolbar: toolbarOptions,
    // bindings: bindings
  },
    theme: 'snow',
  });
    

  
    $("#note-title").keydown(function (e) {    
      if (e.which == 9) {
       quill.focus()
        e.preventDefault();
      }
    });


module.exports = {
  init: function(){

    // if(!($('#toolbar').length)){
    //   $("quillEditor").remove()

    // }
      
    // else{
    //   console.log("no more")
    // }
    
  },

  setContent: function(content){
    quill.setContents(content)
  },

  clear: function(){
    quill.setText("")
  },

  focus: function(){
    quill.focus()
  },

  contents: function(){
    return quill.getContents()
  }

  
}