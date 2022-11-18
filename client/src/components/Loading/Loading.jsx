import React from 'react';
import './Loading.scss';
export default function Loading({ size, full, ...styleOther }) {
  let style = {};
  if (full) {
    style = {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(238,238,238,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
  }

  return (
    <div className='loading' style={{ ...style, ...styleOther, zIndex: 5 }}>
      <i className={`fa fa-spinner fa-spin fa-${size}x`} style={{}}></i>
    </div>
  );
}
