import { useDispatch, useSelector } from 'react-redux';

import { deleteContacts } from 'redux/contacts/contacts.reducer';
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
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ContactsList = () => {
  const dispatch = useDispatch();

  const filteredContacts = useSelector(selectVisibleContacts);

  const handleDeleteContact = contactId => {
    dispatch(deleteContacts(contactId));
  };

  // const handleAddToFavorite = contact => {
  //   const favoriteContact = { ...contact, isFavorite: true };
  //   dispatch(addToFavorite(favoriteContact));
  // };

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
        Contacts
      </Typography>
      <List>
        {filteredContacts.length > 0
          ? sortedContacts.map(
              contact =>
                contact.isFavorite !== true && (
                  <ListItem
                    key={contact.id}
                    secondaryAction={
                      <>
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
                      <Avatar sx={{ bgcolor: 'action.main' }}>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contact.name}
                      secondary={contact.number}
                    />
                  </ListItem>
                )
            )
          : 'No contacts'}
      </List>
    </Box>
  );
};
