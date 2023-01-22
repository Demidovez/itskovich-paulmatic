import { useCallback, useState } from 'react';

import { usePrompt } from './usePrompt';

const useYouSure = (close, withoutUsePrompt = false) => {
  const onClose = useCallback(() => close(), [close]);
  const [ isChanged, setIsChanged ] = useState(false);

  usePrompt(withoutUsePrompt ? false : isChanged);

  const tryClose = useCallback(() => {
    if (!isChanged) {
      setIsChanged(false);
      onClose();
    } else {
      const answer = window.confirm('Вы уверены, что хотите закрыть?');

      if (answer) {
        setIsChanged(false);
        onClose();
      }
    }
  }, [ isChanged, onClose, setIsChanged ]);

  const tryForceClose = useCallback(() => {
    setIsChanged(false);
    onClose();
  }, [ onClose, setIsChanged ]);

  return { tryClose, tryForceClose, setIsChanged };
};

export default useYouSure;
