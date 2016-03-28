/**
 * Created by haner on 16/3/28.
 */


var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({
    remove: function (index) {
        this.props.removeItem(index);
    },
    render: function () {
        var createItem = function (text, index) {
            return (<li key={index} onClick={this.remove.bind(this,index)}>{text}</li>);
        }.bind(this);

        return (
            <ul>
                <ReactCSSTransitionGroup transitionName="example"
                                         transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                    {this.props.data.map(createItem)}
                </ReactCSSTransitionGroup>
            </ul>
        );
    }
});


var App = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        this.setState({data: this.state.data.concat([this.refs.text.value])});
        this.refs.text.value = '';
        this.refs.text.focus();
    },
    removeItem: function (index) {
        var newItems = this.state.data.slice();
        newItems.splice(index, 1);
        this.setState({data: newItems});
    },
    render: function () {

        return (
            <div className="row">
                <div className="col-md-12">
                    <h3>TODO</h3>
                    <TodoList data={this.state.data} removeItem={this.removeItem}/>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" ref="text"/>
                        <button>添加第{this.state.data.length + 1}条信息</button>
                    </form>
                </div>
            </div>);
    }
});


ReactDOM.render(<App/>, document.querySelector("#container"));