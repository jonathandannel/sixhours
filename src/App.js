import { createElement as h, useEffect, useState } from 'react';
import mainContainerStyles from './styles';

import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { API_ORDERS, API_WORKERS } from './.private.js';

const fetchAllWorkOrders = () => fetch(`${API_ORDERS}`).then(res => res.json());
const fetchWorkerInfo = id => fetch(`${API_WORKERS}/${id}`).then(res => res.json());

const App = () => {
  const [allWorkOrders, setAllWorkOrders] = useState(null);
  const [uniqueWorkerIds, setUniqueWorkerIds] = useState(null);
  const [allWorkers, setAllWorkers] = useState([]);
  const [byWorker, setByWorker] = useState(null);
  const [workerSearchTerm, setWorkerSearchTerm] = useState(null);
  const [showNewestFirst, setShowNewestFirst] = useState(true);
  const { mainContainer } = mainContainerStyles();

  const showResults = allWorkOrders && allWorkers;

  useEffect(() => {
    if (!allWorkOrders) {
      fetchAllWorkOrders().then(({ orders }) => setAllWorkOrders(orders));
    }
  }, [allWorkOrders]);

  useEffect(() => {
    if (allWorkOrders) {
      // Get a list of all unique, relevant worker IDs from active orders
      const workers = allWorkOrders.reduce((acc, { workerId }) => {
        if (!acc.has(workerId)) {
          acc.add(workerId);
        }
        return acc;
      }, new Set());
      setUniqueWorkerIds(Array.from(workers));
    }
    return () => setUniqueWorkerIds(null);
  }, [allWorkOrders]);

  useEffect(() => {
    if (allWorkOrders && uniqueWorkerIds) {
      // Use unique worker IDs to batch query
      // This prevents re-fetching worker data based on changing search filters
      const workers = uniqueWorkerIds.map(id => fetchWorkerInfo(id).then(({ worker }) => worker));
      if (workers.length === uniqueWorkerIds.length) {
        Promise.all(workers).then(w => setAllWorkers(w));
      }
    }
    return () => setAllWorkers(null);
  }, [allWorkOrders, uniqueWorkerIds]);

  useEffect(() => {
    if (allWorkers && workerSearchTerm) {
      // Get a list of orders by worker
      const matchingWorker = allWorkers.find(({ name }) =>
        name.toLowerCase().includes(workerSearchTerm),
      );
      const results = matchingWorker
        ? allWorkOrders.filter(({ workerId }) => workerId === matchingWorker.id)
        : null;
      if (results) {
        setByWorker(results);
      }
    }
    return () => setByWorker(null);
  }, [workerSearchTerm, allWorkers]);

  const handleWorkerSearch = ({ target: { value } }) => {
    const searchTerm = value.toLowerCase().trim();
    if (value.length > 2) {
      setWorkerSearchTerm(searchTerm);
    }
    if (!value.length) {
      setWorkerSearchTerm(null);
    }
  };

  const clearSearch = () => setWorkerSearchTerm(null);

  const toggleNewestFirst = () => setShowNewestFirst(!showNewestFirst);

  return h(
    'div',
    { className: mainContainer },
    h(Search, { handleWorkerSearch, clearSearch, toggleNewestFirst, showNewestFirst }),
    showResults &&
      h(SearchResults, {
        allWorkOrders,
        workerSearchTerm,
        allWorkers,
        uniqueWorkerIds,
        showNewestFirst,
        byWorker,
        fetchWorkerInfo,
      }),
  );
};

export default App;
