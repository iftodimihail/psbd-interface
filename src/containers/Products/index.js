import React, {Component} from 'react';
import moment from 'moment';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';
import { Table, Icon, Modal, Form, Input, DatePicker, message } from 'antd';
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

  handleAddModal = (id) => this.setState({showModal: true, productId: id, okText: "Adaugă", isAddToStock: true});

  handleSubtractModal = (id) => this.setState({showModal: true, productId: id, okText: "Scade", isAddToStock: false});

  handleCancel = () => this.setState({showModal: false});

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        postBill({
          billDate: values.billDate,
          otherPartyName: values.name,
          billType: this.state.isAddToStock ? "Intrare stoc" : "Iesire stoc",
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
          .catch(() => message.error("Eroare! Stocul nu poate avea mai putin de 0 produse"));
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
      title: 'Adaugă',
      key: 'add',
      dataIndex: 'id',
      render: (id) => <a onClick={() => this.handleAddModal(id)}><Icon type="plus-circle" /></a>,
      sorter: false,
      width: '200px'
    },
    {
      title: 'Scade',
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
          centered
          title={this.state.isAddToStock ? "Adaugare în stoc" : "Scoatere din stoc"}
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
            <Form.Item label="Data de facturare">
              {getFieldDecorator('billDate', {
                rules: [{ required: true, message: 'Te rugăm să introduci data de facturare' }],
                initialValue: moment(new Date())
              })(
                <DatePicker
                  style={{width: '100%'}}
                  format="DD-MM-YYYY HH:mm"
                  placeholder="Data de facutrare"
                  showTime={{format: 'DD-MM-YYYY HH:mm'}}
                />
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