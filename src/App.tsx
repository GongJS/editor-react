import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/views/home';
import TemplateDetail from '@/views/templateDetail';
import Editor from '@/views/editor';
import Login from '@/views/login';
import 'antd/dist/antd.less';
import 'cropperjs/dist/cropper.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/template/:id" element={<TemplateDetail />} />
      </Routes>
    </div>
  );
}

export default App;
