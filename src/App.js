import React, { Component } from 'react';
import Calculator from './Calculator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="content">
          <Calculator />
        </section>
      </div>
    );
  }
}

export default App;
