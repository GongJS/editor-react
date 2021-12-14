import { useRecoilState, useRecoilValue } from 'recoil';
import { cloneDeep } from 'lodash-es';
import { PageProps } from '@/defaultProps';
import editorData, { ComponentData, getCurrentElement } from '@/store/editor';
import useDebounce from '@/hooks/useDebounce';

const useComponentData = () => {
  const [editor, setEditor] = useRecoilState(editorData);
  const copyComponents = cloneDeep(editor.components);
  const copyPageData = cloneDeep(editor.pageData);
  const currentElement = useRecoilValue(getCurrentElement);
  const originUpdateComponent = (newValues:{ [p: string]: string}, id?: string, isRoot?: boolean) => {
    if (!currentElement) return;
    copyComponents.map((component: ComponentData) => {
      if (isRoot) {
        if (component.id === id) {
          component = { ...component, ...newValues };
        }
      } else if (component.id === currentElement?.id) {
        component.props = { ...component.props, ...newValues };
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
  const updatePageData = (key: keyof PageProps, value: string) => {
    copyPageData[key] = value;
    setEditor((oldEditor) => ({
      ...oldEditor,
      pageData: copyPageData,
    }));
  };
  return {
    updateComponent,
    addComponent,
    selectComponent,
    setComponentsData,
    updatePageData,
  };
};

export default useComponentData;
