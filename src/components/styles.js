import { makeStyles } from '@material-ui/core/styles';

export const searchStyles = makeStyles(() => ({
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  searchInput: {
    width: '50vw',
    marginRight: '1rem',
  },
  closeButton: {
    marginLeft: '1rem',
  },
  searchActions: {
    display: 'flex',
  },
  flexGrow: {
    flexGrow: 1,
  },
  switchContainer: {
    display: 'flex',
    paddingTop: '0.25rem',
  },
  switchText: {
    marginLeft: '0.25rem',
    transform: 'translateY(0.5rem)',
  },
}));

export const searchResultStyles = makeStyles(() => ({
  searchResultContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  resultList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '1rem',
    padding: '1rem',
    justifyContent: 'center',
  },
  resultText: {
    margin: '1rem',
    display: 'flex',
    justifyContent: 'center',
    wordWrap: 'break-word',
  },
}));

export const resultCardStyles = makeStyles(() => ({
  resultCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
    padding: '1rem',
    width: '23vw',
  },
  flex: {
    display: 'flex',
  },
  workerInfo: {
    paddingLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  companyName: {
    marginLeft: '0.25rem',
  },
  slightMarginBottom: {
    marginBottom: '0.25rem',
  },
  dueDate: {
    transform: 'translateX(-1.25rem)',
  },
  green: {
    color: 'green',
  },
}));
