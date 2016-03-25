/**
 * Created by haner on 16/3/25.
 *
 *
 * ref 可拿到真是 DOM  或者传入 函数 回调出 real dom
 */
var App = React.createClass({
    getInitialState: function() {
        return {userInput: ''};
    },
    handleChange: function(e) {
        this.setState({userInput: this.refs.theInput.value});
    },
    render: function() {
        return (
            <div className="row">
                <h3>
                    {this.state.userInput}
                </h3>
                <input ref="theInput" value={this.state.userInput} onChange={this.handleChange} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('container')
);


/**
 * 通过回调 达到 双向数据绑定
 */
var MainApp = React.createClass({
    getInitialState: function() {
        return {val: ''};
    },
    receiveValue: function(val) { //回调子组件所传过来的数据
        this.setState({val: val});
    },
    render: function() {
        return (
            <div className="row">
                <OutInoup val={this.state.val}/>
                <InInput userInput={this.receiveValue}/>
            </div>
        );
    }
});


var InInput = React.createClass({
    handleChange: function () {
      this.props.userInput(this.refs.theInput.value);
    },
    render: function() {
        return (
            <div>
                <input ref="theInput" onChange={this.handleChange} />
            </div>
        );
    }
});

var OutInoup = React.createClass({
    render: function() {
        return (<h3> {this.props.val}</h3>);
    }
});

ReactDOM.render(
    <MainApp />,
    document.getElementById('myComponent')
);


var MyComponent = React.createClass({
    getRealDom:function(oInput){
        $(oInput).val('234234234');  //ref 此时拿到的为渲染之后的真是 dom
        this.myTextInput = oInput;
    },
    handleClick: function() {
        if (this.myTextInput !== null) {
            this.myTextInput.focus();
        }
    },
    render: function() {
        return (
            <div>
                <input type="text" ref={this.getRealDom} />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.handleClick}
                />
            </div>
        );
    }
});

ReactDOM.render(
    <MyComponent />,
    document.getElementById('example')
);