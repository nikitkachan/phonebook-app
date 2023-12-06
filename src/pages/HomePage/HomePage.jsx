import React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectAuthenticated } from 'redux/auth/auth.selectors';
import { useSelector } from 'react-redux';
import { StyledLink } from 'components/Layout/Layout.styled';

const HomePage = () => {
  const authenticated = useSelector(selectAuthenticated);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Phonebook App
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            One of the most simplest and secured solution to store ang manage
            your contacts. Create account and check it!
          </Typography>
          {authenticated ? (
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <StyledLink to="/phonebook">
                <Button size="large" variant="contained">
                  Go to phonebook
                </Button>
              </StyledLink>
            </Stack>
          ) : (
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/register">
                <Button size="large" variant="contained">
                  Create account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="large" variant="outlined">
                  Log in
                </Button>
              </Link>
            </Stack>
          )}
        </Container>
      </Box>
    </Container>
  );
};

export default HomePage;
