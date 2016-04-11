

var CSSTransitionGroup = React.addons.CSSTransitionGroup;
// var INTERVAL = 2000;
var FOUR = 4;

var Board2048 = React.createClass({
  getInitialState: function() {
    return {
      model: Two048Model,
      current: 0
    };
  },

  componentWillMount: function() {
    this.state.model.init();
  },

  componentDidMount: function() {
    console.log('init');
    // this.interval = setInterval(this.tick, INTERVAL);
  },

  componentWillUnmount: function() {
    // clearInterval(this.interval);
  },

  tick: function() {
    this.setState({current: this.state.current + 1});
  },

  render: function() {
    var children = [];
    var pos = 0;
    var row = 0;
    var col = 0;
    var colors = ['red', 'gray', 'blue'];
    // for (var i = this.state.current; i < this.state.current + colors.length; i++) {
    // for (var i = this.state.current; i < this.state.current + 16; i++) {
    for (var i = 0; i < Two048Model.numTiles; i++) {
      row = Math.floor( i / FOUR);
      col = i % FOUR;
      var style = {
        // left: pos * 128,
        left: row * 128,
        top: col * 128,
        background: colors[i % colors.length]
      };
      pos++;
      var value = this.state.model.getTile( row, col);
      console.log( value );
      // children.push(<div key={i} className="animateItem" style={style}>{i}</div>);
      children.push(<div key={i} className="animateItem" style={style}>{value}</div>);
    }
    return (
      <CSSTransitionGroup
        className="animateExample"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionName="example">
        {children}
      </CSSTransitionGroup>
    );
  }
});




// var Block2048 = React.createClass({
//   getInitialState: function() {
//     return {current: 0};
//   },
// });


ReactDOM.render(
  <Board2048 />,
  document.getElementById('container')
);  

