import React, { useEffect, useState } from 'react';
import { Layout, Spin, Button } from 'antd';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import userData from '@/store/user';
import TemplateList from '@/components/template-list';
import UserProfile from '@/components/user-profile';
import { useFetchTemplates, useFetchWorks } from '@/utils/works';
import { defaultTemplateData } from '@/defaultData';
import logo from '@/assets/logo-simple.png';
import './style.less';

const { Header, Footer, Content } = Layout;

const Home: React.FC = () => {
  const user = useRecoilValue(userData);
  const [templateListCount, setTemplateListCount] = useState(0);
  const [templateList, setTemplateList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const { data: templateData, isLoading: templateListLoading } = useFetchTemplates({
    pageIndex,
  });
  const { data: worksData, isLoading: workListLoading } = useFetchWorks();
  const loadMorePage = () => {
    setPageIndex(pageIndex + 1);
  };
  useEffect(() => {
    if (templateData?.data?.list.length > 0) {
      setTemplateListCount(templateData?.data?.count);
      setTemplateList((pre) => pre.concat(templateData.data.list));
    }
  }, [templateData?.data?.list]);
  return (
    <div className="homepage-container">
      <Layout style={{ background: '#fff' }}>
        <Header className="header">
          <div className="page-title">
            <Link to="/">
              <img alt="logo" src={logo} className="logo-img" />
            </Link>
            乐高
          </div>
          <UserProfile />
        </Header>
        <Content className="home-layout">
          <div className="content-container">
            <div className="hot-title">
              <h2 className="hot-template">热门海报</h2>
              <p>只需替换文字和图片，一键自动生成H5</p>
            </div>
            {!templateListLoading ? (
              <TemplateList
                list={
                  templateData?.data?.list.length > 0
                    ? templateData?.data?.list
                    : defaultTemplateData
                }
              />
            ) : (
              <Spin />
            )}
            <div>
              {templateList.length < templateListCount && (
                <Button
                  type="primary"
                  size="large"
                  onClick={loadMorePage}
                  disabled={templateListLoading}
                  loading={templateListLoading}
                >
                  加载更多
                </Button>
              )}
            </div>
          </div>
          {user.isLogin && worksData?.data?.list.length > 0 && (
            <div className="my-works">
              <div className="content-title">
                <h2>我的作品</h2>
                <Link to="/mywork">查看我的所有作品</Link>
              </div>
              {!workListLoading ? (
                <TemplateList list={worksData?.data?.list} />
              ) : (
                <Spin />
              )}
            </div>
          )}
        </Content>
        <Footer>JS © Lego</Footer>
      </Layout>
    </div>
  );
};

export default Home;
