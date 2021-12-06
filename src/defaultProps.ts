import { without } from 'lodash-es';
import {
  Button, Input, InputNumber, Radio, Select, Slider, Switch,
} from 'antd';
import ColorPicker from '@/components/color-picker';
import ImageProcessor from '@/components/image-processor';

export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '373px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  // position and x,y
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0',
};
export interface ImageComponentProps extends CommonComponentProps {
  src: string;
}
export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}
export type AllComponentProps = TextComponentProps & ImageComponentProps
export const imageDefaultProps: ImageComponentProps = {
  src: '',
  ...commonDefaultProps,
};
export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps,
};
export const textStylePropNames = without(Object.keys(textDefaultProps), 'actionType', 'url', 'text');
export const imageStylePropsNames = without(Object.keys(imageDefaultProps), 'src', 'actionType', 'url', 'text');

export interface PropToForm {
  component: string;
  subComponent?: string;
  value?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string; value: any }[];
  afterTransform?: (e: any) => any;
  initialTransform?: (v: any) => any;
}
export type PropsToForms = {
  [P in keyof AllComponentProps]?: PropToForm
}
const pxToNumberHandler: PropToForm = {
  component: 'input-number',
  initialTransform: (v: string) => parseInt(v, 10),
  afterTransform: (e: number) => (e ? `${e}px` : ''),
};
export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'textarea',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    component: 'input-number',
    initialTransform: (e: any) => parseInt(e, 10),
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  lineHeight: {
    text: '行高',
    component: 'slider',
    extraProps: { min: 0, max: 3, step: 1 },
    afterTransform: (e: number) => e.toString(),
    initialTransform: (e: any) => parseInt(e, 10),
  },
  textAlign: {
    component: 'radio-group',
    subComponent: 'radio-button',
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'select',
    subComponent: 'select-option',
    text: '字体',
    options: [
      { value: '', text: '无' },
      { text: '宋体', value: '"SimSun","STSong"' },
      { text: '黑体', value: '"SimHei","STHeiti"' },
      { text: '楷体', value: '"KaiTi","STKaiti"' },
      { text: '仿宋', value: '"FangSong","STFangsong"' },
    ],
  },
  width: {
    text: '宽度',
    ...pxToNumberHandler,
  },
  color: {
    component: 'color',
    text: '字体颜色',
  },
  src: {
    component: 'src',
    text: '图片',
  },
};

export const componentMap = {
  button: Button,
  switch: Switch,
  input: Input,
  textarea: Input.TextArea,
  slider: Slider,
  select: Select,
  color: ColorPicker,
  src: ImageProcessor,
  'radio-group': Radio.Group,
  'input-number': InputNumber,
  'radio-button': Radio.Button,
  'select-option': Select.Option,
};
