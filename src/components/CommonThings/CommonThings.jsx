import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetCommonInfoQuery } from "store/api/common";
import { setCommonInfo } from "store/slices/commonSlice";

const CommonThings = () => {
  const dispatch = useDispatch();

  const [getCommonInfo, { data: commonData }] = useLazyGetCommonInfoQuery();

  useEffect(() => {
    getCommonInfo();
  }, []);

  useEffect(() => {
    commonData && dispatch(setCommonInfo(commonData));
  }, [commonData]);

  return <></>;
};

export default CommonThings;
