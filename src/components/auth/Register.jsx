import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";

const BASE_URL = "https://082591db2a551cac.mokky.dev/register"
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data.success)
      if (data.success) {
        navigate("/success")
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <Container
      maxWidth="sm"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box marginTop="150px" component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
       
        <TextField
          fullWidth
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
  
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
