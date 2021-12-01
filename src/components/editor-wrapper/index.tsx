import React, { ReactNode } from 'react';
import {
  useRecoilState,
} from 'recoil';
import editorData, { EditorProps } from '@/store/editor';
import './style.less';

interface EditorWrapperProps {
  id: string
  active: boolean
  children: ReactNode
}
const EditorWrapper: React.FC<EditorWrapperProps> = ({ id, active, children }) => {
  const [editor, setEditor] = useRecoilState<EditorProps>(editorData);
  const onItemClick = () => {
    setEditor({
      ...editor,
      currentElement: id,
    });
  };
  return (
    <div onClick={onItemClick} className={active ? 'editor-wrapper active' : 'editor-wrapper'}>
      { children }
    </div>
  );
};

export default EditorWrapper;
