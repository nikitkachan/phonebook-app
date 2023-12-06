import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { addContacts } from 'redux/contacts/contacts.reducer.js';
import { selectContacts } from 'redux/selectors/selectors.js';
import { toast } from 'react-toastify';
import { selectIsLoading } from 'redux/selectors/selectors.js';
import PhonebookLoader from 'components/Loader/PhonebookLoader';

export const AddContact = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const contacts = useSelector(selectContacts);

  const handleAddContact = contactData => {
    const isExist = contacts.some(contact => contact.name === contactData.name);
    if (isExist) {
      toast.error(`${contactData.name} is already in contacts.`);
      return;
    }

    dispatch(addContacts(contactData));
  };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const contactData = {
      name,
      number: phone,
    };

    if (contactData.name.trim() === '') {
      toast.error('Please enter name!');
      return;
    } else if (contactData.number.trim() === '') {
      toast.error('Please enter phone number!');
      return;
    }
    handleAddContact(contactData);
    formReset();
  };

  const handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const formReset = () => {
    setName('');
    setPhone('');
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            type="text"
            name="name"
            label="Name"
            value={name}
            onChange={handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces."
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="phone"
            label="Phone number"
            type="number"
            id="phone"
            autoComplete="tel"
            value={phone}
            onChange={handleInputChange}
            pattern="^\+?\d{1,4}[ .\-]?\(?\d{1,3}\)?[ .\-]?\d{1,4}[ .\-]?\d{1,4}[ .\-]?\d{1,9}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
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
        {isLoading ? <PhonebookLoader /> : 'Add contact'}
      </Button>
    </Box>
  );
};
