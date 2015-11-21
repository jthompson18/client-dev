const React = require('react');

var Table = React.createClass({
    render: function () {
        var rows = [];
        console.log(this);

        return (
            <section className="data-table">
                <table className="table">
                    <thead>
                        <tr></tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </section>
        );
    }
});

var HeaderRow = React.createClass({
    render: function () {
        return (
            <tr className="row header-row"></tr>
        );
    }
});

var Row = React.createClass({
    render: function () {
        return (
            <tr></tr>
        );
    }
});

var Cell = React.createClass({
    render: function () {
        return (
            <td></td>
        );
    }
});

module.exports = Table;
