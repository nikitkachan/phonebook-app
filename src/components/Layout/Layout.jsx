import { useDispatch, useSelector } from 'react-redux';
import { selectAuthenticated, selectUserData } from 'redux/auth/auth.selectors';
import { logOutThunk } from 'redux/auth/auth.reducer';
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

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
          <Link to="/">
            <Button
              size="small"
              variant="contained"
              edge="start"
              sx={{ mr: 2 }}
            >
              Home
            </Button>
          </Link>
          {authenticated ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <Link to="/phonebook">
                <Button size="small" variant="contained">
                  Phonebook
                </Button>
              </Link>

              <Box
                edge="end"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ ml: 'auto' }} color="black">
                  Hello, {userData.name}!
                </Typography>
                <Button
                  sx={{ ml: 2 }}
                  variant="outlined"
                  size="small"
                  onClick={onLogOut}
                >
                  Log Out
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Link to="/login">
                  <Button size="small">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button size="small">Sign Up</Button>
                </Link>
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
