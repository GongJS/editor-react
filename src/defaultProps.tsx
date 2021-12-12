import { without } from 'lodash-es';
import {
  Button, Input, InputNumber, Radio, Select, Slider, Switch,
} from 'antd';
import ColorPicker from '@/components/color-picker';
import ImageProcessor from '@/components/image-processor';
import ShadowPicker from '@/components/shadow-picker';
import IconSwitch from '@/components/icon-switch';

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
const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' },
];
const defaultHandler = {
  component: 'input',
  eventName: 'change',
  valueTransform: 'value',
  initialTransform: (v: any) => v,
  afterTransform: (e: any) => e,
};
const fontFamilyOptions = fontFamilyArr.map((font) => ({
  value: font.value,
  text: <span style={{ fontFamily: font.value }}>{font.text}</span> as any,
}));
const pxToNumberHandler: PropToForm = {
  component: 'input-number',
  initialTransform: (v: string) => (v ? parseInt(v, 10) : 0),
  afterTransform: (v: number) => (v ? `${v}px` : ''),
};
export const mapPropsToForms: PropsToForms = {
  // textComponentProps
  text: {
    text: '文本',
    component: 'textarea',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    component: 'input-number',
    initialTransform: (v: string) => parseInt(v, 10),
    afterTransform: (v: string) => (v ? `${v}px` : ''),
  },
  fontWeight: {
    component: 'icon-switch',
    afterTransform: (v: string) => (v === 'bold' ? 'normal' : 'bold'),
    extraProps: { iconName: 'BoldOutlined', tip: '加粗', valueTransform: (v: string) => (v === 'bold') },
  },
  fontStyle: {
    component: 'icon-switch',
    afterTransform: (v: string) => (v === 'italic' ? 'normal' : 'italic'),
    extraProps: { iconName: 'ItalicOutlined', tip: '斜体', valueTransform: (v: string) => (v === 'italic') },
  },
  textDecoration: {
    component: 'icon-switch',
    afterTransform: (v: string) => (v === 'underline' ? 'none' : 'underline'),
    extraProps: { iconName: 'UnderlineOutlined', tip: '下划线', valueTransform: (v: string) => (v === 'underline') },
  },
  lineHeight: {
    text: '行高',
    component: 'slider',
    extraProps: { min: 0, max: 100 },
    afterTransform: (v: number) => `${v}px`,
    initialTransform: (v: string) => parseInt(v, 10),
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
      ...fontFamilyOptions,
    ],
  },
  color: {
    component: 'color',
    text: '字体颜色',
  },
  backgroundColor: {
    component: 'color-picker',
    text: '背景颜色',
  },
  // imageComponentProps
  src: {
    component: 'src',
    text: '图片',
  },
  // commonComponentProps - sizes
  width: {
    text: '宽度',
    ...pxToNumberHandler,
  },
  height: {
    text: '高度',
    ...pxToNumberHandler,
  },
  paddingLeft: {
    ...pxToNumberHandler,
    text: '左边距',
  },
  paddingRight: {
    ...pxToNumberHandler,
    text: '右边距',
  },
  paddingTop: {
    ...pxToNumberHandler,
    text: '上边距',
  },
  paddingBottom: {
    ...pxToNumberHandler,
    text: '下边距',
  },
  // commonComponentProps - border type
  borderStyle: {
    ...defaultHandler,
    component: 'select',
    subComponent: 'select-option',
    text: '边框类型',
    options: [
      { value: 'none', text: '无' },
      { value: 'solid', text: '实线' },
      { value: 'dashed', text: '破折线' },
      { value: 'dotted', text: '点状线' },
    ],
  },
  borderColor: {
    ...defaultHandler,
    component: 'color-picker',
    text: '边框颜色',
  },
  borderWidth: {
    ...pxToNumberHandler,
    component: 'slider',
    text: '边框宽度',
    extraProps: { min: 0, max: 20 },
  },
  borderRadius: {
    ...pxToNumberHandler,
    component: 'slider',
    text: '边框圆角',
    extraProps: { min: 0, max: 200 },
  },
  // commonComponentProps - opacity and boxShadow
  opacity: {
    component: 'slider',
    text: '透明度',
    initialTransform: (v: number) => (v < 1 ? v * 100 : 100),
    afterTransform: (v: number) => (v / 100),
    extraProps: { min: 0, max: 100, reverse: true },
  },
  boxShadow: {
    text: '阴影',
    component: 'shadow-picker',
  },
  // commonComponentProps - positions
  left: {
    ...pxToNumberHandler,
    text: 'X轴坐标',
  },
  top: {
    ...pxToNumberHandler,
    text: 'Y轴坐标',
  },
  // commonComponentProps - actions and urls
  // actions
  actionType: {
    ...defaultHandler,
    component: 'select',
    subComponent: 'select-option',
    text: '点击',
    options: [
      { value: '', text: '无' },
      { value: 'to', text: '跳转到 URL' },
    ],
  },
  url: {
    ...defaultHandler,
    afterTransform: (e: any) => e.target.value,
    text: '链接',
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
  'shadow-picker': ShadowPicker,
  'icon-switch': IconSwitch,
  'color-picker': ColorPicker,
};
