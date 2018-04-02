var fs = require('fs')
const quillEditor = require("./quillManager")

var fileData = JSON.parse(fs.readFileSync(__dirname + "\\data\\Notebooks.json", 'utf8'))
var lastSelectedNotbook = "Work" // give the user the option to set a default open location 
//var lastSelectedNote = //read from userSettings.json
var notebookSelected = "" //if empty should this defualt to last notbook selected or defaultnotbook
var noteSelected = ""
var defaultNotebook = "Work"
var saveNotebook = ""

// function truncate(string){
//     if (string.length > 20)
//        return string.substring(0,20)+'...';
//     else
//        return string;
//  };

module.exports = {

    init: function () {
        for (var key in fileData) {
            // key = truncate(key)
            $(".navigation-menu").append(`<p class="notebook">${key}</p>`)
        }

        module.exports.displayNotesInNotebook(lastSelectedNotbook)

        $('.navigation-menu').on('click', '.notebook', function () {
            $(".navigation-menu-medium").find(".note").remove()
            module.exports.displayNotesInNotebook($(this).text())
            $(this).addClass("active-notebook").siblings().removeClass('active-notebook')
            notebookSelected = $(this).text()
        });
        $(`.notebook:contains("${lastSelectedNotbook}")`).click();


        $('.navigation-menu-medium').on('click', '.note', function () {
            noteSelected = $(this).text()
            $(this).addClass("active-note").siblings().removeClass('active-note')
            $("#note-title").val($(this).text())
            module.exports.loadNote()

        });

    },

    displayNotesInNotebook: function (Notebook) {
        for (var title in fileData[Notebook]) {
            // title = truncate(title)
            $(".navigation-menu-medium").append(`<p class="note">${title}</p>`)
        }
    },

    loadNote: function () {
        if(notebookSelected == ""){
            notebookSelected = lastSelectedNotbook
        } 
        var editor = fileData[notebookSelected][noteSelected]["editor"]
        var dateCreated = fileData[notebookSelected][noteSelected]["dateCreated"]
        var lastModified = fileData[notebookSelected][noteSelected]["lastModified"]
        var tags = fileData[notebookSelected][noteSelected]["tags"]
        var isStarred = fileData[notebookSelected][noteSelected]["isStarred"]
        var isArchived = fileData[notebookSelected][noteSelected]["isArchived"]
        var content = fileData[notebookSelected][noteSelected]["content"]
        quillEditor.clear();
        quillEditor.setContent(content)

        //check file type
        //load desired editor
        //clear editor
        //load the note
        //fileData[activeNotebook][activeNote]["content"]
        //example
        //console.log(fileData["Work"]["Monday Meeting"]["content"])

    },

    newNote: function () {
        //save any new changes
        //clear the editor
        //set focus on the title
        //check for default editor or check for specific key to open up quillEditor.js
        //want to give the user flexibility on which he wants to choose as the editor
        quillEditor.clear();
        $("#note-title").val("")
        $("#note-title").focus()
    },

    saveNote: function () {
        //check if its a new note or if you should update an existing note instead
        var noteTitle = $("#note-title").val()
        var noteContents = quillEditor.contents()
        var noteEditor = "Quill"
        if (notebookSelected == "") {
            console.log("no folder selected")
            saveNotebook = defaultNotebook
        } else {
            saveNotebook = notebookSelected
        }
        var noteInformation = {
            editor: noteEditor,
            dateCreated: "3/3/10", // dont hard code this if first time saving set if not leave it untouched
            lastModified: "3/3/10", //get current date/time
            tags: "", //come up with a good way to add tags
            isStared: "0", //come up with a way to detect this
            isArchived: "0", //check if the note is archived or not, if you are archiving it then you should trigger this
            content: noteContents
        }

        fileData[saveNotebook][noteTitle] = noteInformation
        fs.writeFile(__dirname + "\\data\\Notebooks.json", JSON.stringify(fileData), function () {
        }) 
        $(`.notebook:contains("${notebookSelected}")`).click();


        //if new make sure you append the new item to the notes list currently this isnt working
    },
    
    newNotebook: function(nameOfNotebook){
        fileData[nameOfNotebook] = {}
        fs.writeFile(__dirname + "\\data\\Notebooks.json", JSON.stringify(fileData), function () {
        }) 
        console.log("created")
    },

    deleteNotebook: function(nameOfNotebook){
        if(fileData[nameOfNotebook]){
            delete fileData[nameOfNotebook]
            fs.writeFile(__dirname + "\\data\\Notebooks.json", JSON.stringify(fileData), function () {
            }) 
            console.log("deleted")
        }
        else{
            console.log("No such notebook exists")
        }
        
    }

}