/* 
ES6 Destructuring syntax used for:
> import React, {Component} from 'react';
Basically we're saying there's a subclass of the React class called Component (it's a property that's an object)
if you didn't use it and only said 
> import React from 'react';
you would then have to use
> class App extends React.Component {...}
*/
import React, { Component } from 'react';
import logo from './logo.svg';
// you can change up the folder structure to have a /styles folder, just update
// the path below to import './styles/app.css;'
import '../public/styles/app.css';

// THIS FILE IS THE DEFAULT TEMPLATING FOR THE APP
// you could add the App class definition inside index.js and omit this whole file.

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
