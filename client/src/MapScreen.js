import React, {Component} from 'react';
import './sheets/MapScreen.css';

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameMap:[[]]
    }
  }

  componentDidMount() {
    fetch(this.props.hosturl + '/newMap', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({width: 15, height: 15})
    }).then(response => {
      if (response.status > 400) {
        response.text().then((responseText) => {
          alert(responseText);
        })
      }
      else {
        response.json().then((responseJson) => {
          console.log(responseJson);
          this.setState({gameMap: responseJson.body.gameMap});
        });
      }
    }).catch(error => {
      console.log("ERROR: " + error);
      alert("An error occurred. Please contact the admin(s) if this persists");
    });
  }

  createCells(row) {
    return row.map((element, j) => {
      return (
        <td key={j} class="MapScreen_tableData">
          {element.type} <br/> {element.resource}
        </td>
      );
    });
  }

  createRows() {
    const rows = this.state.gameMap.map((item, i) => {
      return (
        <tr key={i} class="MapScreen_tableRow">
          {this.createCells(item)}
        </tr>
      );
    });
    return (
      <div>
        { rows }
      </div>
    );
  }

  render() {
    return (
      <table class="MapScreen_table">
        <tbody class="MapScreen_tableBody">
          {this.createRows()}
        </tbody>
      </table>
    );
  }
}


export default MapScreen;
