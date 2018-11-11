import React from 'react'
import PropTypes from 'prop-types'
import RandomNumber from './RandomNumber'
import {Text,View, StyleSheet, Button} from 'react-native'
import shuffle from 'lodash.shuffle'

class Game extends React.Component {
  static propTypes ={
    randomNumberCount: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired
  }
  state = {
    clickedNumberIndexes:[],
    gameStatus:'Playing',
    currentCount:0,
    gameCounter:10
  }
  randomNumbers = Array.from({length:this.props.randomNumberCount}).map(()=> Math.floor(10*Math.random()))
  target = this.randomNumbers.slice(0,this.props.randomNumberCount-2).reduce((acc,curr)=>acc+curr,0)
  shuffledNumbers = shuffle(this.randomNumbers)

  componentDidMount(){

    this.gameCounterId = setInterval(()=>{
      this.setState((prevState)=>{
        return {...prevState, gameCounter: prevState.gameCounter - 1 }
      },() => {
        if(this.state.gameCounter === 0){
          clearInterval(this.gameCounterId)
          this.setState({
            ...this.state,
            gameStatus:'Lost'
          })
        }
    })
    },1000)
  }

  componentWillUpdate(nextProps,nextState){

    if(nextState.gameStatus !== 'Playing'){
      clearInterval(this.gameCounterId)
    }
  }

  numberClickHandler = (numberIndex) => {
    let newCount = this.state.currentCount + this.shuffledNumbers[numberIndex]

    let updatedGameStatus = newCount > this.target ? 'Lost' : newCount === this.target ? 'Won' : 'Playing'

      this.setState({...this.state, clickedNumberIndexes: [...this.state.clickedNumberIndexes, numberIndex], currentCount:newCount, gameStatus:updatedGameStatus})
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.target,styles[this.state.gameStatus]]}>{this.target}</Text>
        <View style={[styles.randomContainer, this.state.gameStatus !== 'Playing' && styles.noDisplay ]}>
          {
            this.shuffledNumbers.map((number, index)=>{
              return <RandomNumber disableAll={this.state.currentCount >= this.target} number={number} numberIndex={index}
                                   key={index} onPress={this.numberClickHandler}
                                   clickedNumberIndexes={this.state.clickedNumberIndexes}/>
            })
          }
        </View>
        {this.state.gameStatus!=='Playing' &&
        <View style={styles.playAgain}>
          <Button
            title="Play Again"
            color="blue"
            onPress={this.props.onPlayAgain}
          />
        </View>
         }
        <Text style={styles.gameCounter}>{this.state.gameCounter}</Text>
        <Text style={styles.gameStatusText}>{this.state.gameStatus}</Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#ddd',
    flex: 1
  },
  randomContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
  },
  target:{
    fontSize:40,
    marginHorizontal:50,
    marginVertical:50,
    textAlign:'center'
  },
  Won:{
    backgroundColor:'green',
    color:'white'
  },
  Lost:{
    backgroundColor:'red',
    color:'white'
  },
  Playing:{
    backgroundColor:'gray'
  },
  gameStatusText:{
    fontSize:40,
    height:50,
    textAlign:'center',
    margin:50
  },
  gameCounter:{
    fontSize:70,
    textAlign:'center'
  },
  noDisplay:{
    display:'none'
  },
  playAgain:{
    margin:100
  }
})

export default Game;

