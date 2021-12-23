import { useRecoilState } from 'recoil';
import { cloneDeep } from 'lodash-es';
import { pageData as data, PageDataNormalProps } from '@/store/editor';

const usePageData = () => {
  const [pageData, setPageData] = useRecoilState(data);
  const updatePagePropsData = (key: string, value: string) => {
    const copyPageData = cloneDeep(pageData);
    copyPageData.props[key] = value;
    setPageData((oldPageData) => ({
      ...oldPageData,
      props: {
        ...copyPageData.props,
      },
    }));
  };
  const updatePageSettingData = (key: string, value: string) => {
    const copyPageData = cloneDeep(pageData);
    copyPageData.setting[key] = value;
    setPageData((oldPageData) => ({
      ...oldPageData,
      setting: {
        ...copyPageData.setting,
      },
    }));
  };
  const updatePageNormalData = (key: keyof PageDataNormalProps, value: any) => {
    const copyPageData = cloneDeep(pageData);
    copyPageData[key] = value;
    setPageData((oldPageData) => ({
      ...oldPageData,
      ...copyPageData,
    }));
  };
  return {
    updatePagePropsData,
    updatePageSettingData,
    updatePageNormalData,
  };
};
export default usePageData;
