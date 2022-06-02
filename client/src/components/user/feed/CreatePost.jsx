import React, { Component } from "react";
import { MDBInput, MDBBtn, MDBCollapse, MDBRow, MDBCol } from "mdbreact";
import "./CreatePost.scss";
import { connect } from "react-redux";
import { addPost } from "../../../actions/postActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#E9ECEF",
      collapseID: "",
      icon: "+",
      title: "",
      text: "",
      image: "",
      errors: {},
    };
  }
  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
      icon: prevState.icon === "+" ? "-" : "+",
      color: prevState.icon === "+" ? "rgb(168, 172, 177)" : "#E9ECEF",
    }));
  };

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

    const newPost = {
      title: this.state.title,
      text: this.state.text,
      image: this.state.image,
    };

    this.props.addPost(newPost);
    this.setState({
      text: "",
      title: "",
      image: "",
    });

    // this.props.registerUser(
    //     newUser,
    //     this.props.history,
    //     ()=>{
    //     Object.getOwnPropertyNames(this.state.errors).length>0 && this.openBasicTab()
    //     }
    // )

    // axios.post('/api/users/register',newUser)
    //     .then(res => console.log(res.data))
    //     .catch(err => this.setState({errors: err.response.data}))
  };

  render() {
    const { title, text, image, errors } = this.state;

    return (
      <div className="create-post-container-organizer">
        <div
          className="post-header"
          onClick={this.toggleCollapse("basicCollapse")}
          style={{ backgroundColor: this.state.color }}
        >
          <span style={{ fontSize: "20px" }}> Create Post</span>
          <span style={{ fontSize: "20px" }}>{this.state.icon}</span>
        </div>
        <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
          <form>
            {/* <MDBRow> <MDBCol>
                       
                   {errors.title && (<div className='validateError'>{errors.title}</div>)}
                   <br/>
                    <MDBInput 
                    
                        label="Title" 
                        outline
                        value={title} 
                        onChange={this.handleChange('title')}
                        className = {classnames({'is-invalid':errors.title})}
                        />
                        {console.log(errors)}
                        </MDBCol> </MDBRow> */}
            <MDBRow>
              {" "}
              <MDBCol>
                {errors.text && (
                  <div className="validateError">{errors.text}</div>
                )}
                <MDBInput
                  type="textarea"
                  label="Write Post"
                  outline
                  value={text}
                  className={classnames({ "is-invalid": errors.text })}
                  onChange={this.handleChange("text")}
                  style={{ marginTop: "20px", borderRadius: "5px" }}
                />
              </MDBCol>{" "}
            </MDBRow>
            <br />
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload Image
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  value={image}
                  onChange={this.handleChange("image")}
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <MDBBtn
              type="submit"
              onClick={this.onSubmit}
              style={{ margin: "2rem 0px", width: "100%" }}
            >
              Create Post
            </MDBBtn>
          </form>
        </MDBCollapse>
      </div>
    );
  }
}

CreatePost.propType = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(CreatePost);
