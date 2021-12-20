import { useRecoilState, useRecoilValue } from 'recoil';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash-es';
import { useEffect, useState } from 'react';
import editorData, { ComponentDataProps, getCurrentElement, historyComponentsData } from '@/store/editor';
import useDebounce from '@/hooks/useDebounce';

export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right'
const useComponentData = () => {
  const [editor, setEditor] = useRecoilState(editorData);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [historyComponents, setHistoryComponents] = useRecoilState(historyComponentsData);
  const copyComponents = cloneDeep(editor.components);
  const copyPageData = cloneDeep(editor.page);
  const currentElement = useRecoilValue(getCurrentElement);
  useEffect(() => {
    if (historyComponents.past.length > 0) {
      setCanUndo(true);
    } else {
      setCanUndo(false);
    }
    if (historyComponents.future.length > 0) {
      setCanRedo(true);
    } else {
      setCanRedo(false);
    }
  }, [historyComponents.past, historyComponents.future]);

  const setComponentsData = (newComponents: ComponentDataProps[]) => {
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: newComponents,
    }));
  };

  const originUpdateComponent = (newValues:{ [p: string]: string}, id?: string, isRoot?: boolean) => {
    if (!currentElement) return;
    copyComponents.map((component: ComponentDataProps) => {
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
    if (!isRoot) {
      setHistoryComponents((old) => ({
        past: [...old.past, old.present],
        present: copyComponents,
        future: [],
      }));
    }
  };

  const updateComponent = useDebounce(originUpdateComponent, 1);

  const addComponent = (component: ComponentDataProps) => {
    if (!component) return;
    component.layerName = `图层${editor.components.length + 1}`;
    const newComponents = [...editor.components, component];
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: newComponents,
    }));
    setHistoryComponents((old) => ({
      past: [...old.past, old.present],
      present: newComponents,
      future: [],
    }));
  };

  const undoComponent = () => {
    if (historyComponents.past.length === 0) return;
    const previous = historyComponents.past[historyComponents.past.length - 1];
    const newPast = historyComponents.past.slice(0, historyComponents.past.length - 1);
    setHistoryComponents({
      past: newPast,
      present: previous,
      future: [historyComponents.present, ...historyComponents.future],
    });
    setComponentsData(previous);
  };

  const redoComponent = () => {
    if (historyComponents.future.length === 0) return;
    const next = historyComponents.future[0];
    const newFuture = historyComponents.future.slice(1);
    setHistoryComponents((old) => ({
      past: [...old.past, old.present],
      present: next,
      future: newFuture,
    }));
    setComponentsData(next);
  };

  const selectComponent = (id: string) => {
    setEditor({
      ...editor,
      currentElement: id,
    });
  };
  const cancelComponent = () => {
    setEditor({
      ...editor,
      currentElement: '',
    });
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

  const updatePageData = (key: string, value: string) => {
    copyPageData.props[key] = value;
    setEditor((oldEditor) => ({
      ...oldEditor,
      page: {
        ...copyPageData,
        props: {
          ...copyPageData.props,
        },
      },
    }));
  };
  return {
    updateComponent,
    addComponent,
    selectComponent,
    cancelComponent,
    setComponentsData,
    copyComponent,
    pasteComponent,
    deleteComponent,
    moveComponent,
    updatePageData,
    undoComponent,
    redoComponent,
    canRedo,
    canUndo,
  };
};

export default useComponentData;
