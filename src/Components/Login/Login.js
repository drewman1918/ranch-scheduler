import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import './Login.css'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      spassword: '',
      open: false
    }
  }
  
  login = () => {
    let { email, spassword } = this.state
    if (email === '' || spassword === '') {
      this.setState({
        open: true
      })
    } else {
      axios.post('/auth/login', { email, spassword })
        .then(() => {
          this.props.history.push('/scheduler')
        })
        .catch((err) => {
          this.setState({
            open: true
          })
        })
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  render() {
    return (
      <div className = 'login'>
        <div className="loginBox">
          
          <div className="loginHeader">
            Please Login
          </div>

          <div className="loginContent">
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                fullWidth
              />

              <TextField
                id="spassword"
                label="Password"
                value={this.state.spassword}
                type = 'password'
                onChange={this.handleChange('spassword')}
                margin="normal"
                fullWidth
              />

            <button className="loginButton" onClick={this.login}>
              LOGIN
            </button>
          </div>

        </div>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Invalid Login Credentials</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

      </div>
    )
  }
}

export default withRouter(Login)
