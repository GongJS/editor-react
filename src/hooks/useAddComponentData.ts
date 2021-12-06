import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import editorData, { ComponentData } from '@/store/editor';

export const useAddComponentData = () => {
  const [editor, setEditor] = useRecoilState(editorData);
  const addComponentData = useCallback((component: ComponentData) => {
    const newComponents = [...editor.components, component];
    setEditor((oldEditor) => ({
      ...oldEditor,
      components: newComponents,
    }));
  }, [editor.components]);
  return {
    addComponentData,
  };
};

export default useAddComponentData;
