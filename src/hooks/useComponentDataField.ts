import { useRecoilState, useRecoilValue } from 'recoil';
import { TextComponentProps } from '@/defaultProps';
import editorData, { ComponentData, getCurrentElement } from '@/store/editor';

export const useComponentDataField = () => {
  const [editor, setEditor] = useRecoilState(editorData);
  const currentElement = JSON.parse(JSON.stringify(useRecoilValue(getCurrentElement)));
  const copyComponents = JSON.parse(JSON.stringify(editor.components));
  const updateComponentField = (key: keyof TextComponentProps, value: string) => {
    copyComponents.map((component: ComponentData) => {
      if (component.id === currentElement.id) {
        component.props[key] = value;
      }
      return component;
    });
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: copyComponents,
    }));
  };
  return {
    updateComponentField,
  };
};

export default useComponentDataField;
