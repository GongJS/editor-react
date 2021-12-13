import {
  atom,
  selector,
} from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import {
  TextComponentProps, ImageComponentProps, textDefaultProps, imageDefaultProps, PageData,
} from '@/defaultProps';

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<TextComponentProps> & Partial<ImageComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等
  name: 'l-text' | 'l-image';
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

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    layerName: '图层1',
    props: {
      ...textDefaultProps, text: 'hello', fontSize: '20px', color: '#000000', lineHeight: '1', textAlign: 'left', fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    layerName: '图层2',
    props: {
      ...textDefaultProps, text: 'hello2', fontSize: '10px', fontWeight: 'bold', lineHeight: '2', textAlign: 'left', fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    layerName: '图层3',
    props: {
      ...textDefaultProps, text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com', lineHeight: '3', textAlign: 'left', fontFamily: '',
    },
  },
  {
    id: uuidv4(), name: 'l-image', layerName: '图层4', props: { ...imageDefaultProps, src: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg', width: '100px' },
  },
];

const pageDefaultProps = {
  backgroundColor: '#ffffff', backgroundImage: 'url("https://static.imooc-lego.com/upload-files/%E5%B9%BC%E5%84%BF%E5%9B%AD%E8%83%8C%E6%99%AF%E5%9B%BE-994372.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '560px',
};
const editorData = atom({
  key: 'editorData',
  default: {
    components: testComponents,
    pageData: pageDefaultProps,
    currentElement: '',
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
