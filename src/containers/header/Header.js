import React from 'react';

import Navigation from './Navigation'

export default ({ render }) => {

  return (
    <div className="main">
      <Navigation render={ render }></Navigation>
    </div>

  )
}
