import React from 'react';
import {
  Row, Col, Card, Button,
} from 'antd';
import './style.less';

const { Meta } = Card;

interface TemplateType {
  coverImg?: string
  title: string
  id: number
}
interface TemplateListType {
  list: TemplateType[]
}
const TemplateList: React.FC<TemplateListType> = ({ list }) => (
  <div className="template-list-component">
    <Row gutter={16}>
      {
          list.map((item) => (
            <Col span={6} key={item.id} className="poster-item">
              <Card hoverable>
                <div className="img-wrapper">
                  {
                    item.coverImg ? <img src={item.coverImg} alt="" /> : <img src="http://typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/5f81cca3f3bf7a0e1ebaf885.png" alt="" />
                  }
                  <div className="hover-item">
                    <Button size="large" type="primary">使用该模版创建</Button>
                  </div>
                </div>
                <Meta
                  title={item.title}
                  description={(
                    <div className="description-detail">
                      <span>作者：Test</span>
                      <span className="user-number">0</span>
                    </div>
                )}
                />
              </Card>
            </Col>
          ))
        }
    </Row>
  </div>
);

export default TemplateList;
