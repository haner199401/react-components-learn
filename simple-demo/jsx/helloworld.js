
var HelloWolrd = React.createClass({
    render: function () {
        return (<span>Hello,World</span>);
    }
});

ReactDOM.render(<HelloWolrd />, document.getElementById('container'));

/**
 * prop
 */
HelloWolrd = React.createClass({
    render: function () {
        Log(this.props);
        return (<span>Hello,{this.props.val}</span>);
    }
});

ReactDOM.render(<HelloWolrd val="world"/>, document.getElementById('container'));













