import { useDispatch, useSelector } from 'react-redux';
import { selectAuthenticated, selectUserData } from 'redux/auth/auth.selectors';
import { logOutThunk } from 'redux/auth/auth.reducer';
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { StyledLink } from './Layout.styled';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const userData = useSelector(selectUserData);

  const onLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <div>
      <AppBar position="sticky" sx={{ bgcolor: '#eeeeee' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <StyledLink to="/">
            <Button
              size="small"
              variant="contained"
              edge="start"
              sx={{ mr: 2 }}
            >
              Home
            </Button>
          </StyledLink>
          {authenticated ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <StyledLink to="/phonebook">
                <Button size="small" variant="contained">
                  Phonebook
                </Button>
              </StyledLink>

              <Box
                className="helloWrapper"
                edge="end"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ ml: 'auto' }} color="black">
                  Hello, {userData.name}!
                </Typography>
                <IconButton
                  size="small"
                  aria-label="logout"
                  color="black"
                  sx={{ ml: 1 }}
                  onClick={onLogOut}
                >
                  <LogoutRoundedIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <StyledLink to="/login">
                  <Button size="small">Sign In</Button>
                </StyledLink>
                <StyledLink to="/register">
                  <Button size="small">Sign Up</Button>
                </StyledLink>
              </ButtonGroup>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
