import React, { Component } from 'react'

export default class Day extends Component {
  render() {
    return (
      <div
        className="day"
        id={this.props.date.startOf('day')._d}
        onClick={(this.props.startingDay !== '') ? () => this.props.selectEnd(this.props.date) : () => this.props.selectStart(this.props.date)}
      >
        {this.props.day}
      </div>
    
    )
  }
}
