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

/**
 * 表格
 */
var BookList = React.createClass({
    getInitialState: function () {
        return {
            tableData: []
        };
    },
    componentWillReceiveProps:function(){
        console.log('componentWillReceiveProps:   ' + this.props.url);
    },
    shouldComponentUpdate:function(){
        console.log('shouldComponentUpdate:   ' + this.props.url);
        return true;
    },
    componentWillUpdate:function(){
        console.log('componentWillUpdate:   ' + this.props.url);
    },
    componentDidUpdate:function(){// 修改 props 或者 state 将触发该方法
        console.log('componentDidUpdate:' );
        console.log(this.props.data);
        //this.setState({tableData: this.props.data});

    },
    componentDidMount: function () {
        this.setState({tableData: this.props.data});
        console.log('componentDidMount:   ' + this.props.url);

    },

    render: function () {
        var BookRows = this.state.tableData.map(function (book, index) {
            return <BookRow key={index} num={index + 1} name={book.name} price={book.price}/>
        });
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
    render: function () {
        return (<form className="form-inline">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="输入关键字"/>
            </div>
            <button type="submit" className="btn btn-default">Search</button>
        </form>);
    }
});

var count = 1;
var BookStore = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            url:''
        };
    },
    componentDidMount: function () {
        if (!this.props.url) {console.error('请求地址不能为空!');return;}

        $.ajax({
            url: this.props.url,
            success: function (res) {
                this.setState({data: this.state.data.concat(res.data)})
            }.bind(this)
        });
    },
    render: function () {
        console.log('render: '+ (count++));

        return (<div className="row-fluid">
            <h2>Book List</h2>
            <SearchBook />
            <BookList data={this.state.data}/>
        </div>);
    }
});



ReactDOM.render(<BookStore url="http://localhost:8088/booklist"/>, document.querySelector("#container"));