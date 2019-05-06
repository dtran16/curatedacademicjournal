import React from "react"

class Temp extends React.Component {
  constructor(props) {
    super(props);
  }

  render(Props) {
        let {value} = this.props
        if(value === undefined){
          console.log('undefined props')
        } else {
          console.log('defined props')
        }
        return (
            <div className="App">
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Smart Contract Example</h2>
            <p>
              If your contracts compiled and migrated successfully, below will show
              a stored value of 5 (by default).
            </p>
            <p>
              Try changing the value stored on <strong>line 40</strong> of App.js.
            </p>
            <div>The stored value is: {value}</div>
          </div>
    )
  }
}

export default Temp;
