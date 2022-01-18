import React from 'react';
import { Layout, Spin, Button, Pagination } from 'antd';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import userData from '@/store/user';
import TemplateList from '@/components/template-list';
import WorkList from '@/components/work-list';
import UserProfile from '@/components/user-profile';
import { useFetchTemplates, useFetchWorks } from '@/request/works';
import logo from '@/assets/logo-simple.png';
import './style.less';

const { Header, Footer, Content } = Layout;

const Home: React.FC = () => {
  const user = useRecoilValue(userData);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize] = React.useState(4);
  const {
    data: templateData,
    isLoading: templateDataLoading,
    fetchNextPage,
    hasNextPage,
  } = useFetchTemplates();
  const { data: worksData, isLoading: workDataLoading } = useFetchWorks({
    pageIndex,
    pageSize,
  });

  const onChange = (page: number) => {
    setPageIndex(page - 1);
  };

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
            {!templateDataLoading ? (
              <TemplateList
                list={templateData?.pages.map((page) => page.list).flat() || []}
              />
            ) : (
              <Spin />
            )}
            <div>
              {hasNextPage && (
                <Button type="primary" size="large" onClick={() => fetchNextPage()}>
                  加载更多
                </Button>
              )}
            </div>
          </div>
          {user.isLogin && worksData?.list?.length > 0 && (
            <div className="my-works">
              <div className="content-title">
                <h2>我的作品</h2>
                {/* <Link to="/mywork">查看我的所有作品</Link> */}
              </div>
              {!workDataLoading ? (
                <>
                  <WorkList list={worksData.list} />
                  <Pagination
                    onChange={onChange}
                    total={worksData.count}
                    pageSize={pageSize}
                  />
                </>
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
