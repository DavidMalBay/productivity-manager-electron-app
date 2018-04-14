var fs = require('fs')
const quillEditor = require("./quillManager")

var fileData = JSON.parse(fs.readFileSync(__dirname + "\\data\\Notebooks.json", 'utf8'))
// console.log(lastSelectedNotbook)    // give the user the option to set a default open location 
//var lastSelectedNote = //read from userSettings.json
var lastSelectedNotbook = ""
var notebookSelected = "" //if empty should this defualt to last notbook selected or defaultnotbook
var noteSelected = ""
var defaultNotebook = $($(".notebook").get(0)).text()
var saveNotebook = ""


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}
var today = mm + '/' + dd + '/' + yyyy;

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
        lastSelectedNotbook = $($(".notebook").get(0)).text() 


        module.exports.displayNotesInNotebook(lastSelectedNotbook)

        $('.navigation-menu').on('click', '.notebook', function () {
            $(".navigation-menu-medium").find(".note").remove()
            module.exports.displayNotesInNotebook($(this).text())
            $(this).addClass("active-notebook").siblings().removeClass('active-notebook')
            notebookSelected = $(this).text()
        });
        $(`.notebook:contains("${lastSelectedNotbook}")`).click();

        
        $('.navigation-menu').on('keypress', '.notebook', function () {
            var keyC = e.keyCode;
            if (keyC == 32) {
                 alert('Enter pressed');
            }
        

        });

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
        if (notebookSelected == "") {
            notebookSelected = lastSelectedNotbook
        }
        var editor = fileData[notebookSelected][noteSelected]["editor"]
        var dateCreated = fileData[notebookSelected][noteSelected]["dateCreated"]
        var lastModified = fileData[notebookSelected][noteSelected]["lastModified"]
        var tags = fileData[notebookSelected][noteSelected]["tags"]
        var isStarred = fileData[notebookSelected][noteSelected]["isStarred"]
        var isArchived = fileData[notebookSelected][noteSelected]["isArchived"]
        var content = fileData[notebookSelected][noteSelected]["content"]
        if (editor == "Quill") {
            $("#editor").hide()
            module.exports.showQuill()
            quillEditor.init()
            quillEditor.clear();
            quillEditor.setContent(content)
        } else if (editor == "Monaco") {
            module.exports.hideQuill()
            $("#editor").show()
            monaco.editor.getModels()[0].setValue(content)


        }



        //check file type
        //load desired editor
        //clear editor
        //load the note
        //fileData[activeNotebook][activeNote]["content"]
        //example
        //console.log(fileData["Work"]["Monday Meeting"]["content"])

    },

    showQuill: function () {
        $("#quillEditor").show()
        $(".ql-toolbar").show()
    },

    hideQuill: function () {
        $("#quillEditor").hide()
        $(".ql-toolbar").hide()
    },



    newNote: function () {
        //save any new changes
        //clear the editor
        //set focus on the title
        //check for default editor or check for specific key to open up quillEditor.js
        //want to give the user flexibility on which he wants to choose as the editor
        $("#note-title").val("")
        $("#note-title").focus()
        if ($("#quillEditor").is(":visible")) {

            quillEditor.clear();

        } else {
            monaco.editor.getModels()[0].setValue("")
        }

    },

    saveNote: function () {
        //check if its a new note or if you should update an existing note instead
        var noteTitle = $("#note-title").val()
        if ($("#quillEditor").is(":visible")) {
            var noteEditor = "Quill"
            var noteContents = quillEditor.contents()

        } else {
            var noteEditor = "Monaco"
            var noteContents = monaco.editor.getModels()[0].getValue()
        }
        if (notebookSelected == "") {
            saveNotebook = defaultNotebook
        } else {
            saveNotebook = notebookSelected
        }
        var noteInformation = {
            editor: noteEditor,
            dateCreated: today, // dont hard code this if first time saving set if not leave it untouched
            lastModified: today, //get current date/time
            tags: "", //come up with a good way to add tags
            isStared: "0", //come up with a way to detect this
            isArchived: "0", //check if the note is archived or not, if you are archiving it then you should trigger this
            content: noteContents
        }

        fileData[saveNotebook][noteTitle] = noteInformation
        fs.writeFile(__dirname + "\\data\\Notebooks.json", JSON.stringify(fileData), function () {})
        $(`.notebook:contains("${notebookSelected}")`).click();


        //if new make sure you append the new item to the notes list currently this isnt working
    },

    newNotebook: function (nameOfNotebook) {
        //need to handle multi space names
        fileData[nameOfNotebook] = {}
        fs.writeFile(__dirname + "\\data\\Notebooks.json", JSON.stringify(fileData), function () {})
        console.log("created")
        $(".navigation-menu").append(`<p class="notebook">${nameOfNotebook}</p>`)
        $(`.notebook:contains("${nameOfNotebook}")`).click();

    },

    deleteNotebook: function (nameOfNotebook) {
        //need to handle multi space names
        if (fileData[nameOfNotebook]) {
            delete fileData[nameOfNotebook]
            fs.writeFile(__dirname + "\\data\\Notebooks.json", JSON.stringify(fileData), function () {})
            console.log("deleted")
            // $(".navigation-menu").append(`<p class="notebook">${key}</p>`)
            $(`.notebook:contains("${nameOfNotebook}")`).remove();

        } else {
            console.log("No such notebook exists")
        }

    }

}

module.exports.hideQuill()