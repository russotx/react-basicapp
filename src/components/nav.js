import React, {Component} from 'react'

// nav doesn't have access to the state of app by default
class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }


  render() {
    return (
    <div className="app-nav"> 
      <div 
        /* 
          we can inject javascript into the file using {...}, this allows us to make a conditional class name
          this is a way to toggle the classes on a node.
        */
        /* 
        instead of this.state.screenIndex like we had when this was all lumped in with app.js, we need 
        to use props because screenIndex isn't part of App's state not Nav's 
        */
        // className={this.state.screenIndex === 1 ? "nav-item screen1 active-nav" : "nav-item screen1"}
        className={this.props.screenIndex === 1 ? "nav-item screen1 active-nav" : "nav-item screen1"}
        onClick={(event) => {this.props.eventEmitter.emit('navigateScreen', {screenIndex: 1}) }}>
        <p>screen 1</p>
      </div>
      <div 
        className={this.props.screenIndex === 2 ? "nav-item screen2 active-nav" : "nav-item screen2"}
        onClick={(event) => {this.props.eventEmitter.emit('navigateScreen', {screenIndex: 2}) }}>
        <p>screen 2</p>
      </div>
      <div 
        className={this.props.screenIndex === 3 ? "nav-item screen3 active-nav" : "nav-item screen3"}
        onClick={(event)=> {this.props.eventEmitter.emit('navigateScreen', {screenIndex: 3}) }}>
        <p>screen 3</p>
      </div>
    </div>
    )
  }
}
module.exports = Nav;