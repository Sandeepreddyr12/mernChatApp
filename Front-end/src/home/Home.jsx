import React, { Component } from 'react';

import Messenger from '../pages/messenger/Messenger';
import Navbar from '../components/navigation/navbar';


const Home = () => {

  return (
    <div>
      <Navbar/>
  <div>
    <Messenger/>
  </div>
  </div>
  )
}

export default  Home; 