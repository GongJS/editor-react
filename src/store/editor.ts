import {
  atom,
  selector,
} from 'recoil';
import {
  TextComponentProps, ImageComponentProps,
} from '@/defaultProps';

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<TextComponentProps> & Partial<ImageComponentProps>;
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

export interface PageData {
  [key: string]: any ;
  setting?: { [key: string]: any };
  id?: number;
  title?: string;
  desc?: string;
  coverImg?: string;
  uuid?: string;
}
interface HistoryComponentProps {
  past: ComponentData[][],
  present: ComponentData[],
  future: ComponentData[][]
}
export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 页面信息
  pageData: PageData;
  // 复制组件
  copiedComponent: ComponentData,
}

export const testComponents: ComponentData[] = [];

const defaultPageData = {
  backgroundColor: '#ffffff',
  backgroundImage: 'url("https://static.imooc-lego.com/upload-files/%E5%B9%BC%E5%84%BF%E5%9B%AD%E8%83%8C%E6%99%AF%E5%9B%BE-994372.jpg")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '560px',
};
const editorData = atom({
  key: 'editorData',
  default: {
    components: testComponents,
    pageData: defaultPageData,
    currentElement: '',
    copiedComponent: {} as ComponentData,
  } as EditorProps,
});

export const historyComponentsData = atom({
  key: 'historyComponents',
  default: {
    past: [],
    present: [],
    future: [],
  } as HistoryComponentProps,
});

export const getCurrentElement = selector({
  key: 'getCurrentElement',
  get: ({ get }) => {
    const state = get(editorData);
    return state.components.find((component) => component.id === state.currentElement);
  },
});

export default editorData;
