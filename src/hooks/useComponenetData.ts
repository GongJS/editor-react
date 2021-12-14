import { useRecoilState, useRecoilValue } from 'recoil';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash-es';
import { PageProps } from '@/defaultProps';
import editorData, { ComponentData, getCurrentElement } from '@/store/editor';
import useDebounce from '@/hooks/useDebounce';

export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right'
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
    component.layerName = `图层${editor.components.length + 1}`;
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
  const copyComponent = () => {
    if (!currentElement) return;
    const copiedComponent = cloneDeep(currentElement);
    setEditor((oldEditor) => ({
      ...oldEditor,
      copiedComponent,
    }));
  };
  const pasteComponent = () => {
    if (editor.copiedComponent.id) {
      const clone = cloneDeep(editor.copiedComponent);
      clone.id = uuidv4();
      clone.layerName += '副本';
      const newComponents = [...editor.components, clone];
      setEditor((oldEditor) => ({
        ...oldEditor,
        components: newComponents,
      }));
      message.success('已黏贴当前图层', 1);
    }
  };
  const deleteComponent = () => {
    if (!currentElement) return;
    const components = editor.components.filter((component) => component.id !== currentElement.id);
    setComponentsData(components);
  };
  const moveComponent = (data: { direction: MoveDirection; amount: number }) => {
    if (!currentElement) return;
    const oldTop = parseInt(currentElement.props.top || '0', 10);
    const oldLeft = parseInt(currentElement.props.left || '0', 10);
    const { direction, amount } = data;
    switch (direction) {
      case 'Up': {
        const newValue = `${oldTop - amount}px`;
        updateComponent({ top: newValue });
        break;
      }
      case 'Down': {
        const newValue = `${oldTop + amount}px`;
        updateComponent({ top: newValue });
        break;
      }
      case 'Left': {
        const newValue = `${oldLeft - amount}px`;
        updateComponent({ left: newValue });
        break;
      }
      case 'Right': {
        const newValue = `${oldLeft + amount}px`;
        updateComponent({ left: newValue });
        break;
      }

      default:
        break;
    }
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
    copyComponent,
    pasteComponent,
    deleteComponent,
    moveComponent,
    updatePageData,
  };
};

export default useComponentData;
