import React, {Component} from 'react';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';
import { Card, Col, Row } from 'antd';
import { Link} from "react-router-dom";

class Home extends Component{
  render(){
    return(
      <LayoutWrapper>
        <PageHeader>Meniul principal</PageHeader>
        <ContentHolder>
          <Row gutter={16}>
            <Col span={8}>
              <Link to='/materiale'><Card style={{height: '200px'}}>Materiale de constructii</Card></Link>
            </Col>
            <Col span={8}>
              <Link to='/casa'><Card style={{height: '200px'}}>Casa si gradina</Card></Link>
            </Col>
            <Col span={8}>
              <Link to='/electronice'><Card style={{height: '200px'}}>Electronice si electrocasnice</Card></Link>
            </Col>
          </Row>
        </ContentHolder>
      </LayoutWrapper>
    )
  }
}

export default Home;
