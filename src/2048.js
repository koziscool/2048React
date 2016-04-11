
var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var FOUR = 4;

var Board2048 = React.createClass({
  getInitialState: function() {
    return {
      current: 0,
      tiles: []
    };
  },

  componentWillMount: function() {
    Two048Model.init();
    // for(var key in Two048Model.tiles ){
    //   this.state.tiles[key] = Two048Model.tiles[key];
    // }
    var row, col;
    for (var i = 0; i < Two048Model.numTiles; i++) {
      row = Math.floor( i / FOUR);
      col = i % FOUR;
      var value = Two048Model.getTile( row, col);
      this.state.tiles[i] = value;
    }
   
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
        // console.log('left');
        break;
      case 38: // Up
        Two048Model.moveUp();
        // console.log('up');
        break;
      case 39: // Right
        Two048Model.moveRight();
        // console.log('right');
        break;
      case 40: // Down
        Two048Model.moveDown();
        // console.log('down');
        break;
    }
    // this.setState(  );

    for(var key in Two048Model.tiles ){
      this.state.tiles[key] = Two048Model.tiles[key];
    }
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
      if( value === 'blank') {
        value = "";
      }
      // console.log(value);
      var tileKey = Two048Model.tileKey(row, col);
      children.push(<div key={i} className="animateItem" style={style}>{value}</div>);
    }
    // return (
    //   React.createElement(CSSTransitionGroup,
    //         {
    //           className: "animateExample",
    //           transitionEnterTimeout: {250},
    //           transitionLeaveTimeout: {250},
    //           transitionName="example" >              
    //         }, 
    //     React.createElement(TileSlots2048, {tiles: this.state.tiles})
    //   );
    // );

    return (
      <CSSTransitionGroup
        className="animateExample"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionName="example" >
        {children}
      </CSSTransitionGroup>
    );
  }
});


var TileSlots2048 = React.createClass({
  render: function() {
    var slotNodes = this.props.tiles.map(function (value, index) {
      return (
        React.createElement(Tile2048, {value: value, index: index})
      );
    });

    return (
      React.createElement("div", {id: "tile-list"}, 
        slotNodes
      )
    );
  }
});

var Tile2048 = React.createClass({
  render: function() {
    return (
      React.createElement("div", null, this.props.value)
    );
  }
});


ReactDOM.render(
  <Board2048 />,
  document.getElementById('container')
);  

