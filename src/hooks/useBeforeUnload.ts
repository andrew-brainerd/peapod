import { useRef, useEffect } from 'react';

type UnloadFunction = (event: BeforeUnloadEvent) => string | void;

const useBeforeUnload = (unloadFunction: UnloadFunction = () => {}): void => {
  const unloadFunctionRef = useRef(unloadFunction);

  useEffect(() => {
    unloadFunctionRef.current = unloadFunction;
  }, [unloadFunction]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
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
