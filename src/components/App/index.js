import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';
import AppRouter from '../AppRouter';

const { Header, Sider, Content } = Layout;


class AppLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {

    return (
      <Layout style={{height: '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo"><span style={{fontSize: '22px', color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>M&M</span></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to='/'>
                <Icon type="home" />
                <span>Acasa</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/facturi'>
                <Icon type="form" />
                <span>Facturi</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <AppRouter />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;