import { useRecoilState, useRecoilValue } from 'recoil';
import { AllComponentProps } from '@/defaultProps';
import editorData, { ComponentData, getCurrentElement } from '@/store/editor';

const useComponentData = () => {
  const [editor, setEditor] = useRecoilState(editorData);
  const copyComponents = JSON.parse(JSON.stringify(editor.components));
  let currentElement = useRecoilValue(getCurrentElement);
  const updateComponent = (key: keyof AllComponentProps, value: string, id?: string, isRoot?: boolean) => {
    if (!currentElement) return;
    currentElement = JSON.parse(JSON.stringify(currentElement));
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
