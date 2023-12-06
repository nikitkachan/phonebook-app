import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { instance } from 'redux/auth/auth.reducer';

export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('/contacts');

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkApi) => {
    try {
      const { data } = await instance.post('/contacts', contact);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addToFavorite = createAsyncThunk(
  'contacts/addToFavorite',
  async (contact, thunkApi) => {
    try {
      const { data } = await instance.put(`/contacts/${contact.id}`, contact);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteFromFavorite = createAsyncThunk(
  'contacts/deleteFromFavorite',
  async (contact, thunkApi) => {
    try {
      const { data } = await instance.put(`/contacts/${contact.id}`, contact);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
      })
      .addCase(addContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, payload];
        toast.success(`Now ${payload.name} in your phonebook`);
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload.id
        );
        toast(`❌ ${payload.name} was deleted from phonebook`);
      })
      .addCase(addToFavorite.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload.id
        );
        state.contacts = [...state.contacts, payload];
      })
      .addCase(deleteFromFavorite.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload.id
        );
        state.contacts = [...state.contacts, payload];
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContacts.pending,
          deleteContacts.pending,
          addToFavorite.pending,
          deleteFromFavorite.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContacts.rejected,
          deleteContacts.rejected,
          addToFavorite.rejected,
          deleteFromFavorite.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const contactsReducer = contactsSlice.reducer;
