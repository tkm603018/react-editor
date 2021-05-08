import React from 'react';

import Header from './header/Header'
import Body from './main/splitPane'
import Footer from './footer/Footer'
import NormalContentList from './main/normalContentList'
import ChangeContentStyle from './main/changeContentStyle'

export default () => {

  return (
    <div className="main"
      // style={{ height: '100%' }}
    >
      <Header render={(<ChangeContentStyle></ChangeContentStyle>)}></Header>
      {/* <Footer></Footer> */}
    </div>

  )
}

