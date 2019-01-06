import React, {Component} from 'react';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';
import { Table, Icon, Modal, Form, Input, message } from 'antd';
import {getCategoryProducts} from "../../api/products";
import {postBill} from "../../api/bills";
import capitalize from 'capitalize';

class Home extends Component{
  state = {
    dataSource: null,
    fetching: true,
    showModal: false,
    okText: null,
    isAddToStock: true
  };

  componentDidMount(){
    const url_string = window.location.href;
    const url = new URL(url_string);
    const categoryId = url.searchParams.get("categorie");
    this.setState({categoryId: categoryId});

    getCategoryProducts(categoryId)
      .then((res) => this.setState({dataSource: res.data, fetching: false}))
      .catch(() => this.setState({fetching: false}));
  }

  handleAddModal = (id) => this.setState({showModal: true, productId: id, okText: "Adaugă în stoc", isAddToStock: true});

  handleSubtractModal = (id) => this.setState({showModal: true, productId: id, okText: "Scoate din stoc", isAddToStock: false});

  handleCancel = () => this.setState({showModal: false});

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        postBill({
          billDate: new Date(),
          otherPartyName: values.name,
          billType: this.state.isAddToStock ? "incoming" : "outgoing",
          billedItems: [
            {
              productId: this.state.productId,
              quantity: parseInt(values.quantity, 10)
            }
          ]
        }).then(() => {
          this.setState({fetching: true, showModal: false});
          getCategoryProducts(this.state.categoryId)
            .then((res) => this.setState({dataSource: res.data, fetching: false}))
            .catch(() => this.setState({fetching: false}));
        })
          .catch(() => message.error('S-a produs o eroare. Vă rugăm încercați din nou'))
      }
    });
  };

  columns = [
    {
      title: 'Produs',
      dataIndex: 'name',
      key: 'product',
      render: (productName) => <p>{capitalize(productName)}</p>,
      width: '300px'
    },
    {
      title: 'Stoc',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => <p>{stock}</p>,
      width: '300px'
    },
    {
      title: 'Pret',
      dataIndex: 'price',
      key: 'price',
      render: (productPrice) => <p>{`${productPrice.toFixed(2)} LEI`}</p>,
      width: '50%'
    },
    {
      title: 'Adaugă îm stoc',
      key: 'add',
      dataIndex: 'id',
      render: (id) => <a onClick={() => this.handleAddModal(id)}><Icon type="plus-circle" /></a>,
      sorter: false,
      width: '200px'
    },
    {
      title: 'Scoate din stoc',
      key: 'subtract',
      dataIndex: 'id',
      render: (id) => <a onClick={() => this.handleSubtractModal(id)}><Icon type="minus-circle" /></a>,
      sorter: false,
      width: '200px'
    }
  ];


  render(){
    const { getFieldDecorator } = this.props.form;

    if(this.state.fetching){
      return null;
    }

    return(
      <LayoutWrapper>
        <Modal
          title="Actualizare stoc"
          visible={this.state.showModal}
          okText={this.state.okText}
          cancelText="Anulează"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleOk}>
            <Form.Item label="Nume și prenume">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Te rugăm să-ți introduci numele' }],
              })(
                <Input placeholder="Nume și prenume" />
              )}
            </Form.Item>
            <Form.Item label="Cantitate">
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