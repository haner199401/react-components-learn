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

    },
    render:function() {
        return (
            <li data-uuid={this.props.item.uuid} className={this.props.item.status ? 'completed':''}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={this.props.item.status} onChange={this.handelChange}/>
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
    getInitialState:function(){
        return {
            active:''
        }
    },
    componentDidMount() {
        this.props.filter(location.hash.slice(2));
        this.setState({active:location.hash.slice(2)});
        //监听hash路由变化
        window.addEventListener('hashchange',function(){
            this.props.filter(location.hash.slice(2));
            this.setState({active:location.hash.slice(2)});
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
                        <a href="#/" className={!this.state.active ? 'selected' :''}>All</a>
                    </li>
                    <li>
                        <a href="#/active" className={this.state.active=='active' ? 'selected' :''}>Active</a>
                    </li>
                    <li>
                        <a href="#/completed" className={this.state.active=='completed' ? 'selected' :''}>Completed</a>
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
        var data = StroageUtil.fetch();
        data.unshift({
            uuid : Math.random().toString(36).substring(3, 8),
            val:val,
            status:''
        });
        StroageUtil.saveAndUpdate(data);
        this.filterData();
    },

    filterData:function(filterKey){
        filterKey = filterKey || location.hash.slice(2);

        var data = filterKey === '' ? StroageUtil.fetch() : StroageUtil.fetch().filter(function(item){
            return  item.status == !(filterKey=='active');
        });

        this.setState({todoList:data});
    },

    delAction:function(uuid){
        StroageUtil.saveAndUpdate(StroageUtil.fetch().filter(function(item){return item.uuid != uuid;}));
        this.filterData();
    },

    completeAction:function(isComplete,uuid){
        StroageUtil.saveAndUpdate(StroageUtil.fetch().map(function(item){
            if(item.uuid === uuid){
                item.status = isComplete;
            }
            return item;
        }));
        this.filterData();
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
