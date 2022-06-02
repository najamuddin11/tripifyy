import React, { Component } from "react";
import {
  MDBContainer,
  MDBCardHeader,
  MDBIcon,
  MDBMedia,
  MDBBadge,
  MDBCardFooter,
} from "mdbreact";
import "./FeedItem.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { deletePost, likePost } from "../../../actions/postActions";

class FeedItem extends Component {
  onDelete = (id) => {
    this.props.deletePost(id);
  };
  onLikeClick = (id) => {
    this.props.likePost(id);
  };
  render() {
    const { post, auth } = this.props;
    const MAX_LENGTH = 70;
    return (
      <div>
        <MDBContainer className="feed-item-container">
          <MDBMedia className="p-4 bg-white " style={{ borderRadius: "10px" }}>
            <MDBMedia>
              <img
                className="card-img-100 rounded-circle d-flex z-depth-1 mr-3"
                src={post.avatar}
                alt=""
              />
            </MDBMedia>
            <MDBMedia body>
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column justify-content-start">
                    <span
                      className="font-weight-bold text-default mt-0"
                      style={{ fontSize: "20px" }}
                    >
                      {post.name}
                    </span>
                    <span
                      className="font-weight-light "
                      style={{ fontSize: "12px" }}
                    >
                      {new Date(post.date).toLocaleString()}
                    </span>
                  </div>
                  <Link to={`post/${post._id}`}>View</Link>
                </div>
                {/* <div className="font-weight-bold  mt-0">
              {post.title}
            </div> */}

                <div className="feed-get-text">
                  {post.text.length < MAX_LENGTH ? (
                    post.text
                  ) : (
                    <>
                      {post.text.substring(0, MAX_LENGTH)}...{" "}
                      <Link to={`post/${post._id}`}>read more</Link>
                    </>
                  )}
                </div>
                <ul className="list-unstyled list-inline mb-2 pt-1">
                  <li className="list-inline-item">
                    <Link onClick={() => this.onLikeClick(post._id)}>
                      {post.likes.filter((like) => like.user === auth.user.id)
                        .length > 0 ? (
                        <MDBIcon
                          far
                          className="light-blue-text"
                          icon="thumbs-up"
                          size="lg"
                        />
                      ) : (
                        <MDBIcon
                          far
                          className="grey-text"
                          icon="thumbs-up"
                          size="lg"
                        />
                      )}
                      <MDBBadge color="default" className="feed-badge">
                        {post.likes.length}
                      </MDBBadge>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to={`post/${post._id}`}>
                      <MDBIcon
                        far
                        className="grey-text"
                        icon="comment-alt"
                        size="lg"
                      />
                      <MDBBadge
                        color="default"
                        className="feed-badge"
                        style={{ marginLeft: "2px" }}
                      >
                        {post.comments.length}
                      </MDBBadge>
                    </Link>
                  </li>

                  {post.user === auth.user.id ? (
                    <li style={{ float: "right" }}>
                      <Link
                        className="red-text"
                        onClick={() => this.onDelete(post._id)}
                      >
                        delete
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </MDBMedia>
          </MDBMedia>
        </MDBContainer>
      </div>
    );
  }
}

FeedItem.propTypes = {
  likePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, likePost })(FeedItem);
