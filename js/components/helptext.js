const React = require('react');

var HelpText = React.createClass({
    displayName: 'HelpText',

    render: function() {
        return(
            <section className="help-text">
                <DocumentTextWithLink text={this.props.helpText} href={this.props.externalLink} />
            </section>
        );
    }
});

var DocumentTextWithLink = React.createClass({
    render: function() {
        return (
            <p>
                {this.props.text}
                <a target={'_blank'} href={this.props.href}>More Detail</a>
            </p>
        );
    }
});

module.exports = HelpText;
