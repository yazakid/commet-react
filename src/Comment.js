import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }
  constructor(props){
    super(props)
    this.state = {
      timeString : ''
    }
  }

  componentWillMount(){
    this._updateTimeString()
    this._timer = setInterval(
      //此处不能用（）=>{}
      this._updateTimeString.bind(this)
    ,5000)
  }

  componentWillUnmount(){
    clearInterval(this._timer)
  }

  _updateTimeString(){
    const comment = this.props.comment
    const duration = (+new Date() - comment.createdTime)/1000
    this.setState({
      timeString : duration > 60 ? `${Math.round(duration/60)}分钟前`: `${Math.round(Math.max(duration, 1))}秒前`  
    })
  }

  _getProcessedContent(content){
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  handleDeleteComment(){
    const {onDeleteComment, index} = this.props
    if(onDeleteComment){
      onDeleteComment(index)
    }
  }

  render () {
    const {comment} = this.props;
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username} </span>：
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span onClick={this.handleDeleteComment.bind(this)} className='comment-delete'>
          删除
        </span>
      </div>
    )
  }
}


export default Comment;