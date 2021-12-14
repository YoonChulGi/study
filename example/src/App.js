import React from 'react';
import Input from './03/Input'
class App extends React.Component{
  constructor(props) {
    super(props);
    this.myInputFocused = this.myInputFocused.bind(this);
    this.myInputChanged = this.myInputChanged.bind(this);
  }
  myInputFocused(e) {
    console.dir(e.target);
  }
  myInputChanged(e) {
    console.dir(e.target);
  }
  render(){  
    return(
      <div>
        <Input 
          name="myInput" 
          label="이이이인풋!: " 
          value="zzzzz" 
          errorMessage="에러메세지 없음" 
          type="text"
          onFocus={this.myInputFocused}
          onChange={this.myInputChanged}
          autoFocus={true}
        />
      </div>
    );
  }
}

export default App;
