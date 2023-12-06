import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from 'redux/auth/auth.reducer';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {
  selectAuthError,
  selectAuthIsLoading,
} from 'redux/auth/auth.selectors';
import Loader from 'components/Loader/AuthLoader';
import { Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StyledNavLink } from 'components/Layout/Layout.styled';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthIsLoading);
  const isError = useSelector(selectAuthError);

  const onSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    if (formData.email.trim() === '' || !formData.email.includes('@')) {
      toast.error('Please enter your email!');
      return;
    } else if (formData.password.trim() === '') {
      toast.error('Please enter your password!');
      return;
    }
    dispatch(loginThunk(formData));
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Alert severity="error">Login error</Alert>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              title="Password may at least 6 characters!"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <StyledNavLink to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </StyledNavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    </>
  );
};

export default LoginPage;
