import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.phonebook.contacts;
export const selectFavoriteContacts = state => state.phonebook.favoriteContacts;
export const selectIsLoading = state => state.phonebook.isLoading;

export const selectFilter = state => state.filter.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
