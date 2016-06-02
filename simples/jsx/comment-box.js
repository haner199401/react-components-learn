/**
 * Created by haner on 15/10/30.
 *
 * hello
 */


var CommentBox = React.createClass({
    render: function() {
        return (
            <div style={{border:'1px solid gray',display:'inline-block'}}>
                <h1>Comment Box</h1>
                <CommentList data={this.props.data}/>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var comments = this.props.data.map(function(comment){
            return (<Comment author={comment.author} key={comment.id}>{comment.text}</Comment>)
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



var data = [
    {author: "Haner", text: "This is one comment",id:1},
    {author: "React", text: "This is tow comment",id:2}
];

ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('commentbox')
);