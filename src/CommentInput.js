import React, { Component } from 'react';

class CommentInput extends Component {
  constructor(){
    super();
    this.state = {
      username:'',
      content:''
    }
  }

  handleInputClick(e){
    this.setState({
      username: e.target.value
    })
  }

  handleTextClick = (e)=>{
    this.setState({
      content: e.target.value
    })
  }

  handleBtnClick = (e)=>{
    if (!e) return
    if (!e.username) return alert('请输入用户名')
    if (!e.content) return alert('请输入评论内容')
    if(this.props.onSubmit){
      const {username, content} = this.state;
      this.props.onSubmit({username, content});
    }else{
      this.setState({
        username:'',
        content: ''
      })
    }
  }

  render() {
    const {username, content} = this.state;
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={username} onChange={this.handleInputClick.bind(this)}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={content} onChange={this.handleTextClick.bind(this)}/>
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
