import React, { Component } from 'react'
import Menu from '@material-ui/icons/Menu'
import Close from '@material-ui/icons/Close'
import MenuItem from './MenuItem'
import { Link } from 'react-router-dom'
import './Header.css'

export default class Header extends Component {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  closeMenu = () => {
    this.setState({
      open: false
    })
  }

  render() {
    return (
        <div className='nav'>
          
        {(this.state.open) ? 
          <Close style={{
            height: '36px',
            width: '36px'
          }}
            onClick={() => { this.setState({ open: !this.state.open }) }}
          />

          :

          <Menu style={{
            height: '36px',
            width: '36px'
          }}
            onClick={() => { this.setState({ open: !this.state.open }) }}
          />
        }


          <h1>Ranch Scheduler</h1>

          <div className= {(this.state.open) ? 'menu visible' : 'menu'} id='menu'>
            <Link to = '/scheduler'><MenuItem text='scheduler' closeMenu={this.closeMenu}/></Link>
            <MenuItem text='scheduler' closeMenu={this.closeMenu}/>
          </div>

        </div>
    )
  }
}
