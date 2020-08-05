import React, { Component } from 'react';

class AllenBean extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          <ul
            style={{
              listStyleType: 'none',
              margin: 0,
              overflow: 'hidden',
              backgroundColor: 'blue',
            }}>
            HOME
          </ul>
          <h1
            style={{
              fontColor: 'red',
              fontWeight: 'bold',
              fontFamily: 'arial',
            }}>
            LETS GO
          </h1>
          <p
            style={{
              fontColor: 'green',
              fontWeight: 'bold',
              fontFamily: 'arial',
            }}>
            WE DID FOR SURE NOWWW? LETS GOO
          </p>
          <button
            style={{
              width: '20px',
              height: '40px',
              borderRadius: '5px',
              border: '1px',
              backgroundColor: 'magenta',
              boxShadow: '0px 1px 0px 0px gray',
              fontWeight: 'bold',
              fontFamily: 'arial',
              fontColor: 'green',
              fontStyle: 'italic',
            }}>
            lets go!
          </button>
        </div>
      </div>
    );
  }
}
export default AllenBean;
