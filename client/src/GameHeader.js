import React, {Component} from 'react';
import './sheets/GameHeader.css';

class GameHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playerColor = "",
      cityCount = 0,
      goldCount = 0,
      foodCount = 0,
      woodCount = 0,
      horsesCount = 0,
      ironCount = 0,
      coalCount = 0,
      rubberCount = 0,
      oilCount = 0,
      silkCount = 0,
      spicesCount = 0,
      incenseCount = 0,
      wineCount = 0,
      gemsCount = 0      
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    //get player info
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <button id="logout_button" onClick={(e) => this.handleLogout(e)}>Logout</button>
      </div>
    )
  }
}

export default GameHeader;
