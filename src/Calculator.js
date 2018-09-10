import React, { Component } from 'react';
import './stylesheets/calculator.css';

const initialState = {
    operation: null,
    arg: null
  };

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  resetState() {
    this.setState(initialState);
  }

  renderNumbers = () => {
    return Array(10).fill().map((_, i) => <span className='calculator-number' onClick={() => this.numberClick(i)} key={i}><span>{i}</span></span>);
  }

  renderActions = () => {
    const _this = this;

    const actions = {
      add: {
        symbol: '+',
        action: function(arg) {
          _this.setState({
            operation: 'add',
            arg: arg
          });
        }
      },
      deduct: {
        symbol: '-',
        action: function(arg) {
          _this.setState({
            operation: 'deduct',
            arg: arg
          });
        }
      },
      multiply: {
        symbol: '×',
        action: function(arg) {
          _this.setState({
            operation: 'multiply',
            arg: arg
          });
        }
      },
      divide: {
        symbol: '÷',
        action: function(arg) {
          _this.setState({
            operation: 'divide',
            arg: arg
          });
        }
      },
      equal: {
        symbol: '=',
        action: function(arg) {
          switch(_this.state.operation) {
            case 'add': {
              _this.calcInput.value = parseInt(_this.state.arg, 10) + parseInt(arg, 10);
              break;
            }
            case 'deduct': {
              _this.calcInput.value = parseInt(_this.state.arg, 10) - parseInt(arg, 10);
              break;
            }
            case 'multiply': {
              _this.calcInput.value = parseInt(_this.state.arg, 10) * parseInt(arg, 10);
              break;
            }
            case 'divide': {
              _this.calcInput.value = parseInt(_this.state.arg, 10) / parseInt(arg, 10);
              break;
            }
            default: return;
          }
          _this.calcInput.animate([
            { opacity: '1' },
            { opacity: '.25' },
            { opacity: '1' }
          ], {
            // timing options
            duration: 500,
            iterations: 1
          });
          _this.setState({
            operation: null,
            arg: _this.calcInput.value
          });
        }
      }
    };

    return Object.keys(actions).map((k, i) => <span className='calculator-action' key={i} onClick={() => actions[k].action(this.calcInput.value)}><span>{actions[k].symbol}</span></span>)
  }


  numberClick = (n) => {
    const value = this.calcInput.value;

    if (value === '0') {
      this.calcInput.value = n;
    } else {
      this.calcInput.value = value + n;
    }

    if (this.state.operation !== null && this.state.arg !== null) {
      this.calcInput.value = (value + n).replace(this.state.arg, '');
    }
  }

  clear = () => {
    const input = this.calcInput;
    input.value = 0;
  }

  handleKey = (e) => {
    if (e.key.match(/\d/)) {
      this.numberClick(e.key);
    }

    let keycode = ((typeof e.keyCode !== 'undefined' && e.keyCode) ? e.keyCode : e.which);

    if (keycode === 27) {
      this.clear();
    }
  }

  componentDidMount(){
    this.calcInput.focus();
  }

  render() {
    return (
      <div className='calculator' onKeyPress={this.handleKey}>
        <div className='calculator-input'>
          <input
            type="text"
            readOnly
            ref={ (i) => {this.calcInput = i; }}
            onBlur={() => this.calcInput.focus()}
            defaultValue='0'
          />
        </div>
        <div className='calculator-controls'>
          <div className='calculator-numbers'>
            {this.renderNumbers()}
            <span className='calculator-number' onClick={this.clear}>
              <span>CE</span>
            </span>
            {/* some extra button */}
            <span className='calculator-number'></span>
          </div>
          <div className='calculator-actions'>
            {this.renderActions()}
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator;
