import React, { useEffect } from 'react';
import {
  Routes, Route, Navigate,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import userData from '@/store/user';
import Home from '@/views/home';
import TemplateDetail from '@/views/templateDetail';
import Editor from '@/views/editor';
import Login from '@/views/login';
import { getUserInfo } from '@/utils/user';
import useUser from '@/hooks/useUser';
import 'antd/dist/antd.less';
import 'cropperjs/dist/cropper.css';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValue(userData);
  const location = useLocation();
  if (!user.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

function App() {
  const { setUserData, logout } = useUser();
  const user = useRecoilValue(userData);
  const wrapperRequireAuth = (Component: React.FC) => (
    <RequireAuth>
      <Component />
    </RequireAuth>
  );
  useEffect(() => {
    if (user.token) {
      getUserInfo(user.token).then((res) => {
        if (res.errno === 0) {
          setUserData({
            token: user.token,
            isLogin: true,
            data: {
              ...res.data,
            },
          });
        } else {
          logout(res.message);
        }
      });
    }
  }, []);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={wrapperRequireAuth(Home)} />
          <Route path="/login" element={<Login />} />
          <Route path="/editor/:workId" element={wrapperRequireAuth(Editor)} />
          <Route path="/template/:id" element={wrapperRequireAuth(TemplateDetail)} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
