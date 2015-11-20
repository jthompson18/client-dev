const $ = require('jquery');
global.jQuery = $;

module.exports = {

    load: function(file) {
        var jqxhr = jQuery.get('data/' + file, function () {

        }).done(function (data) {
            console.log(data);
        }).fail(function (err) {
            console.error(err);
        });
    }

};
