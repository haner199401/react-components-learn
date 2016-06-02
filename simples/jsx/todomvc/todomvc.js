/**
 * Created by haner on 15/11/9.
 */

var Header = React.createClass({
    render:function() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" placeholder="What needs to be done?"/>
            </header>
        );
    }
});

var TotoMain = React.createClass({
    render:function() {
        return (
            <section className="main">
                <input className="toggle-all" type="checkbox"/>
                    <ul className="todo-list">
                        <TotoItem/>
                    </ul>
            </section>
        );
    }
});

var TotoItem = React.createClass({
    render:function() {
        return (
            <li className="">
                <div className="view">
                    <input className="toggle" type="checkbox"/>
                    <label>Te11st</label>
                    <button className="destroy"/>
                </div>
                <input className="edit" value="123123"/>
            </li>
        );
    }
});

var Footer = React.createClass({
    render:function() {
        return (
            <footer className="footer">
            <span className="todo-count">
                <strong>3</strong>
                <span> items</span>
                <span> left</span>
            </span>
                <ul className="filters">
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

var App = React.createClass({
    render:function() {
        return (
            <div>
                <Header/>
                <TotoMain/>
                <Footer/>
            </div>
        );
    }
});

ReactDOM.render(<App/>,document.getElementById('todoapp'));