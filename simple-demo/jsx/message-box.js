/**
 * Created by haner on 16/3/23.
 */



var MessageBox = React.createClass({
    render:function(){
        var subMsg = [];

        for(var i=0;i<10;i++){
            subMsg.push(<SubMsg key={i}/>);
        }

        return (<div>
            {subMsg}
        </div>);
    }
});

var SubMsg = React.createClass(function(){
    return (<span>{this.props.key}</span>)
});


//ReactDOM.render(<MessageBox/>,document.getElementById('messagebox'));

