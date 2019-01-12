import React, {Component} from 'react';
import moment from 'moment/moment';
import capitalize from 'capitalize';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';
import { Table, Icon, Modal, Form, Input, message, DatePicker } from 'antd';
import {getBills, findBill, editBill} from "../../api/bills";

class Home extends Component{
  state = {
    dataSource: null,
    fetching: true,
    showModal: false,
    productId: null
  };

  componentDidMount(){
    getBills()
      .then((res) => this.setState({dataSource: res.data, fetching: false}))
      .catch(() => this.setState({fetching: false}));
  }

  handleOpenModal = (id) => {
    const { form } = this.props;
    this.setState({showModal: true, billId: id});
    findBill(id)
      .then((res) => {
        const billData = res.data;
        this.setState({productId: billData.items[0].productId});
        console.log(billData);
        form.setFieldsValue({
          name: billData.otherPartyName,
          product: capitalize(billData.items[0].name),
          billType: capitalize(billData.billType),
          quantity: billData.items[0].quantity,
          date: moment(billData.billDate)
        })
      });
  };

  handleCancel = () => this.setState({showModal: false});

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        editBill(this.state.billId,{
          otherPartyName: values.name,
          billDate: values.date,
          billType: values.billType.toLowerCase(),
          billedItems: [
            {
              id: this.state.billId,
              productId: this.state.productId,
              quantity: parseInt(values.quantity, 10)
            }
          ]
        })
          .then(() =>  {
            this.setState({fetching: true, showModal: false});
            getBills()
              .then((res) => this.setState({dataSource: res.data, fetching: false}))
              .catch(() => this.setState({fetching: false}));
          })
          .catch(() => message.error("Editarea facturii aduce stocul produsului sub 0 sau comenzile deja înregistrate nu vor putea fi onorate"));
      }
    });
  };

  columns = [
    {
      title: 'Data',
      dataIndex: 'billDate',
      key: 'date',
      render: (billDate) => <p>{moment(billDate).format('DD-MM-YYYY HH:mm')}</p>,
      width: '300px'
    },
    {
      title: 'Responsabil',
      dataIndex: 'otherPartyName',
      key: 'otherPartyName',
      render: (otherPartyName) => <p>{otherPartyName}</p>,
      width: '300px'
    },
    {
      title: 'Tip operație',
      dataIndex: 'billType',
      key: 'billType',
      render: (billType) => <p>{capitalize(billType)}</p>,
      width: '300px'
    },
    {
      title: 'Produs',
      dataIndex: 'items',
      key: 'product',
      render: (items) => <p>{capitalize(items[0].name)}</p>,
      width: '300px'
    },
    {
      title: 'Cantitate',
      dataIndex: 'items',
      key: 'quantity',
      render: (items) => <p>{items[0].quantity}</p>,
      width: '300px'
    },
    {
      title: 'Edit',
      key: 'edit',
      dataIndex: 'id',
      render: (id) => <a onClick={() => this.handleOpenModal(id)}><Icon type="edit" /></a>,
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
          title="Actualizare factură"
          visible={this.state.showModal}
          okText="Actualizează"
          cancelText="Anulează"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleOk}>
            <Form.Item label="Nume responsabil">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Te rugăm să-ți introduci numele' }],
              })(
                <Input placeholder="Nume și prenume" />
              )}
            </Form.Item>
            <Form.Item label="Tip factură">
              {getFieldDecorator('billType')(
                <Input disabled />
              )}
            </Form.Item>
            <Form.Item label="Nume produs">
              {getFieldDecorator('product')(
                <Input disabled />
              )}
            </Form.Item>
            <Form.Item label="Cantitate">
              {getFieldDecorator('quantity', {
                rules: [{ required: true, message: 'Te rugăm să introduci o cantitate' }],
              })(
                <Input placeholder="Cantitate" type="number" min={0}/>
              )}
            </Form.Item>
            <Form.Item label="Data facturare">
              {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Te rugăm să introduci data de facutrare' }],
              })(
                <DatePicker
                  style={{width: '100%'}}
                  showTime={{format: "HH:mm"}}
                  format="DD-MM-YYYY HH:mm"
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
        <PageHeader>Facturi</PageHeader>
        <ContentHolder>
          <Table dataSource={this.state.dataSource} columns={this.columns} pagination={{pageSize: 6}}/>
        </ContentHolder>
      </LayoutWrapper>
    )
  }
}

const WrappedForm = Form.create()(Home);
export default WrappedForm;