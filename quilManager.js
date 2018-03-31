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
    theme: 'snow',
  });