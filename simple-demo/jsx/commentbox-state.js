/**
 * Created by haner on 15/10/30.
 */

//评论
var CommentBox = React.createClass({
    getInitialState: function () {
        Log('getInitialState...');
        return {data: [],commentCount:0};
    },
    componentDidMount: function () {
        Log('componentDidMount...');
        var data = [
            {author: "13111", text: "This is one comment"},
            {author: "Wang", text: "This is tow comment"}
        ];
        var _this = this;
        Log('请求开始：'+ this.props.commentSubmitUrl);
        //模拟网络请求
        setTimeout(function () {
            Log('请求完毕！');
            _this.setState({data: data});
            _this.setState({commentCount: data.length});
        }, 1000);
    },
    handleCommentSubmit:function(comment){ //提交评论
        //setState 会再次 render
        var data = this.state.data.concat([comment]);
        this.setState({
            data: data,commentCount:data.length
        });
    },
    render: function () {
        Log('render...');
        return (
            <div>
                <h1>Comment Box</h1>
                <h1>Comment Count：{this.state.commentCount}</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onSubmitComment = {this.handleCommentSubmit}/>
            </div>
        );
    }
});

//评论列表 - item
var CommentList = React.createClass({
    render: function () {
        var comments = this.props.data.map(function (comment) {
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

//评论表单 - item
var CommentForm = React.createClass({
    getInitialState:function(){
      return {text:''}
    },
    mixins: [React.addons.LinkedStateMixin],
    handleSubmit:function(e) {
        e.preventDefault();
        var author = this.refs.author.value.trim(),
            text = this.refs.text.value.trim();
        if (!author || !text) return;
        this.props.onSubmitComment({author:author,text:text});
        this.refs.author.value = '';
        this.refs.text.value = '';
        this.setState({text:this.refs.author.value});
    },
    setVal:function(){
        this.setState({text:this.refs.author.value});
    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" onChange={this.setVal}/>
                <input type="text" placeholder="Say something..." ref="text" valueLink={this.linkState('text')}/>
                <input type="submit" value="评论" />
            </form>
        );
    }
});

//评论 - item
var Comment = React.createClass({
    render: function () {
        return (
            <div>
                Author：{this.props.author}
                <br/>
                Reply：{this.props.children}
                <br/>
            </div>
        );
    }
});

//加载提示 - item
var LoadTip = React.createClass({
    hideTip:function(){

    },
    render:function(){
        return (<div>加载中...</div>);
    }
});


ReactDOM.render(
    <CommentBox commentSubmitUrl="http://xxx.xxx.com"/>,
    document.getElementById('commentboxState')
);