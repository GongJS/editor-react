import { useRecoilState } from 'recoil';
import { cloneDeep } from 'lodash-es';
import { pageData as data } from '@/store/editor';

const usePageData = () => {
  const [pageData, setPageData] = useRecoilState(data);
  const copyPageData = cloneDeep(pageData);
  const updatePageData = (key: string, value: string) => {
    copyPageData.props[key] = value;
    setPageData((oldPageData) => ({
      ...oldPageData,
      props: {
        ...copyPageData.props,
      },
    }));
  };
  return {
    updatePageData,
  };
};
export default usePageData;
