import React, { Component } from "react";
import FeedItem from "./FeedItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div
        style={{
          backgroundColor: "#E9ECEF",
          padding: "10px 0px",
          borderRadius: "3px",
        }}
      >
        {posts.map((post) => (
          <FeedItem key={post.id} post={post} />
        ))}
      </div>
    );
  }
}
export default PostFeed;
