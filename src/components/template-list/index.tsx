import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useFetchCopyWork } from '@/utils/works';
import { TemplateDataProps } from '@/store/editor';
import useWork from '@/hooks/useWork';
import './style.less';

const { Meta } = Card;

interface TemplateListType {
  list: TemplateDataProps[];
}
const TemplateList: React.FC<TemplateListType> = ({ list }) => {
  const navigate = useNavigate();
  const { mutateAsync: fetchCopyWork } = useFetchCopyWork();
  const { copyWork } = useWork();
  const handleCreateWork = async (workId: number) => {
    const res = await fetchCopyWork(workId.toString());
    if (res.errno === 0) {
      copyWork();
      navigate(`/editor/${res.data.id}`);
    }
  };
  return (
    <div className="template-list-component">
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
                    <span>
                      {' '}
                      作者：
                      {item.author}
                    </span>
                    <span className="user-number">{item.copiedCount}</span>
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

export default TemplateList;
