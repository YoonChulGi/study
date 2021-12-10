import React from 'react';
import ChildProperty from './03/ChildProperty';

class App extends React.Component{
  render(){
    
    return(
      <div>
        <ChildProperty>
          <div><span>child node</span></div>
        </ChildProperty>
      </div>
    );
  }
}

export default App;
