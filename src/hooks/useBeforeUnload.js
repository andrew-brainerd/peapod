import { useRef, useEffect } from 'react';

const useBeforeUnload = (unloadFunction = () => {}) => {
  const unloadFunctionRef = useRef(unloadFunction);

  useEffect(() => {
    unloadFunctionRef.current = unloadFunction;
  }, [unloadFunction]);

  useEffect(() => {
    const handleBeforeUnload = event => {
      let returnValue;

      if (typeof unloadFunctionRef.current === 'function') {
        returnValue = unloadFunctionRef.current(event);
      }

      if (event.defaultPrevented) {
        event.returnValue = '';
      }

      if (typeof returnValue === 'string') {
        event.returnValue = returnValue;
        return returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};

export default useBeforeUnload;
