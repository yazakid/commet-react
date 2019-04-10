import React, { Component } from 'react'

export default class Clock extends Component {
  constructor(props){
    super(props)
    this.state = {
        date : new Date()
    }
  }
  componentWillMount(){
      console.log('拉取数据..')
      this.timer = setInterval(()=>{
          this.setState({date: new Date()})
      }, 1000)
  }
  componentWillUnmount(){
      clearInterval(this.timer)
  }
  render() {
    return (
      <div>
        <h1>
            <p>现在时间： {this.state.date.toLocaleTimeString()}</p>
        </h1>
      </div>
    )
  }
}
