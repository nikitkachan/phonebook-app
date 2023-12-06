import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContacts,
  deleteFromFavorite,
} from 'redux/contacts/contacts.reducer';
import { selectVisibleContacts } from 'redux/selectors/selectors';

import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Favorite = () => {
  const dispatch = useDispatch();

  const handleDeleteContact = contactId => {
    dispatch(deleteContacts(contactId));
  };

  const handleDeleteFromFavorite = contact => {
    const finalContact = { ...contact, isFavorite: false };

    dispatch(deleteFromFavorite(finalContact));
  };

  const filteredContacts = useSelector(selectVisibleContacts);
  const sortedContacts = [...filteredContacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Box
      sx={{
        mt: 3,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Favorite contacts
      </Typography>
      <List>
        {filteredContacts.length > 0 &&
          sortedContacts.map(
            contact =>
              contact.isFavorite === true && (
                <ListItem
                  key={contact.id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="favorite"
                        onClick={() => handleDeleteFromFavorite(contact)}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteContact(contact.id)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.phone}
                  />
                </ListItem>
              )
          )}
      </List>
    </Box>
  );
};

export default Favorite;
