import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Register(){
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const RegisterAPI = 'https://graphqlserveryourmedia-production.up.railway.app/auth/register/';
    const navigate = useNavigate();

    const RegisterUser=async()=>{
        try{
            const Registered = await axios.post(RegisterAPI,{
                password: password,
                username: name,
                email: email,
            }).then(()=>{console.log("User Registered"); navigate("/")})
            .catch((err)=>{console.log("Couldn't register user", err.msg)});
        }
        catch(error){
            console.log("Unknown Server Error, Try Later");
        }
    };

    return(
        
        <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <center>
        <div style={{ marginTop: '5%' }}>
        <TextField
            id="outlined-name-input"
            label="name"
            type="name"
            value={name}
            onChange={(e)=>{SetName(e.target.value)}}
        />
        <TextField
            id="outlined-email-input"
            label="email"
            type="email"
            value={email}
            onChange={(e)=>{SetEmail(e.target.value)}}
        />
        <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>{SetPassword(e.target.value)}}
        />
        
        </div>
        <Button variant="outlined" onClick={RegisterUser}>Register User</Button>
        <a href="/">Login here</a>
        </center>

        </Box>
    )
}

export default Register