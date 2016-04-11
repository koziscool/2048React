
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var FOUR = 4;

var Board2048 = React.createClass({
  getInitialState: function() {
    return {
      current: 0
    };
  },

  componentWillMount: function() {
    Two048Model.init();
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.handleKey);
  },

  componentWillUnmount: function() {
  },

  tick: function() {
    this.setState({current: this.state.current + 1});
  },

  handleKey: function(event){
    switch (event.keyCode) {
      case 37: // Left
        Two048Model.moveLeft();
        console.log('left');
        break;
      case 38: // Up
        Two048Model.moveUp();
        console.log('up');
        break;
      case 39: // Right
        Two048Model.moveRight();
        console.log('right');
        break;
      case 40: // Down
        Two048Model.moveDown();
        console.log('down');
        break;
    }
    // this.setState(  );
    this.forceUpdate(  );
  },

  render: function() {
    var children = [];
    var row = 0;
    var col = 0;
    var colors = ['red', 'gray', 'blue'];
    for (var i = 0; i < Two048Model.numTiles; i++) {
      row = Math.floor( i / FOUR);
      col = i % FOUR;
      var style = {
        left: row * 128,
        top: col * 128,
        background: colors[i % colors.length]
      };
      var value = Two048Model.getTile( row, col);
      var tileKey = Two048Model.tileKey(row, col);
      // console.log(tileKey);
      children.push(<div key={i} className="animateItem" style={style}>{value}</div>);
    }
    return (
      <CSSTransitionGroup
        className="animateExample"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionName="example"
        onKeyPress={this.handleKey}>
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

