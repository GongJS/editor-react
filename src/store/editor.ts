import { atom, selector } from 'recoil';
import {
  TextComponentProps,
  ImageComponentProps,
  ShapeComponentProps,
} from '@/defaultProps';

import { defaultTemplateData } from '@/defaultData';

export interface ComponentDataProps {
  // 这个元素的 属性，属性请详见下面
  props: Partial<TextComponentProps> &
    Partial<ImageComponentProps> &
    Partial<ShapeComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等
  name: 'l-text' | 'l-image' | 'l-shape';
  // 图层是否隐藏
  isHidden?: boolean;
  // 图层是否锁定
  isLocked?: boolean;
  // 图层名称
  layerName?: string;
}
export interface PageDataNormalProps {
  id?: number;
  title?: string;
  subTitle?: string;
  desc?: string;
  coverImg?: string;
  uuid?: string;
  latestPublishAt?: string;
  updatedAt?: string;
  isTemplate?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  author?: string;
  copiedCount?: number;
  status?: string;
}
export interface TemplateDataProps {
  id: number;
  copiedCount: number;
  title: string;
  author: string;
  desc: string;
  coverImg: string;
  createdAt: string;
  isHot: boolean;
  user: {
    nickName: string;
    username: string;
  };
}
export interface ChannelDataProps {
  id: number;
  name: string;
  workId: number;
}
export interface PageDataProps extends PageDataNormalProps {
  props: { [key: string]: any };
  setting: { [key: string]: any };
  user?: {
    gender: string;
    nickName: string;
    picture: string;
    userName: string;
  };
}

interface HistoryComponentProps {
  past: ComponentDataProps[][];
  present: ComponentDataProps[];
  future: ComponentDataProps[][];
}

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentDataProps[];
  // 当前编辑的是哪个组件，uuid
  currentElement: string;
  // 复制组件
  copiedComponent: ComponentDataProps;
}

const defaultPageData = {
  backgroundColor: '#ffffff',
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '560px',
};

const componentData = atom({
  key: 'editorData',
  default: {
    components: [],
    currentElement: '',
    copiedComponent: {} as ComponentDataProps,
  } as EditorProps,
});

export const pageData = atom({
  key: 'pageData',
  default: {
    props: defaultPageData,
    setting: {},
  } as PageDataProps,
});

export const historyComponentsData = atom({
  key: 'historyComponents',
  default: {
    past: [],
    present: [],
    future: [],
  } as HistoryComponentProps,
});

export const channelsData = atom({
  key: 'channelsData',
  default: [] as ChannelDataProps[],
});

export const getCurrentElement = selector({
  key: 'getCurrentElement',
  get: ({ get }) => {
    const state = get(componentData);
    return state.components.find((component) => component.id === state.currentElement);
  },
});

export default componentData;
