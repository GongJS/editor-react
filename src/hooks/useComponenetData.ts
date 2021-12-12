import { useRecoilState, useRecoilValue } from 'recoil';
import { cloneDeep } from 'lodash-es';
import { AllComponentProps } from '@/defaultProps';
import editorData, { ComponentData, getCurrentElement } from '@/store/editor';
import useDebounce from '@/hooks/useDebounce';

const useComponentData = () => {
  const [editor, setEditor] = useRecoilState(editorData);
  const copyComponents = cloneDeep(editor.components);
  const currentElement = useRecoilValue(getCurrentElement);
  const originUpdateComponent = (key: keyof AllComponentProps, value: string, id?: string, isRoot?: boolean) => {
    if (!currentElement) return;
    copyComponents.map((component: ComponentData) => {
      if (isRoot) {
        if (component.id === id) {
          (component as any)[key] = value;
        }
      } else if (component.id === currentElement?.id) {
        component.props[key] = value;
      }
      return component;
    });
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: copyComponents,
    }));
  };
  const updateComponent = useDebounce(originUpdateComponent, 20);
  const addComponent = (component: ComponentData) => {
    if (!component) return;
    const newComponents = [...editor.components, component];
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: newComponents,
    }));
  };
  const selectComponent = (id: string) => {
    setEditor({
      ...editor,
      currentElement: id,
    });
  };
  const setComponentsData = (newComponents: ComponentData[]) => {
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: newComponents,
    }));
  };
  return {
    updateComponent,
    addComponent,
    selectComponent,
    setComponentsData,
  };
};

export default useComponentData;
