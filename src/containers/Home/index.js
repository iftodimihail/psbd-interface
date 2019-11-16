import React, {Component} from 'react';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';
import { Card, Col, Row } from 'antd';
import { Link} from "react-router-dom";
import {getCategories} from "../../api/categories";
import capitalize from "capitalize";

class Home extends Component{
  state = {
    categories: [],
    fetching: true
  };
  componentDidMount(){
    getCategories()
      .then((res) => this.setState({categories: res.data || [], fetching: false}))
      .catch((err) => this.setState({fetching: false}));
  }

  render(){
    if(this.state.fetching){
      return null;
    }
    return(
      <LayoutWrapper>
        <PageHeader>Meniu</PageHeader>
        <ContentHolder>
          <Row gutter={16}>
            {this.state.categories.map((category, index) => {
              if (index < 3) {
                return <Col span={8} key={category.id}>
                  <Link to={`/produse?categorie=${category.id}`}>
                    <Card style={{
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center",
                       height: '100px',
                        margin: '5px',
                        boxShadow: "0 2px 2px 0 rgba(0,0,0, 0.1)",
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "white",
                        background: "rgba(0, 21, 41, 0.9)"
                        }}>{capitalize(category.name)}</Card>
                  </Link>
                </Col>;
              }
            })}
          </Row>
          <Row gutter={16}>
            {this.state.categories.map((category, index) => {
              if (index < 6 && index > 2) {
                return <Col span={8} key={category.id}>
                  <Link to={`/produse?categorie=${category.id}`}>
                    <Card style={{height: '100px', margin: '5px'}}>{capitalize(category.name)}</Card>
                  </Link>
                </Col>;
              }
            })}
          </Row>
          <Row gutter={16}>
            {this.state.categories.map((category, index) => {
              if (index < 9 && index > 5) {
                return <Col span={8} key={category.id}>
                  <Link to={`/produse?categorie=${category.id}`}>
                    <Card style={{height: '100px', margin: '5px'}}>{capitalize(category.name)}</Card>
                  </Link>
                </Col>;
              }
            })}
          </Row>
          <Row gutter={16}>
            {this.state.categories.map((category, index) => {
              if (index < 12 && index > 8) {
                return <Col span={8} key={category.id}>
                  <Link to={`/produse?categorie=${category.id}`}>
                    <Card style={{height: '100px', margin: '5px'}}>{capitalize(category.name)}</Card>
                  </Link>
                </Col>;
              }
            })}
          </Row>
          <Row gutter={16}>
            {this.state.categories.map((category, index) => {
              if (index < 15 && index > 11) {
                return <Col span={8} key={category.id}>
                  <Link to={`/produse?categorie=${category.id}`}>
                    <Card style={{height: '100px', margin: '5px'}}>{capitalize(category.name)}</Card>
                  </Link>
                </Col>;
              }
            })}
          </Row>
        </ContentHolder>
      </LayoutWrapper>
    )
  }
}

export default Home;
