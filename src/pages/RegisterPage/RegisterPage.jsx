import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from 'redux/auth/auth.reducer';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Alert } from '@mui/material';
import {
  selectAuthError,
  selectAuthIsLoading,
} from 'redux/auth/auth.selectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/AuthLoader';

import { StyledNavLink } from 'components/Layout/Layout.styled';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthIsLoading);

  const onSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const formData = {
      name: data.get('firstName') + ' ' + data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    if (formData.name === ' ') {
      toast.error('Please enter your name!');
      return;
    } else if (formData.email.trim() === '' || !formData.email.includes('@')) {
      toast.error('Please enter your email!');
      return;
    } else if (formData.password.trim() === '') {
      toast.error('Please enter your password!');
      return;
    }
    dispatch(registerThunk(formData));
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Alert severity="error">User with this email exist</Alert>}
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  title="Password may at least 6 characters!"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <StyledNavLink to="/login" variant="body2">
                  Already have an account? Sign in
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

export default RegisterPage;
