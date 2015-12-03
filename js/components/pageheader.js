const React = require('react');

var PageHeader = React.createClass({
    render: function () {
        var headerLine1 = "Welcome to Team Data\'s Human Development Comparator v 0.89";
        var headerLine2 = "This site is a work in progress, pardon our dust";
        return (
            <header id="header">
                <h1>{headerLine1}</h1>
                <h2>{headerLine2}</h2>
            </header>
        );
    }
});

module.exports = PageHeader;
