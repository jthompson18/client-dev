const React = require('react'),
      PageHeader = require('./components/pageheader.js'),
      PageFooter = require('./components/pagefooter.js'),
      PrimaryContent = require('./components/primarycontent.js');

var Wrapper = React.createClass({
    render: function () {
        return (
            <section>
                <PageHeader />
                <PrimaryContent />
                <PageFooter />
            </section>
        );
    }
});

module.exports = Wrapper;
