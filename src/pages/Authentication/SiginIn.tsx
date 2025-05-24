import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { userLogin, useUser } from "../../redux/slices/user.slice";

const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in both fields");
      return;
    }
    setError("");

    // Add API call or logic here
    dispatch(userLogin(formData));
    if (isAuthenticated) {
      navigate("/todo");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todo");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            name="email"
            value={formData.email}
            onChange={handleOnChange}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            name="password"
            value={formData.password}
            onChange={handleOnChange}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            data-testid="signin-btn"
          >
            Sign In
          </Button>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Link component={RouterLink} to="/signup" variant="body2">
            Dont have an account? Sign Up
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
