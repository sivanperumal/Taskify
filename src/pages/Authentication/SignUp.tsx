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
import { userRegister, useUser } from "../../redux/slices/user.slice";
import type { users } from "../../interface";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState<users>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    setError("");

    dispatch(userRegister(formData));
    setFormdata({
      username: "",
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todo/list");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            required
            value={formData.username}
            onChange={handleOnChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={formData.email}
            onChange={handleOnChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            required
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
            data-testid="signup-btn"
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
export default SignUp;
