import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Clock from './Clock';

class App extends Component {
  static propTypes = {
    comment: PropTypes.object
  }
  constructor(){
    super();
    this.state ={
      comments: [],
      isShowClock: true
    }
  }
  componentWillMount(){
    this._loadComments();
  }

  hanldeSubClick(comment){
    // this.state.comments.push(comment)
    const comments = [...this.state.comments, comment]
    this.setState({
      comments
    })
    this._saveComments(comments)
  }

  _saveComments(comments){
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  _loadComments(){
      let comments = localStorage.getItem('comments')
      if(comments){
        comments = JSON.parse(comments)
        this.setState({comments})
      }
  }

  handleShowOrHide(){
    this.setState({
      isShowClock : !this.state.isShowClock
    })
  }

  handleDeleteComment(index){
    console.log(index)
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.hanldeSubClick.bind(this)}/>
        <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)}/>
        <div>
          {this.state.isShowClock ? <Clock /> : null }
          <button onClick={this.handleShowOrHide.bind(this)}>
            显示或隐藏时钟
          </button>
        </div>
      </div>
    );
  }
}

export default App;
