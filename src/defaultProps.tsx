import { without } from 'lodash-es';
import {
  Button, Input, InputNumber, Radio, Select, Slider, Switch,
} from 'antd';
import ColorPicker from '@/components/color-picker';
import ImageProcessor from '@/components/image-processor';
import ShadowPicker from '@/components/shadow-picker';
import IconSwitch from '@/components/icon-switch';
import BackgroundProcessor from '@/components/background-processor';

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
export const commonComponentDefaultData: CommonComponentProps = {
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
export interface ShapeComponentProps extends CommonComponentProps {
  backgroundColor: string;
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
export type AllComponentProps = TextComponentProps & ImageComponentProps & ShapeComponentProps

export const imageDefaultProps: ImageComponentProps = {
  src: '',
  ...commonComponentDefaultData,
};
export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: '????????????',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '',
  ...commonComponentDefaultData,
};
export const shapeDefaultProps: ShapeComponentProps = {
  backgroundColor: '',
  ...commonComponentDefaultData,
};
export const textStylePropNames = without(Object.keys(textDefaultProps), 'actionType', 'url', 'text');
export const imageStylePropsNames = without(Object.keys(imageDefaultProps), 'src', 'actionType', 'url', 'text');
export const shapeStylePropsNames = without(Object.keys(shapeDefaultProps), 'actionType', 'url', 'text');

export interface PropToForm {
  component: string;
  subComponent?: string;
  value?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string; value: any }[];
  afterTransform?: (v: any) => any;
  initialTransform?: (v: any) => any;
}
export type PropsToForms = {
  [key: string]: PropToForm
}
const fontFamilyArr = [
  { text: '??????', value: '"SimSun","STSong"' },
  { text: '??????', value: '"SimHei","STHeiti"' },
  { text: '??????', value: '"KaiTi","STKaiti"' },
  { text: '??????', value: '"FangSong","STFangsong"' },
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
    text: '??????',
    component: 'textarea',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '??????',
    component: 'input-number',
    initialTransform: (v: string) => parseInt(v, 10),
    afterTransform: (v: string) => (v ? `${v}px` : ''),
  },
  fontWeight: {
    component: 'icon-switch',
    afterTransform: (v: string) => (v === 'bold' ? 'normal' : 'bold'),
    extraProps: { iconName: 'BoldOutlined', tip: '??????', valueTransform: (v: string) => (v === 'bold') },
  },
  fontStyle: {
    component: 'icon-switch',
    afterTransform: (v: string) => (v === 'italic' ? 'normal' : 'italic'),
    extraProps: { iconName: 'ItalicOutlined', tip: '??????', valueTransform: (v: string) => (v === 'italic') },
  },
  textDecoration: {
    component: 'icon-switch',
    afterTransform: (v: string) => (v === 'underline' ? 'none' : 'underline'),
    extraProps: { iconName: 'UnderlineOutlined', tip: '?????????', valueTransform: (v: string) => (v === 'underline') },
  },
  lineHeight: {
    text: '??????',
    component: 'slider',
    extraProps: { min: 0, max: 100 },
    afterTransform: (v: number) => `${v}px`,
    initialTransform: (v: string) => parseInt(v, 10),
  },
  textAlign: {
    component: 'radio-group',
    subComponent: 'radio-button',
    text: '??????',
    options: [
      { value: 'left', text: '???' },
      { value: 'center', text: '???' },
      { value: 'right', text: '???' },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'select',
    subComponent: 'select-option',
    text: '??????',
    options: [
      { value: '', text: '???' },
      ...fontFamilyOptions,
    ],
  },
  color: {
    component: 'color-picker',
    text: '????????????',
  },
  backgroundColor: {
    component: 'color-picker',
    text: '????????????',
  },
  // imageComponentProps
  src: {
    component: 'src',
    text: '??????',
  },
  // commonComponentProps - sizes
  width: {
    text: '??????',
    ...pxToNumberHandler,
  },
  height: {
    text: '??????',
    ...pxToNumberHandler,
  },
  paddingLeft: {
    ...pxToNumberHandler,
    text: '?????????',
  },
  paddingRight: {
    ...pxToNumberHandler,
    text: '?????????',
  },
  paddingTop: {
    ...pxToNumberHandler,
    text: '?????????',
  },
  paddingBottom: {
    ...pxToNumberHandler,
    text: '?????????',
  },
  // commonComponentProps - border type
  borderStyle: {
    ...defaultHandler,
    component: 'select',
    subComponent: 'select-option',
    text: '????????????',
    options: [
      { value: 'none', text: '???' },
      { value: 'solid', text: '??????' },
      { value: 'dashed', text: '?????????' },
      { value: 'dotted', text: '?????????' },
    ],
  },
  borderColor: {
    ...defaultHandler,
    component: 'color-picker',
    text: '????????????',
  },
  borderWidth: {
    ...pxToNumberHandler,
    component: 'slider',
    text: '????????????',
    extraProps: { min: 0, max: 20 },
  },
  borderRadius: {
    ...pxToNumberHandler,
    component: 'slider',
    text: '????????????',
    extraProps: { min: 0, max: 200 },
  },
  // commonComponentProps - opacity and boxShadow
  opacity: {
    component: 'slider',
    text: '?????????',
    initialTransform: (v: number) => (v < 1 ? v * 100 : 100),
    afterTransform: (v: number) => (v / 100),
    extraProps: { min: 0, max: 100, reverse: true },
  },
  boxShadow: {
    text: '??????',
    component: 'shadow-picker',
  },
  // commonComponentProps - positions
  left: {
    ...pxToNumberHandler,
    text: 'X?????????',
  },
  top: {
    ...pxToNumberHandler,
    text: 'Y?????????',
  },
  // commonComponentProps - actions and urls
  // actions
  actionType: {
    ...defaultHandler,
    component: 'select',
    subComponent: 'select-option',
    text: '??????',
    options: [
      { value: '', text: '???' },
      { value: 'to', text: '????????? URL' },
    ],
  },
  url: {
    ...defaultHandler,
    afterTransform: (e: any) => e.target.value,
    text: '??????',
  },
  backgroundImage: {
    component: 'background-processor',
    initialTransform: (v: string) => {
      if (v) {
        const matches = v.match(/\((.*?)\)/);
        if (matches && matches.length > 1) {
          return matches[1].replace(/('|")/g, '');
        }
        return '';
      }
      return '';
    },
    afterTransform: (e: string) => (e ? `url('${e}')` : ''),
    extraProps: { ratio: 8 / 15, showDelete: true },
  },
  backgroundSize: {
    component: 'select',
    subComponent: 'select-option',
    text: '????????????',
    options: [
      { value: 'contain', text: '????????????' },
      { value: 'cover', text: '????????????' },
      { value: '', text: '??????' },
    ],
  },
  backgroundRepeat: {
    component: 'select',
    subComponent: 'select-option',
    text: '????????????',
    options: [
      { value: 'no-repeat', text: '?????????' },
      { value: 'repeat-x', text: 'X?????????' },
      { value: 'repeat-y', text: 'Y?????????' },
      { value: 'repeat', text: '????????????' },
    ],
  },
};

export const componentMap = {
  button: Button,
  switch: Switch,
  input: Input,
  textarea: Input.TextArea,
  slider: Slider,
  select: Select,
  src: ImageProcessor,
  'radio-group': Radio.Group,
  'input-number': InputNumber,
  'radio-button': Radio.Button,
  'select-option': Select.Option,
  'shadow-picker': ShadowPicker,
  'icon-switch': IconSwitch,
  'color-picker': ColorPicker,
  'background-processor': BackgroundProcessor,
};
