import { useEffect, useState } from 'react';

const useLoader = (isLoading, loaderTime = 300) => {
  const [ isShowLoader, setIsShowLoader ] = useState(isLoading);
  const [ isCanDone, setIsCanDone ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCanDone(true);
    }, loaderTime);
  }, []);

  useEffect(() => {
    if (isLoading === false && isCanDone) {
      setIsShowLoader(false);
    }
  }, [ isLoading, isCanDone ]);

  return [isShowLoader];
};

export default useLoader;
