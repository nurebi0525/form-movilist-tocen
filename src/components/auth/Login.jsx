import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

const BASE_URL = "https://082591db2a551cac.mokky.dev/auth"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(formData)
      })
      const {data, token} = await res.json()
    
    
      if(data) {
        localStorage.setItem('token', token)
        navigate("/movie")
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      marginTop="150px"
    >
      <Box elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
       
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;

// "email": "nurebi2007@gmail.com",
// "password": "dthfryjhrfdh",
// "rememberMe": true,
// "id": 1
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im51cmViaTIwMDdAZ21haWwuY29tIiwicmVtZW1iZXJNZSI6dHJ1ZSwiaWF0IjoxNzQyODA5OTY3LCJleHAiOjE3NDc5OTM5Njd9.dubqWsIDQ67T1aUOif_2l_1DfZfDqEKBMdZl8m1VeNA