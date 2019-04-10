import React, { Component } from 'react';
import PropTypes from 'prop-types'
class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor(){
    super();
    this.state = {
      username:'',
      content:'',
      createdTime:''
    }
  }
  componentWillMount(){
    this._loadUserName()
  }

  componentDidMount(){
    this.textarea.focus()
  }

  handleInputClick(e){
    this.setState({
      username: e.target.value
    })
  }

  _saveUserName(username){
    localStorage.setItem('username', username)
  }

  _loadUserName(){
    const username = localStorage.getItem('username')
    if(username){
      this.setState({ username })
    }
  }

  handleUserNameBlur(e){
    this._saveUserName(e.target.value)
  }

  handleTextClick = (e)=>{
    this.setState({
      content: e.target.value
    })
  }

  handleBtnClick = (e)=>{
    if(this.props.onSubmit){
      const {username, content} = this.state;
      this.props.onSubmit({username, content, createdTime: +new Date()});
    }else{
      alert('无效信息')
    }
    this.setState({
      // username:'',
      content: ''
      })
  }

  render() {
    const {username, content} = this.state;
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input onBlur={this.handleUserNameBlur.bind(this)} value={username} onChange={this.handleInputClick.bind(this)}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea ref={(textarea)=>this.textarea = textarea} value={content} onChange={this.handleTextClick.bind(this)}/>
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleBtnClick.bind(this)}>
            发布
          </button>
        </div>
      </div>
    );
  }
}

export default CommentInput;
