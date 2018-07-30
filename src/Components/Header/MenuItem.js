import React, { Component } from 'react'

export default class MenuItem extends Component {
  render() {
    return (
        <div className='menuItem' onClick={this.props.closeMenu}>
            {this.props.text}
        </div>
    )
  }
}
