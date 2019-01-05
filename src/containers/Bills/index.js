import React, {Component} from 'react';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';
import { Table, Icon, Modal, Form, Input, message } from 'antd';
import {getBills} from "../../api/bills";

class Home extends Component{
  state = {
    dataSource: null,
    fetching: true,
    showModal: false
  };

  componentDidMount(){
    getBills()
      .then((res) => this.setState({dataSource: res.data, fetching: false}))
      .catch(() => this.setState({fetching: false}));
  }

  handleOpenModal = (id) => this.setState({showModal: true, productId: id});

  handleCancel = () => this.setState({showModal: false});

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

      }
    });
  };

  columns = [{
    title: 'Data',
    dataIndex: 'billDate',
    key: 'date',
    render: (billDate) => <p>{billDate}</p>,
    width: '300px'
  },{
    title: 'Responsabil',
    dataIndex: 'otherPartyName',
    key: 'otherPartyName',
    render: (otherPartyName) => <p>{otherPartyName}</p>,
    width: '300px'
  }, {
    title: 'Edit',
    key: 'edit',
    render: () => <a><Icon type="edit" /></a>,
    sorter: false,
    width: '200px'
  }, {
    title: 'Delete',
    key: 'delete',
    render: () => <a><Icon type="delete" /></a>,
    sorter: false,
    width: '200px'
  }];


  render(){
    const { getFieldDecorator, form } = this.props.form;

    console.log(this.state);
    if(this.state.fetching){
      return null;
    }

    return(
      <LayoutWrapper>
        <Modal
          title="Adaugă în stoc"
          visible={this.state.showModal}
          onOk={this.handleOk}
          okText="Adaugă"
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleOk}>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Te rugăm să-ți introduci numele' }],
              })(
                <Input placeholder="Nume și prenume" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('quantity', {
                rules: [{ required: true, message: 'Te rugăm să introduci o cantitate' }],
              })(
                <Input placeholder="Cantitate" type="number" min={0}/>
              )}
            </Form.Item>
          </Form>
        </Modal>
        <PageHeader>Produse</PageHeader>
        <ContentHolder>
          <Table dataSource={this.state.dataSource} columns={this.columns} />
        </ContentHolder>
      </LayoutWrapper>
    )
  }
}

const WrappedForm = Form.create()(Home);
export default WrappedForm;