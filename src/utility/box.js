import React from 'react';
import BlockTitle from './blockTitle';

export default props =>
  <div className="isoBoxWrapper" style={props.noPadding ? {padding: 0} : {...props.style}}>
    <BlockTitle title={props.title} subtitle={props.subtitle} />
    {props.children}
  </div>;
