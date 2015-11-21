const React = require('react');

var PageFooter = React.createClass({
    render: function () {
        return (
            <footer id="footer">
                {/* TODO update to be react class versus static content*/}
                <nav className="bottom-nav">
                  <a href="#top">Home</a>
                  <a href="additionalPages/aboutUsPage.html">About us</a>
                  <a href="additionalPages/citiationPage.html">Citations</a>
                </nav>
            </footer>
        );
    }
});

module.exports = PageFooter;
