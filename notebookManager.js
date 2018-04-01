var fs = require('fs')
const quill = require("./quillManager")

var fileData = JSON.parse(fs.readFileSync(__dirname + "\\data\\Notebooks.json", 'utf8'))

var notebookSelected = ""
var noteSelected = ""

module.exports = {

    init: function () {
        for (var key in fileData) {
            $(".navigation-menu").append(`<p class="notebook">${key}</p>`)
        }

        $('.navigation-menu').on('click', '.notebook', function () {
            $(".navigation-menu-medium").find(".note").remove()
            module.exports.displayNotesInNotebook($(this).text())
            notebookSelected = $(this).text()
        });


        $('.navigation-menu-medium').on('click', '.note', function () {
            noteSelected = $(this).text()
            $("#note-title").val($(this).text())
            module.exports.loadNote()

        });
    },

    displayNotesInNotebook: function (Notebook) {
        for (var title in fileData[Notebook]) {
            $(".navigation-menu-medium").append(`<p class="note">${title}</p>`)
        }
    },

    loadNote: function () {
        var editor = fileData[notebookSelected][noteSelected]["editor"]
        var dateCreated = fileData[notebookSelected][noteSelected]["dateCreated"]
        var lastModified = fileData[notebookSelected][noteSelected]["lastModified"]
        var tags = fileData[notebookSelected][noteSelected]["tags"]
        var isStarred = fileData[notebookSelected][noteSelected]["isStarred"]
        var isArchived = fileData[notebookSelected][noteSelected]["isArchived"]
        var content = fileData[notebookSelected][noteSelected]["content"]
        quill.setContent("")
        quill.setContent(content)

        //check file type
        //load desired editor
        //clear editor
        //load the note
        //fileData[activeNotebook][activeNote]["content"]
        //example
        //console.log(fileData["Work"]["Monday Meeting"]["content"])

    }
}

