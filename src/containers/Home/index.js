import React, {Component} from 'react';
import LayoutWrapper from '../../utility/layoutWrapper';
import PageHeader from '../../utility/pageHeader';
import ContentHolder from '../../utility/contentHolder';

class Home extends Component{
  render(){
    return(
      <LayoutWrapper>
        <PageHeader>Dashboard</PageHeader>
        <ContentHolder>

        </ContentHolder>
      </LayoutWrapper>
    )
  }
}

export default Home;
