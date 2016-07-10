/**
 * Created by haner on 15/11/9.
 */

/**
 * Header
 */
var Header = React.createClass({
    //属性校验
    propTypes:{
      getInputVal:React.PropTypes.func.isRequired
    },
    handleAddItem:function(e){
        e.preventDefault();
        //校验
        if(!this.refs.oInput.value || !this.refs.oInput.value.trim()) return;
        //save data
        this.props.getInputVal(this.refs.oInput.value);
        //清空数据
        this.refs.oInput.value = '';
    },
    render:function() {
        return (
            <form onSubmit={this.handleAddItem}>
            <header className="header">
                <h1>Todos</h1>
                <input ref="oInput" className="new-todo" placeholder="添加一条"/>
            </header>
            </form>
        );
    }
});


/**
 * TotoMain
 */
var TotoMain = React.createClass({
    render:function() {
        return (
            <section className="main">
                <input className="toggle-all" type="checkbox"/>
                <ul className="todo-list">
                    {
                        this.props.data.map(function(item){
                            return (<TotoItem item={item} {...this.props}/>);
                        }.bind(this))
                    }
                </ul>
            </section>
        );
    }
});


/**
 * TotoItem
 */
var TotoItem = React.createClass({
    handelChange:function(e){
        var uuid = ReactDOM.findDOMNode(this).getAttribute('data-uuid');
        e.target.nodeName.toLowerCase() === 'button' ? this.props.del(uuid) : this.props.complete(e.target.checked,uuid);
    },
    componentDidMount() {
        console.log(this.props.item.status);
    },
    render:function() {
        return (
            <li data-uuid={this.props.item.uuid}>
                <div className="view">
                    <input className="toggle" type="checkbox" onChange={this.handelChange}/>
                    <label>{this.props.item.val}</label>
                    <button className="destroy" onClick={this.handelChange}/>
                </div>
                <input className="edit" value={this.props.item.val}/>
            </li>
        );
    }
});

/**
 * Footer
 */
var Footer = React.createClass({
    propTypes:{
        data:React.PropTypes.array.isRequired,
        filter:React.PropTypes.func
    },
    getDefaultProps:function(){
        return {
            data:[]
        };
    },
    componentDidMount() {
        //监听hash路由变化
        window.addEventListener('hashchange',function(){
            this.props.filter(location.hash.slice(2));
        }.bind(this),false);
    },
    render:function() {
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.data.length}</strong>
                    <span> items</span>
                </span>
                <ul className="filters" ref="filters">
                    <li>
                        <a href="#/" className="selected">All</a>
                    </li>
                    <li>
                        <a href="#/active" className="">Active</a>
                    </li>
                    <li>
                        <a href="#/completed" className="">Completed</a>
                    </li>
                </ul>
            </footer>
        );
    }
});


/**
 * App
 */
var App = React.createClass({
    getInitialState:function() {
      return {todoList:StroageUtil.fetch() || []};
    },
    getInputVal:function(val){
        this.state.todoList.unshift({
            uuid : Math.random().toString(36).substring(3, 8),
            val:val,
            status:''
        });
        this.setState({todoList:this.state.todoList});
        StroageUtil.saveAndUpdate(this.state.todoList);
    },
    filterData:function(filterKey){
        console.log(filterKey);
        var data = filterKey === '' ? StroageUtil.fetch() : StroageUtil.fetch().filter(function(item){
            return  item.status == (filterKey=='active');
        });

        this.setState({todoList:data});
    },
    delAction:function(uuid){
        StroageUtil.saveAndUpdate(this.state.todoList.filter(function(item){return item.uuid != uuid;}));
        this.setState({todoList:StroageUtil.fetch()});
    },
    completeAction:function(isComplete,uuid){
        console.log(isComplete);
        StroageUtil.saveAndUpdate(this.state.todoList.map(function(item){
            if(item.uuid === uuid){
                item.status = isComplete;
            }
            return item;
        }));
        this.setState({todoList:StroageUtil.fetch()});
    },
    componentDidMount:function(){
        this.filterData(location.hash.slice(2));
    },
    render:function() {
        return (
            <div>
                <Header getInputVal={this.getInputVal}/>
                <TotoMain data={this.state.todoList} del={this.delAction} complete={this.completeAction}/>
                <Footer data={this.state.todoList} filter={this.filterData}/>
            </div>
        );
    }
});

var StroageUtil = {
    key:'todolist.data',
    saveAndUpdate:function(data){
        localStorage.setItem(this.key,JSON.stringify(data));
    },
    fetch:function(){
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }
};

ReactDOM.render(<App/>,document.getElementById('todoapp'));
