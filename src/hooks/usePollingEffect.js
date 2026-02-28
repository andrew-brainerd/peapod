import { useEffect, useState } from 'react';
import useInterval from './useInterval';

const usePollingEffect = (
  effectFunction,
  effectDependencies,
  pollInterval = 10000
) => {
  const [isPolling, setIsPolling] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  const getIsDataStale = () => Date.now() - lastUpdateTime > pollInterval;

  useEffect(() => {
    setIsPolling(false);
    effectFunction();
    setLastUpdateTime(Date.now()); // eslint-disable-next-line
  }, effectDependencies);

  useInterval(() => {
    if (getIsDataStale()) {
      setIsPolling(true);
      effectFunction();
      setLastUpdateTime(Date.now());
    }
  }, pollInterval);

  return { isPolling };
};

export default usePollingEffect;
