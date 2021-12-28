import React from 'react';
import { Row, Col, Card, Button, Divider, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useFetchCopyWork, useFetchDeleteWork } from '@/utils/works';
import { TemplateDataProps } from '@/store/editor';
import './style.less';

const { Meta } = Card;

interface TemplateListType {
  list: TemplateDataProps[];
}
const WorkList: React.FC<TemplateListType> = ({ list }) => {
  const navigate = useNavigate();
  const { mutateAsync: fetchCopyWork } = useFetchCopyWork();
  const { mutateAsync: fetchDeleteWork } = useFetchDeleteWork();
  const handleCreateWork = async (workId: number) => {
    const res = await fetchCopyWork(workId);
    navigate(`/editor/${res.id}`);
  };
  const handleEditWork = (id: number) => {
    navigate(`/editor/${id}`);
  };
  const handleDeleteWork = (id: number) => {
    Modal.confirm({
      title: '确定要删除该作品吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        await fetchDeleteWork(id);
      },
    });
  };
  return (
    <div className="work-list-component">
      <Row gutter={16}>
        {list.map((item) => (
          <Col span={6} key={item.id} className="poster-item">
            <Card hoverable>
              <div className="img-wrapper">
                {item.coverImg ? (
                  <img src={item.coverImg} alt="" />
                ) : (
                  <img
                    src="http://typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/5f81cca3f3bf7a0e1ebaf885.png"
                    alt=""
                  />
                )}
                <div className="hover-item" onClick={() => handleCreateWork(item.id)}>
                  <Button size="large" type="primary">
                    使用该模版创建
                  </Button>
                </div>
              </div>
              <Meta
                title={item.title}
                description={
                  <div className="description-detail">
                    <span onClick={() => handleEditWork(item.id)}>
                      编辑
                      <EditOutlined />
                    </span>
                    <Divider type="vertical" />
                    <span onClick={() => handleDeleteWork(item.id)}>
                      删除
                      <DeleteOutlined />
                    </span>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WorkList;
