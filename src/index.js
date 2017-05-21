// added this line so we can do everything inside index.js rather than needing App.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
// omitting app from ./App and defining it in this file instead
// import App from './App';
// you can change up the folder structure to have a /styles folder, just update
// the path below to import './styles/index.css;'
import { EventEmitter } from 'events';
import Screen1 from './screens/screen1';
import Screen2 from './screens/screen2';
import Screen3 from './screens/screen3';
import Nav from './components/nav';
import '../public/styles/app.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      // define the default starting screen index
      screenIndex: 1
    };
  }

  // another lifecycle event on the App component
  componentWillMount() {
    // EventEmitter isn't state, it's just a property
    this.eventEmitter = new EventEmitter();

    /* 
      we won't be "calling" navigateScreen, we'll emit navigateScreen
      it will take data {screenIndex}. Any component can emit the navigateScreen
      we're listening for navigateScreen at the top level, we can change state at the top
      level and it will propogate down to every component because we're passing it as props
      all the little renders get called downstream and render the piece of the DOM that needs updating.
      Doesn't have to re-render the whole component.
      Everyone downstream is just referencing data that's at a higher level.   
    */
    this.eventEmitter.addListener("navigateScreen",
      //addListener takes a callback function as the second parameter to run when the event is heard
      ({screenIndex}) => {
        // when we hear navigateScreen broadcasted we run updateScreen from App
        // we're passing it screenIndex as a property of newScreenIndex which
        // updateScreen is specifically looking for in its destructured argument syntax.
        this.updateScreen({newScreenIndex: screenIndex});
      }
    );
  }

  /* the syntax below destructures the key newScreenIndex out of the argument
     destructuring the argument means the argument order doesn't matter which makes our function
     more future proof and flexible. Unfortunately Nav doesn't have access to updateScreen*/
  updateScreen({newScreenIndex}) {
    this.setState({screenIndex: newScreenIndex})
  }

  render() {
    // all this activeScreen and conditionals stuff can be ommitted when
    // using react router
    var activeScreen;
    if(this.state.screenIndex === 1){
      activeScreen = <Screen1 />
    }
    if(this.state.screenIndex === 2){
      activeScreen = <Screen2 />
    }
    if(this.state.screenIndex === 3){
      activeScreen = <Screen3 />
    }
    return (
      <div className="app">
        <div className="app-header">
        </div>
        <div className="app-wrapper">
          {/*the Nav component below is brought in from nav.js*/}
          <Nav 
            /* we're passing in screenIndex from App to a prop of Nav so that our logic
               in nav.js will know what screenIndex is */
            eventEmitter={this.eventEmitter}
            // passing the state.screenIndex of App into Nav as the screenIndex prop of Nav
            // props are passed by value 
            screenIndex={this.state.screenIndex} 
          />
          {/* Dynamic content goes below */}
          <div className="main-content">
            {/*
            {activeScreen} 
            */}
            {/* screen1, screen2, etc would get placed here in place of 
            this.props.children but they don't have access to the global event emmitter which is no bueno
            {this.props.children}
            */}
            {/* to give the screens access to the global event emmitter you have to wrap this.props.children 
              cloneElement only works if the child is a single React Element */}
            {React.cloneElement(this.props.children, {
              eventEmitter: this.eventEmitter
            })}
          </div>
        </div>
      </div>
    )
  }
}

// THIS FILE RENDERS REACT TO THE DOM
// define a React app
ReactDOM.render(
  // React app content
  //<App />,
  // instead of rendering App we're going to render React Router
  // api has since changed
  // all this Router syntax allows us to use the back button in the browser with React still working
  <Router history={browserHistory}>
    {/* browser history creates a stack of human readable urls */}
    <Route path='/' component={App}>
      {/* IndexRoute sets the default route for the route defined in the parent <Route> 
          because IndexRoute is nested in Route it becomes this.props.children of <Route> */}
      <IndexRoute component={Screen2} />
      <Route path="/screen1" component={Screen1}/>
      <Route path="/screen2" component={Screen2}/>
      <Route path="/screen3" component={Screen3}/>
    </Route>
  </Router>,
  // determine which node we want to inject our React app content into
  // in this case it's a div with id 'root'
  document.getElementById('root')
);


/* ------------
Other dependencies installed:
  - events
  - lodash
  - react-router
  - history

File that arent' necessary:
  - could load css globally instead of having separate css files
  - app.test.js
  - logo.svg
  - instead of having App.js you can add the App class to this index.js file
----------- */