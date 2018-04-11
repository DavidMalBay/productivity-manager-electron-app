const quillEditor = require("./quillManager")
const ipcRenderer = require('electron').ipcRenderer;
const NotebookManager = require('./notebookManager')
NotebookManager.init();
$("#modal").load("./menu/modal.html")


ipcRenderer.on('save', function (currentNotebook) {
  NotebookManager.saveNote()
});

ipcRenderer.on('new-note', function (currentNotebook) {
  NotebookManager.newNote()
});



ipcRenderer.on('quick-commands', function () {
  $('#context-modal').modal('toggle');
});


$(function () {
  $("[data-toggle='tooltip']").tooltip();
});