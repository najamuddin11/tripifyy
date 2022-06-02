import React, { Component } from "react";
import {
  MDBContainer,
  MDBCardHeader,
  MDBIcon,
  MDBMedia,
  MDBBtn,
  MDBPageItem,
  MDBPagination,
  MDBPageNav,
} from "mdbreact";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/postActions";

class PostComment extends Component {
  onDelete = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const { comment, postId, auth, post } = this.props;
    return (
      <div>
        <MDBContainer>
          <MDBMedia className="d-block d-md-flex mt-4">
            <img
              className="card-img-64 d-flex mx-auto mb-3 rounded-circle"
              src={comment.avatar}
              alt=""
            />
            <MDBMedia body className="text-center text-md-left ml-md-3 ml-0">
              <div className="d-flex justify-content-between">
                <h5 className="font-weight-bold mt-0">{comment.name}</h5>
                <span className="grey-text" style={{ fontSize: "15px" }}>
                  {comment.date}
                </span>
              </div>
              <div> {comment.text}</div>
              {console.log(comment.organizer)}
              {comment.user === auth.user.id ? (
                <Link
                  className="red-text"
                  onClick={() => this.onDelete(postId, comment._id)}
                  style={{ float: "right" }}
                >
                  delete
                </Link>
              ) : null}
            </MDBMedia>
          </MDBMedia>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { deleteComment })(PostComment);
