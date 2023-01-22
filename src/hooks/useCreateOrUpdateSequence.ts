import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useCreateOrUpdateSequenceMutation } from '~src/store/api/sequences';
import { addHtmlTemplates } from '~src/store/slices/commonSlice';

const useCreateOrUpdateSequence = (closeMaster) => {
  const dispatch = useDispatch();

  const [
    createOrUpdate,
    { data: resultOfCreateOrUpdateSequence, isError, error, isSuccess },
  ] = useCreateOrUpdateSequenceMutation();

  useEffect(() => {
    if (isSuccess) {
      closeMaster();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      try {
        toast.error(error.data.error.message);
      } catch (err) {
        console.error(err);
        toast.error('Ошибка сохранения');
      }
    }
  }, [ isError, error ]);

  useEffect(() => {
    if (
      resultOfCreateOrUpdateSequence &&
      resultOfCreateOrUpdateSequence.templates
    ) {
      dispatch(addHtmlTemplates(resultOfCreateOrUpdateSequence.templates));
    }
  }, [resultOfCreateOrUpdateSequence]);

  return { createOrUpdate };
};

export default useCreateOrUpdateSequence;
