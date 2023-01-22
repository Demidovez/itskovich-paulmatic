import React, { useCallback, useRef, useState } from 'react';

function useRefCallback() {
  const [ element, setElement ] = useState(null);

  const setRef = useCallback((node) => {
    setElement(node);
  }, []);

  return [ element, setRef ];
}

export default useRefCallback;
