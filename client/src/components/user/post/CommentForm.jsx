import React, { Component } from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import { addComment } from "../../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
    };
  }
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
    };

    this.props.addComment(postId, newComment);
    this.setState({
      text: "",
    });
  };
  render() {
    const { text } = this.state;
    return (
      <div>
        <form action="">
          <MDBInput
            type="textarea"
            label="Write Comment"
            outline
            className="rounded bg-white"
            value={text}
            onChange={this.handleChange("text")}
          />
          <MDBBtn
            style={{ float: "right" }}
            type="submit"
            onClick={this.onSubmit}
          >
            Add Comment
          </MDBBtn>
        </form>
      </div>
    );
  }
}

CommentForm.propType = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
