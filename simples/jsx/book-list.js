/**
 * Created by haner on 16/3/25.
 * 生命周期
 * https://segmentfault.com/a/1190000004168886
 */


/**
 * 列
 */
var BookRow = React.createClass({
    setClassName: function () {
        var className = ['success', 'info', 'warning'];
        return className[~~(Math.random() * className.length)]
    },
    render: function () {
        return (<tr className={this.setClassName()}>
            <td>{this.props.num}</td>
            <td>{this.props.name}</td>
            <td>${this.props.price}</td>
        </tr>);
    }
});


var count = 1;

/**
 * 表格
 */
var BookList = React.createClass({
    getInitialState: function () {
        return {
            tableData: []
        };
    },
    componentWillReceiveProps: function () {
        console.log('componentWillReceiveProps:   ' + this.props.data);
    },
    shouldComponentUpdate: function () {
        console.log('shouldComponentUpdate:   ' + this.props.data);
        return true;
    },
    componentWillUpdate: function () {
        console.log('componentWillUpdate:   ' + this.props.data);
    },
    componentDidUpdate: function () {//该方法可以获取到 props 值, 但调用 setState 重新 render 会进入死循环 (react 生命周期!!!)
        console.log('componentDidUpdate:');
        //console.log(this.props.searchKey);
    },
    componentDidMount: function () {
        //this.setState({tableData: this.props.data});  //第一次执行,无法接受都父组件的数据,父组件异步传递数据
        console.log('componentDidMount:   ' + this.props.url);
    },

    render: function () {
        var BookRows = this.props.data.filter(function (item) {
            return item.name.indexOf(this.props.searchKey) != -1;

        }.bind(this)).map(function (book, index) {
            return <BookRow key={index} num={index + 1} name={book.name} price={book.price}/>
        });

        console.log('render: ' + (count++));

        return (<table className="table table-hover">
            <thead>
            <tr>
                <th>编号</th>
                <th>书名</th>
                <th>价格</th>
            </tr>
            </thead>
            <tbody>
            {BookRows}
            </tbody>
        </table>);
    }
});


/**
 * 搜索框
 */
var SearchBook = React.createClass({
    handleSubmit: function () {
        this.props.userInput(this.refs.key.value);
    },
    render: function () {
        return (<form className="form-inline">
            <div className="form-group">
                <input type="text" ref="key" className="form-control" onKeyUp={this.handleSubmit} placeholder="输入关键字"/>
            </div>
        </form>);
    }
});


var BookStoreMain = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            url: '',
            searchKey: ''
        };
    },
    componentDidMount: function () {
        if (this.props.url) {
            $.ajax({
                url: this.props.url,
                success: function (res) {
                    this.setState({data: this.state.data.concat(res.data)});
                }.bind(this)
            });
        }

        if (this.props.books)
            this.setState({data: this.state.data.concat(this.props.books)})
    },
    onUserInput: function (key) {//接受 searchBook 所输入的值
        this.state.searchKey = key;
        this.setState(this.state);
    },
    render: function () {
        return (<div className="row-fluid">
            <h2>Book List</h2>
            <SearchBook userInput={this.onUserInput}/>
            <BookList data={this.state.data} searchKey={this.state.searchKey}/>
        </div>);
    }
});


var books = [];
for(var i=0;i<10;i++){
    var t = i+1;
    books.push({num: t, name: 'Book' + t, price: ~~(t * Math.random()*100)});
}

ReactDOM.render(<BookStoreMain books={books}/>, document.querySelector("#container"));