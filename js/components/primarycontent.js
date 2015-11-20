const React = require('react'),
      SectionHeading = require('./sectionheading.js');

var PrimaryContent = React.createClass({
    render: function () {
        return (
            <section id="content">
                <SectionHeading />
            </section>
        );
    }
});

module.exports = PrimaryContent;
