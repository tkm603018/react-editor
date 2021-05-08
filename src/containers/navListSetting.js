import React from 'react';
import Header from './header/Header'

// import NavListSetting from './navListSetting/Index'

export default () => { 
  
  return (
    <div>
      <Header render={(<Render></Render>)}></Header>
    </div>
  )
}

const Render = () => { 

  return (
    // <NavListSetting></NavListSetting>
    <div>sample</div>
  )
}
