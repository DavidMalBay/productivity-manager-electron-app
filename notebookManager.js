var fs = require('fs')

module.exports = {
    pathToTodosJson: function () {
        return __dirname + "\\data\\Notebooks.json";
    },
    init: function () {
        text = JSON.parse(fs.readFileSync(module.exports.pathToTodosJson(), 'utf8'))
        for (var key in text) {
            $(".navigation-menu").append(`<p">${key}</p>`)
            for(var title in text[key]){
                var editor = text[key][title]["editor"]
                var dateCreated = text[key][title]["dateCreated"]
                var lastModified = text[key][title]["lastModified"]
                var tags = text[key][title]["tags"]
                var isStarred = text[key][title]["isStarred"]
                var isArchived = text[key][title]["isArchived"]
                var content = text[key][title]["content"]
                $(".navigation-menu-medium").append(`<p>${title}</p>`)
                console.log(content)
            }
        }
    },

    loadNote: function() {
        //check file type
        //load desired editor
        //clear editor
        //load the note
        //text[activeNotebook][activeNote]["content"]
        //example
        //console.log(text["Work"]["Monday Meeting"]["content"])

    }

}