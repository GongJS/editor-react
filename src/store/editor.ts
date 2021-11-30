import {
  atom,
} from 'recoil';
import { v4 as uuidv4 } from 'uuid';

interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: { [key: string]: any };
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等
  name: string;
}

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'l-text', props: { text: 'hello', 'font-size': '20px' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello2', 'font-size': '20px' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello3', 'font-size': '20px' } },
];

const editorData = atom({
  key: 'editorData',
  default: {
    components: testComponents,
    currentElement: '',
  },
});

export default editorData;
