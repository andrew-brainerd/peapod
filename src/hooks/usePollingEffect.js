import { useEffect, useState } from 'react';
import moment from 'moment';
import useInterval from './useInterval';

const usePollingEffect = (
  effectFunction,
  effectDependencies,
  pollInterval = 10000
) => {
  const [isPolling, setIsPolling] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  const getIsDataStale = currentMoment =>
    moment.duration(currentMoment.diff(lastUpdateTime)).asMilliseconds() > pollInterval;

  useEffect(() => {
    setIsPolling(false);
    effectFunction();
    setLastUpdateTime(moment()); // eslint-disable-next-line
  }, effectDependencies);

  useInterval(() => {
    if (getIsDataStale(moment())) {
      setIsPolling(true);
      effectFunction();
      setLastUpdateTime(moment());
    }
  }, pollInterval);

  return { isPolling };
};

export default usePollingEffect;
