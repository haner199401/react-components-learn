/**
 * Created by haner on 15/10/30.
 */



var CommentBox = React.createClass({
    getInitialState:function(){
        return {data:[]}
    },
    componentDidMount:function(){
        var _this = this;
        $.ajax({
            url:'http://localhost:8088/commentlist',
            type:'get',
            dataType:'json',
            success:function(res,textStatus,xhr){
                _this.setState({data:res.data});
            }
        });
    },
    render: function() {
        return (
            <div>
                <h1>Comment Box</h1>
                <CommentList data={this.state.data}/>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var comments = this.props.data.map(function(comment,key){
            return (<Comment author={comment.author} key={key}>{comment.text}</Comment>)
        });
        return (<div>{comments}</div>);
    }
});

var Comment = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Author：{this.props.author}</h1>
                <h2>Reply：{this.props.children}</h2>
            </div>
        );
    }
});


ReactDOM.render(
    <CommentBox/>,
    document.getElementById('container')
);