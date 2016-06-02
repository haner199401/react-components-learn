/**
 * HelloWold
 */
var HelloWolrd = React.createClass({
    render: function () {
        return (<span>Hello,World</span>);
    }
});

ReactDOM.render(<HelloWolrd />, document.getElementById('helloworld'));




/**
 * 属性传递
 */
HelloWolrd = React.createClass({
    render: function () {
        return (<span>This prop is "{this.props.val}"</span>);
    }
});

ReactDOM.render(<HelloWolrd val="world"/>, document.getElementById('helloworld2'));
















