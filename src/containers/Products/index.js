import React, {Component} from 'react';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';
import { Table, Icon } from 'antd';
import {getCategoryProducts} from "../../api/products";
import capitalize from 'capitalize';

class Home extends Component{
  state = {
    dataSource: null,
    fetching: true
  };

  componentDidMount(){
    const url_string = window.location.href;
    const url = new URL(url_string);
    const categoryId = url.searchParams.get("categorie");
    getCategoryProducts(categoryId)
      .then((res) => this.setState({dataSource: res.data, fetching: false}))
      .catch((err) => this.setState({fetching: false}));
  }

  columns = [{
    title: 'Produs',
    dataIndex: 'NAME',
    key: 'product',
    render: (productName) => <p>{capitalize(productName)}</p>
  },{
    title: 'Pret',
    dataIndex: 'PRICE',
    key: 'price',
    render: (productPrice) => <p>{`${productPrice.toFixed(2)} LEI`}</p>,
    width: '75%'
  }, {
    title: 'Edit',
    key: 'edit',
    render: () => <a><Icon type="edit" /></a>,
    sorter: false
  }, {
    title: 'Delete',
    key: 'delete',
    render: () => <a><Icon type="delete" /></a>,
    sorter: false
  }];


  render(){
    if(this.state.fetching){
      return null;
    }

    return(
      <LayoutWrapper>
        <PageHeader>Produse</PageHeader>
        <ContentHolder>
          <Table dataSource={this.state.dataSource} columns={this.columns} />
        </ContentHolder>
      </LayoutWrapper>
    )
  }
}

export default Home;