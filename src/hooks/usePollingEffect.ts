import { useEffect, useState, type DependencyList } from 'react';
import useInterval from './useInterval';

const usePollingEffect = (
  effectFunction: () => void,
  effectDependencies: DependencyList,
  pollInterval: number | null = 10000
): { isPolling: boolean } => {
  const [isPolling, setIsPolling] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  const getIsDataStale = () => Date.now() - lastUpdateTime > (pollInterval ?? 10000);

  useEffect(() => {
    setIsPolling(false);
    effectFunction();
    setLastUpdateTime(Date.now());
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
