import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import axios from 'axios'
import './AddUser.css'

let families = ['Scott Haynes', 'Rich Haynes', 'Robin Bloomfield', 'Dana Albrechtson', 'Kris Hass']
    .map((family, i) => {
        return (
            <MenuItem value={i + 1} key={`${i}Family`}>
                {family}
            </MenuItem>
        )
    })
let roles = ['Admin', 'User']
    .map((role, i) => {
        return (
            <MenuItem value={i + 1} key={`${i}Role`}>
                {role}
            </MenuItem>
        )
    })

let family_roles = ['Sibling', 'Child', 'Grandchild']
    .map((role, i) => {
        return (
            <MenuItem value={i + 1} key={`${i}FamilyRole`}>
                {role}
            </MenuItem>
        )
    })

export default class AddUser extends Component {
    constructor() {
        super()
        
        this.state = {
            name: '',
            email: '',
            phone: '',
            spassword: '',
            family_id: '',
            role_id: '',
            family_role_id: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createUser = () => {
        let { name, email, phone, spassword, family_id, role_id, family_role_id } = this.state
        axios.post('/auth/create',
            {
                name: name.toLowerCase(),
                email: email.toLowerCase(),
                phone: phone,
                spassword,
                family_id,
                role_id,
                family_role_id
            })
            .then(() => {
                this.setState({
                    name: '',
                    email: '',
                    phone: '',
                    spassword: '',
                    family_id: '',
                    role_id: '',
                    family_role_id: ''
                })
            })
    }
  
    render() {
        
        return (
            <div className = 'addUser'>
                <form style={{marginTop: '20px'}}className='addUserForm' noValidate autoComplete="off">
                    <TextField
                        id="name"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                        fullWidth
                    />
                    
                    <TextField
                        id="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        fullWidth
                    />
                    
                    <TextField
                        id="phone"
                        label="Phone"
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                        margin="normal"
                        fullWidth
                    />
                    
                    <TextField
                        id="password"
                        type='password'
                        label="Password"
                        value={this.state.spassword}
                        onChange={this.handleChange('spassword')}
                        margin="normal"
                        fullWidth
                    />
                    
                    <TextField
                        id="family"
                        select
                        label="Family"
                        value={this.state.family_id}
                        onChange={this.handleChange('family_id')}
                        margin="normal"
                        fullWidth
                    >
                        {families}
                    </TextField>
                    
                    <TextField
                        id="role"
                        select
                        label="Role"
                        value={this.state.role_id}
                        onChange={this.handleChange('role_id')}
                        margin="normal"
                        fullWidth
                    >
                        {roles}
                    </TextField>
                    
                    <TextField
                        id="family_role"
                        select
                        label="Family Role"
                        value={this.state.family_role_id}
                        onChange={this.handleChange('family_role_id')}
                        margin="normal"
                        fullWidth
                    >
                        {family_roles}
                    </TextField>
                    
                    <Button onClick={this.createUser}variant='raised' color='primary' fullWidth style={{marginTop: '20px', marginBottom: '20px'}}>Add</Button>
                </form>
            </div>
    )
  }
}
