import {
  atom,
  selector,
} from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { TextComponentProps, ImageComponentProps } from '@/defaultProps';

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<TextComponentProps> & Partial<ImageComponentProps>;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等
  name: 'l-text' | 'l-image';
}

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello', fontSize: '20px', color: '#000000', lineHeight: '1', textAlign: 'left', fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello2', fontSize: '10px', fontWeight: 'bold', lineHeight: '2', textAlign: 'left', fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com', lineHeight: '3', textAlign: 'left', fontFamily: '',
    },
  },
];

const editorData = atom({
  key: 'editorData',
  default: {
    components: testComponents,
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
