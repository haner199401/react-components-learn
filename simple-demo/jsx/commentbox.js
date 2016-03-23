/**
 * Created by haner on 15/10/30.
 *
 * hello
 */


var data = [
    {author: "Pete Hunt", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is tow comment"}
];
var CommentBox = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Comment Box</h1>
                <CommentList data={this.props.data}/>
                <CommentForm />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var comments = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            )
        });

        return (
            <div className="commentList">
                {comments}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm"></div>
        );
    }
});

var Comment = React.createClass({
    render: function() {
        return (
            <div>
                <h2>
                    Author：{this.props.author}
                </h2>
                    Reply：{this.props.children}
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('container')
);