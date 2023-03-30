import React,{Component} from 'react';
import RouterView from './router/RouterView'
import "./App.css"
import RouterBeforeEach from './router/RouterBeforeEach';
function App() {

  return (
    <div className='app'>
      <RouterView />
      <RouterBeforeEach />
    </div>
  );
}

export default App;