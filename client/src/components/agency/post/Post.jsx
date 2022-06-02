import React, { Component } from "react";
import "./Post.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../../actions/postActions";
import { withRouter, Link } from "react-router-dom";
import {
  MDBContainer,
  MDBCardHeader,
  MDBIcon,
  MDBMedia,
  MDBCardFooter,
  MDBBadge,
  MDBInput,
} from "mdbreact";
import { deletePost, likePostByID } from "../../../actions/postActions";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  onLikeClick = (id) => {
    this.props.likePostByID(id);
  };
  onDelete = (id) => {
    this.props.deletePost(id);
    window.location = "/agency/myfeed";
  };
  render() {
    const { post, auth } = this.props;

    return (
      <div style={{marginTop:"120px"}}>
        <MDBContainer className="getPost-container">
          <MDBCardHeader className="border-0  rounded d-flex justify-content-between">
            <div className="border-0 d-flex justify-content-start">
              <MDBMedia>
                <img
                  className="card-img-100 rounded-circle d-flex z-depth-1 mr-3"
                  src={post.post.avatar}
                  alt=""
                />
              </MDBMedia>
              <div className="d-flex flex-column">
                <h5 className="font-weight-bold text-default mt-0 mb-0 pd-0">
                  {post.post.name}
                </h5>
                <small className="mt-0 pt-0 grey-text">{post.post.email}</small>
                <ul className="list-unstyled list-inline mt-3 pt-1 ">
                  <li className="list-inline-item">
                    <MDBIcon
                      fab
                      className="grey-text"
                      size="lg"
                      icon="facebook"
                    />
                  </li>
                  <li className="list-inline-item">
                    <MDBIcon
                      fab
                      className="grey-text"
                      size="lg"
                      icon="twitter"
                    />
                  </li>
                  <li className="list-inline-item">
                    <MDBIcon
                      fab
                      className="grey-text"
                      size="lg"
                      icon="google-plus"
                    />
                  </li>
                  <li className="list-inline-item">
                    <MDBIcon
                      fab
                      className="grey-text"
                      size="lg"
                      icon="linkedin"
                    />
                  </li>
                  <li className="list-inline-item">
                    <MDBIcon
                      fab
                      className="grey-text"
                      size="lg"
                      icon="instagram"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-between align-items-end">
              <div className="mt-0 pt-0 grey-text">{post.post.date}</div>
              <div className="mt-0 pt-0 grey-text">
                {post.post.agency === auth.agency.id ? (
                  <Link
                    className="red-text"
                    onClick={() => this.onDelete(post.post._id)}
                  >
                    delete
                  </Link>
                ) : null}
              </div>
            </div>
          </MDBCardHeader>
          <MDBMedia className="bg-white m-3">
            <MDBMedia body>
              <div className="feed-get-text1 ">{post.post.text}</div>
            </MDBMedia>
          </MDBMedia>
          <div
            data-test="card-footer"
            className="card-footer  border-0 d-flex flex-column justify-content-around pl-5 pr-5 rounded"
          >
            <div className="d-flex justify-content-around ">
              <div className="d-flex">
                <Link onClick={() => this.onLikeClick(post.post._id)}>
                  {post.post.likes ? (
                    post.post.likes.filter(
                      (like) => like.agency === auth.agency.id
                    ).length > 0 ? (
                      <>
                        {" "}
                        <span className="light-blue-text">Like</span>{" "}
                        <MDBIcon
                          far
                          className="light-blue-text"
                          icon="thumbs-up"
                          size="lg"
                        />
                      </>
                    ) : (
                      <>
                        {" "}
                        <span className="grey-text">Like</span>{" "}
                        <MDBIcon
                          far
                          className="grey-text"
                          icon="thumbs-up"
                          size="lg"
                        />{" "}
                      </>
                    )
                  ) : null}
                  <MDBBadge color="default" className="feed-badge1  ">
                    {post.post.likes ? post.post.likes.length : null}
                  </MDBBadge>
                </Link>
              </div>
              <div>
                <Link>
                  <span className="grey-text">Comments</span> &nbsp;
                  <MDBIcon
                    far
                    className="grey-text"
                    icon="comment-alt"
                    size="lg"
                  />
                  <MDBBadge
                    color="default"
                    className="feed-badge1"
                    style={{ marginLeft: "2px" }}
                  >
                    {post.post.comments ? post.post.comments.length : null}
                  </MDBBadge>
                </Link>
              </div>
            </div>
            <CommentForm postId={post.post._id} />
          </div>
        </MDBContainer>
        {post.post.comments ? (
          <CommentList comments={post.post.comments} postId={post.post._id} />
        ) : null}
      </div>
    );
  }
}
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});
export default connect(mapStateToProps, { getPost, deletePost, likePostByID })(
  withRouter(Post)
);
