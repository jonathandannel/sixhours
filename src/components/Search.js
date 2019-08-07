import { createElement as h } from 'react';
import { TextField, IconButton, Switch, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { searchStyles } from './styles';

const Search = ({ handleWorkerSearch, clearSearch, showNewestFirst, toggleNewestFirst }) => {
  const {
    searchContainer,
    searchInput,
    searchActions,
    clearButton,
    switchContainer,
    switchText,
  } = searchStyles();

  return h(
    'div',
    { className: searchContainer },
    h(TextField, {
      onChange: handleWorkerSearch,
      label: 'Filter by worker name',
      placeholder: '',
      className: searchInput,
    }),
    h(
      'div',
      { className: searchActions },
      h(IconButton, { className: clearButton, onClick: clearSearch }, h(Close)),
      h(
        'div',
        { className: switchContainer },
        h(Switch, { checked: showNewestFirst, onChange: toggleNewestFirst }),
        h(
          Typography,
          { variant: 'body2', className: switchText },
          showNewestFirst ? 'Earliest' : 'Latest',
        ),
      ),
    ),
  );
};

export default Search;
