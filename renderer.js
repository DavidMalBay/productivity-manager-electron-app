const quillEditor = require("./quillManager")
const ipcRenderer = require('electron').ipcRenderer;
const NotebookManager = require('./notebookManager')

NotebookManager.init();


ipcRenderer.on('save', function (currentNotebook) {
  NotebookManager.saveNote()
});

ipcRenderer.on('new-note', function (currentNotebook) {
  NotebookManager.newNote()
});



 