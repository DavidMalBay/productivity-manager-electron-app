require("./quillManager")
const ipcRenderer = require('electron').ipcRenderer;
const NotebookManager = require('./notebookManager')

NotebookManager.init();


ipcRenderer.on('save', function (currentNotebook) {
  console.log("saving file")
});

