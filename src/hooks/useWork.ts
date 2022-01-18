import { useSetRecoilState } from 'recoil';
import componentData, {
  pageData,
  channelsData,
  PageDataProps,
  ChannelDataProps,
  ComponentDataProps,
} from '@/store/editor';
import usePageData from '@/hooks/usePageData';

export interface WorkProps extends PageDataProps {
  content: {
    components: ComponentDataProps[];
    props: { [key: string]: any };
    setting: { [key: string]: any };
  };
}
const useWork = () => {
  const setComponent = useSetRecoilState(componentData);
  const setPage = useSetRecoilState(pageData);
  const setChannels = useSetRecoilState(channelsData);
  const { updatePageNormalData } = usePageData();
  const getWork = (data: WorkProps) => {
    const { content, ...rest } = data;
    setPage((oldPage) => ({
      ...oldPage,
      ...rest,
      props: {
        ...oldPage.props,
        ...(content && { ...content.props }),
      },
      setting: {
        ...oldPage.setting,
        ...(content && { ...content.setting }),
      },
    }));
    setComponent((oldComponent) => ({
      ...oldComponent,
      ...(content && { components: content.components }),
    }));
  };
  const saveWork = () => {
    updatePageNormalData('updatedAt', new Date().toISOString());
  };
  const copyWork = () => {
    updatePageNormalData('updatedAt', new Date().toISOString());
  };
  const getChannels = (channelList: ChannelDataProps[]) => {
    setChannels(channelList);
  };
  const createChannel = (data: ChannelDataProps) => {
    setChannels((oldChannels) => [...oldChannels, data]);
  };
  const deleteChannel = (channelId: number) => {
    setChannels((oldChannels) => oldChannels.filter((ch) => ch.id !== channelId));
  };
  const publishTemplate = () => {
    updatePageNormalData('isTemplate', true);
  };
  const publishWork = () => {
    updatePageNormalData('latestPublishAt', new Date().toISOString());
  };
  return {
    getWork,
    copyWork,
    saveWork,
    getChannels,
    createChannel,
    deleteChannel,
    publishTemplate,
    publishWork,
  };
};

export default useWork;
