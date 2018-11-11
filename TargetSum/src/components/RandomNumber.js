import React from 'react'
import propTypes from 'prop-types'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'


class RandomNumber extends React.Component {
  static propTypes ={
    number : propTypes.number.isRequired,
    onPress: propTypes.func.isRequired,
    clickedNumberIndexes: propTypes.array.isRequired,
    numberIndex: propTypes.number.isRequired,
    disableAll: propTypes.bool.isRequired
  }


  render() {
    const buttonStyles = [styles.random]

    if(this.props.clickedNumberIndexes.includes(this.props.numberIndex) > 0 || this.props.disableAll) {
      buttonStyles.push(styles.disabled)
    }
        return(
          <TouchableOpacity onPress={()=>this.props.onPress(this.props.numberIndex)}
                            disabled={this.props.clickedNumberIndexes.includes(this.props.numberIndex) > 0 || this.props.disableAll}>
            <Text style={buttonStyles}>{this.props.number}</Text>
          </TouchableOpacity>
        )
  }
}

const styles = StyleSheet.create({
  random:{
    width:100,
    fontSize:40,
    backgroundColor:'#999',
    margin:30,
    textAlign:'center'
  },
  disabled:{
    opacity:0.1
  }
})

export default RandomNumber;

