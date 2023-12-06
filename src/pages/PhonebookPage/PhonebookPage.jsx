import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddContact } from 'components/AddContact/AddContact';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { selectVisibleContacts } from 'redux/selectors/selectors';
import { fetchContacts } from 'redux/contacts/contacts.reducer';

import { FilterContacts } from 'components/FilterContacts/FilterContacts';

import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';

const PhonebookPage = () => {
  const dispatch = useDispatch();

  const filteredContacts = useSelector(selectVisibleContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
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
        <Typography component="h1" variant="h2">
          Phonebook
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AddContact />
          </Grid>
          <Grid item xs={12}>
            <FilterContacts />
          </Grid>

          {/* {filteredContacts.some(contact => contact.isFavorite === true) && (
            <Grid item xs={12}>
              <Favorite />
            </Grid>
          )} */}
          {filteredContacts.length > 0 ? (
            <Grid item xs={12}>
              <ContactsList />
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                mt: 8,
              }}
            >
              <Typography>
                No contacts here. Please add a contact to your phonebook.
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default PhonebookPage;
