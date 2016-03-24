/**
 * Created by haner on 16/3/23.¡
 */


var MessageBox = React.createClass({
    render:function(){
        var subMsg = [];

        for(var i=0;i<10;i++){
            subMsg.push(<SubMsg key={i} num={'Number:' + i}/>);
        }

        return (<div>{subMsg}</div>);
    }
});

var SubMsg = React.createClass({
    render:function(){
        return (<div>{this.props.num}</div>)
    }
});


ReactDOM.render(<MessageBox/>,document.getElementById('messagebox'));

