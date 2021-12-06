import { omit } from 'lodash-es';
import { TextComponentProps, ImageComponentProps } from '@/defaultProps';

export interface TextComponentType {
  name: 'l-text' | string;
  text: string,
  styleProps: Partial<Omit<TextComponentProps, 'text'>>
}
export interface ImageComponentType {
  name: 'l-image';
  src: string,
  styleProps: Partial<Omit<ImageComponentProps, 'src'>>
}
export const defaultTextTemplates = [
  {
    text: '大标题',
    fontSize: '30px',
    fontWeight: 'bold',
    name: 'h2',
  },
  {
    text: '正文内容',
    name: 'p',
  },
  {
    text: '链接内容',
    color: '#1890ff',
    textDecoration: 'underline',
    name: 'p',
  },
  {
    text: '按钮内容',
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
    name: 'button',
    textAlign: 'center',
  },
];

export const textList: TextComponentType[] = defaultTextTemplates.map((prop) => {
  const { name, text } = prop;
  return {
    name,
    text,
    styleProps: omit(prop, ['name', 'text']),
  };
});
