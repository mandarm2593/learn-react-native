import React from 'react'
import Game from './Game'

class App extends React.Component {
  state = {
    gameId:1
  }

  gameResetHandler = () => {
    this.setState({
        ...this.state,
        gameId: this.state.gameId + 1
      }
    )
  }

  render() {
    return (
      <Game randomNumberCount={6} key={this.state.gameId} onPlayAgain={this.gameResetHandler}/>
    );

  }
}

export default App;

