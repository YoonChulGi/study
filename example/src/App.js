import React from 'react';
import Counter from './03/Counter3';
class App extends React.Component{
  constructor(props) {
    super(props);
    this.increaseCount = this.increaseCount.bind(this);
    this.state= {
      count: 1,
    };
  }
  
  increaseCount() {
    this.setState(({ count }) =>({
      count: count +1 ,
    }));
  }
  render(){
    
    return(
      <div>
        <Counter />
      </div>
    );
  }
}

export default App;
