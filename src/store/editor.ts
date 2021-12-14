import {
  atom,
  selector,
} from 'recoil';
import {
  TextComponentProps, ImageComponentProps, PageData,
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

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 页面信息
  page: PageData;
}

export const testComponents: ComponentData[] = [];

const pageDefaultProps = {
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
    pageData: pageDefaultProps,
    currentElement: '',
    copiedComponent: {} as ComponentData,
  },
});

export const getCurrentElement = selector({
  key: 'getCurrentElement',
  get: ({ get }) => {
    const state = get(editorData);
    return state.components.find((component) => component.id === state.currentElement);
  },
});

export default editorData;
