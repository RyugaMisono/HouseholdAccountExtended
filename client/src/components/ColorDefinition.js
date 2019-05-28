import React, { Component } from 'react'

export default class ColorDefinition extends Component {

    listStyle = {
        float: "left",
        listStyle: "none",
        marginRight: "20px"
    }

  render() {
    return (
      <ul>
        <li style={this.listStyle}>
            <svg height="10" width="30">
                <line x1="0" y1="0" x2="30" y2="0" style={{stroke:"black",strokeWidth:15}} />
            </svg>
            <p>Expense</p> 
        </li>
        <li style={this.listStyle}>
            <svg height="10" width="30">
                <line x1="0" y1="0" x2="30" y2="0" style={{stroke:"green",strokeWidth:15}} />
            </svg>
            <p>Income</p>
        </li>
      </ul>
    )
  }
}