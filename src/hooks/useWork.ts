import { useSetRecoilState } from 'recoil';
import componentData, { pageData, PageDataProps, ComponentDataProps } from '@/store/editor';

interface WorkProps extends PageDataProps {
  content: {
    components: ComponentDataProps[],
    props: { [key: string]: any };
    setting: { [key: string]: any };
  }
}
const useWork = () => {
  const setComponent = useSetRecoilState(componentData);
  const setPage = useSetRecoilState(pageData);
  const getWork = (data: WorkProps) => {
    const { content, ...rest } = data;
    setPage((oldPage) => ({
      ...oldPage,
      ...rest,
      props: {
        ...oldPage.props,
        ...content.props,
      },
      setting: {
        ...oldPage.setting,
        ...content.setting,
      },
    }));
    setComponent((oldComponent) => ({
      ...oldComponent,
      components: [
        ...content.components,
      ],
    }));
  };
  return {
    getWork,
  };
};

export default useWork;
