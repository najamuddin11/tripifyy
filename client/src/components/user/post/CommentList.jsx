import React, { Component } from "react";
import PropTypes from "prop-types";
import PostComment from "./PostComment";

class CommentList extends Component {
  render() {
    const { comments, postId } = this.props;
    return (
      <div>
        {comments.map((comment) => (
          <PostComment key={comment._id} comment={comment} postId={postId} />
        ))}
      </div>
    );
  }
}
CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};
export default CommentList;
