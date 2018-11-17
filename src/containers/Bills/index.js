import React, {Component} from 'react';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';
import { Table, Icon } from 'antd';

const dataSource = [{
  key: '1',
  produs: 'Caramizi',
  cantitate: '10 kg',
  pret: '20 LEI',
  casier: 'Mihai Iftodi',
  client: 'Dobreanu Mircea',
  data: '10-11-2018'
}, {
  key: '2',
  produs: 'Ciment',
  cantitate: '20 kg',
  pret: '30 LEI',
  casier: 'Mihai Iftodi',
  client: 'Dobreanu Mircea',
  data: '10-11-2018'
}];

const columns = [{
  title: 'Produs',
  dataIndex: 'produs',
  key: 'produs',
}, {
  title: 'Cantitate',
  dataIndex: 'cantitate',
  key: 'cantitate',
}, {
  title: 'Pret',
  dataIndex: 'pret',
  key: 'pret',
}, {
  title: 'Casier',
  dataIndex: 'casier',
  key: 'casier',
}, {
  title: 'Client',
  dataIndex: 'client',
  key: 'client',
}, {
  title: 'Data',
  dataIndex: 'data',
  key: 'data',
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


class Home extends Component{
  render(){
    return(
      <LayoutWrapper>
        <PageHeader>Facturi</PageHeader>
        <ContentHolder>
          <Table columns={columns} dataSource={dataSource} />
        </ContentHolder>
      </LayoutWrapper>
    )
  }
}

export default Home;
