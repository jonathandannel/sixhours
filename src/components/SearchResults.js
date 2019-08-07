import { createElement as h, useState, useEffect } from 'react';
import { getColor } from 'random-material-color';
import { Typography } from '@material-ui/core';
import { searchResultStyles } from './styles';
import ResultCard from './ResultCard';

const SearchResults = ({
  allWorkOrders,
  byWorker,
  allWorkers,
  workerSearchTerm,
  showNewestFirst,
  uniqueWorkerIds,
}) => {
  const { searchResultContainer, resultText, resultList } = searchResultStyles();
  const [userColors, setUserColors] = useState(null);

  useEffect(() => {
    // Assign each unique worker ID a color
    if (uniqueWorkerIds) {
      const colors = uniqueWorkerIds.reduce((a, e) => {
        a.set(e, getColor());
        return a;
      }, new Map());
      setUserColors(colors);
    }
    return () => setUserColors(null);
  }, [uniqueWorkerIds]);

  const searchWithResults = workerSearchTerm && byWorker;
  const searchWithoutResults = workerSearchTerm && !byWorker;
  const showingAll = !workerSearchTerm;

  return h(
    'div',
    { className: searchResultContainer },
    h(
      Typography,
      { variant: 'h5', className: resultText },
      showingAll && `Showing all ${allWorkOrders.length} orders`,
      searchWithResults
        && `${byWorker.length} ${
          byWorker.length === 1 ? 'order' : 'orders'
        } found matching '${workerSearchTerm}'`,
      searchWithoutResults && `No orders found matching '${workerSearchTerm}'`,
    ),
    !searchWithoutResults
      && h(
        'div',
        { className: resultList },
        showingAll
          && allWorkOrders
            .sort((a, b) => {
              if (showNewestFirst) {
                return a.deadline - b.deadline;
              }
              return b.deadline - a.deadline;
            })
            .map(order => h(ResultCard, { allWorkers, order, userColors })),
        searchWithResults
          && byWorker
            .sort((a, b) => {
              if (showNewestFirst) {
                return a.deadline - b.deadline;
              }
              return b.deadline - a.deadline;
            })
            .map(order => h(ResultCard, { allWorkers, order, userColors })),
      ),
  );
};

export default SearchResults;
