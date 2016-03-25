/**
 * Created by haner on 15/10/30.
 */



var CommentBox = React.createClass({
    getInitialState:function(){
        return {data:[]}
    },
    componentDidMount:function(){
        $.ajax({
            url:'http://localhost:8088/commentlist',
            type:'get',
            dataType:'json',
            success:function(res,textStatus,xhr){
                this.setState({data:res.data});
            }.bind(this)
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
            <div style={{borderBottom:'1px solid gray'}}>
                <h4>Author：{this.props.author}</h4>
                <h5>Reply：{this.props.children}</h5>
            </div>
        );
    }
});


ReactDOM.render(
    <CommentBox/>,
    document.getElementById('container')
);