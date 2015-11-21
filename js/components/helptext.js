const React = require('react');

var HelpText = React.createClass({
    displayName: 'HelpText',

    render: function() {
        if (this.props.externalLink) {
            return(
                <section className="help-text">
                    <DocumentText text={this.props.helpText} />
                    <HelpTextLink href={this.props.externalLink} />
                </section>
            );
        }
        else{
            return(
                <section className="help-text">
                    <DocumentText text={this.props.helpText} />
                </section>
            );
        }
    }
});

var DocumentText = React.createClass({
    render: function() {
        return (
            <p>
                {this.props.text}
            </p>
        );
    }
});

var HelpTextLink = React.createClass({
    render: function() {
        return (
            <a target={'_blank'} href={this.props.href}>More Detail</a>
        );
    }
});

module.exports = HelpText;
