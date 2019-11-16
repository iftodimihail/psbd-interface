import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';
import AppRouter from '../AppRouter';

const { Header, Sider, Content } = Layout;


class AppLayout extends Component {
  state = {
    collapsed: false
  };

  selectActiveKey = () => {
    const url = window.location.pathname;
    const key = url.split('/')[1];
    key === 'facturi' ? this.setState({activeKey: '2'}) :  this.setState({activeKey: '1'});
  };

  componentDidMount(){
   this.selectActiveKey();
  }

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
          collapsed={true}
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline" selectedKeys={[this.state.activeKey]} onSelect={this.selectActiveKey}>
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
          <Header style={{ background: '#fff', paddingRight: 24, fontSize: 24, color: "#111" }}>Proiect PSBD</Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <AppRouter />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;