import {
  commonDefaultProps, textDefaultProps, imageDefaultProps, shapeDefaultProps,
} from '@/defaultProps';

export interface CreateComponentType {
  name: 'l-text' | 'l-image' | 'l-shape';
  text?: string;
  type?: string;
  props: { [key: string]: string };
}

interface DefaultPropsType {
  [key: string]: {
    props: object;
    extraProps?: { [key: string]: any };
  };
}

const componentsDefaultProps: DefaultPropsType = {
  'l-text': {
    props: {
      ...textDefaultProps,
      fontSize: '14px',
      width: '125px',
      height: '36px',
      left: `${(320 / 2) - (125 / 2)}px`,
      top: `${(500 / 2) - (36 / 2)}px`,
    },
  },
  'l-image': {
    props: {
      ...imageDefaultProps,
    },
  },
  'l-shape': {
    props: {
      ...shapeDefaultProps,
    },
  },
};

const defaultTextTemplates = [
  {
    text: '大标题',
    fontSize: '30px',
    fontWeight: 'bold',
    tag: 'h2',
  },
  {
    text: '楷体副标题',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: '"KaiTi","STKaiti"',
    tag: 'h2',
  },
  {
    text: '正文内容',
    tag: 'p',
  },
  {
    text: '宋体正文内容',
    tag: 'p',
    fontFamily: '"SimSun","STSong"',
  },
  {
    text: 'Arial style',
    tag: 'p',
    fontFamily: '"Arial", sans-serif',
  },
  {
    text: 'Comic Sans',
    tag: 'p',
    fontFamily: '"Comic Sans MS"',
  },
  {
    text: 'Courier New',
    tag: 'p',
    fontFamily: '"Courier New", monospace',
  },
  {
    text: 'Times New Roman',
    tag: 'p',
    fontFamily: '"Times New Roman", serif',
  },
  {
    text: '链接内容',
    color: '#1890ff',
    textDecoration: 'underline',
    tag: 'p',
  },
  {
    text: '按钮内容',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#1890ff',
    borderWidth: '1px',
    borderColor: '#1890ff',
    borderStyle: 'solid',
    borderRadius: '2px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '100px',
    tag: 'button',
    textAlign: 'center',
  },
];
const defaultImgTemplates = [
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/logo-white-735536.png',
  },
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/logo-black-049885.png',
  },
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/528w-0ilmEQMomZ8-108048.png',
  },
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/frame-096161.png',
  },
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/text-449964.png',
  },
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/text2-288504.png',
  },
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/bag-904186.png',
  },
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/text3-086652.png',
  },
  {
    ...commonDefaultProps,
    src: 'http://static.imooc-lego.com/upload-files/text4-145592.png',
  },
];
const defaultShapeTemplates = [
  {
    backgroundColor: '#efefef',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    width: '100px',
    height: '50px',
  },
  {
    backgroundColor: '#efefef',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: '100px',
    width: '100px',
    height: '100px',
  },
  {
    backgroundColor: '#efefef',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    width: '100px',
    height: '100px',
  },
  {
    backgroundColor: '#36cfc9',
    width: '100px',
    height: '50px',
  },
  {
    backgroundColor: '#40a9ff',
    borderRadius: '100px',
    width: '100px',
    height: '100px',
  },
  {
    backgroundColor: '#9254de',
    borderWidth: '5px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    width: '100px',
    height: '100px',
  },
];

export const textList: CreateComponentType[] = defaultTextTemplates.map((prop) => ({
  name: 'l-text',
  text: prop.text,
  props: {
    ...componentsDefaultProps['l-text'].props,
    ...(prop as any),
  },
}));

export const imageList: CreateComponentType[] = defaultImgTemplates.map((prop) => ({
  name: 'l-image',
  props: {
    ...componentsDefaultProps['l-image'].props,
    ...(prop as any),
    width: '150px',
  },
}));

export const shapeList: CreateComponentType[] = defaultShapeTemplates.map((prop) => ({
  name: 'l-shape',
  props: {
    ...componentsDefaultProps['l-shape'].props,
    ...(prop as any),
  },
}));
