import { Box, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToFilter } from 'redux/filter/filter.reducer';

export const FilterContacts = () => {
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const value = event.target.value;
    dispatch(addToFilter(value));
  };

  return (
    <Box
      sx={{
        mt: 8,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="name"
            type="text"
            name="name"
            label="Find contacts by name"
            onChange={handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
