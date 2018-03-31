var fs = require('fs')
const quill = require("./quillManager")
var notebookSelected = ""
var noteSelected = ""

module.exports = {
    pathToTodosJson: function () {
        return __dirname + "\\data\\Notebooks.json"
    },

    loadFile: function () {
        return JSON.parse(fs.readFileSync(module.exports.pathToTodosJson(), 'utf8'))

    },

    init: function () {
        fileData = module.exports.loadFile();

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
        fileData = module.exports.loadFile();
        for (var title in fileData[Notebook]) {
            $(".navigation-menu-medium").append(`<p class="note">${title}</p>`)
        }
    },

    loadNote: function () {
        fileData = module.exports.loadFile();
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

