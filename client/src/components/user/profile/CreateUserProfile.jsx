import React, { useState } from "react";
import { MDBInput, MDBContainer, MDBIcon, MDBBtn } from "mdbreact";
import { createProfile } from "../../../actions/userProfileActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputField from "../../../common/InputField";
import classnames from "classnames";
import ValidationError from "../../../common/ValidationError.component";

const CreateUserProfile = (props) => {
  const { errors } = props;
  const [userProfileData, setUserProfileData] = useState({
    handle: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
  });
  const {
    handle,
    bio,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = userProfileData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfileData((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUserProfileData = userProfileData;
    props.createProfile(newUserProfileData, props.history);
  };
  return (
    <div>
      <MDBContainer>
        <h1 align="center">Create Profile</h1>
        <div style={{ margin: "0px 225px" }}>
          <div className="d-flex">
            <div className="w-100">
              <MDBInput
                label="Handle*"
                icon="user"
                name="handle"
                value={handle}
                onChange={handleChange}
                className={classnames({
                  "is-invalid": errors.handle,
                })}
              />
              {errors.handle && (
                <ValidationError className="pl-4 ml-2" error={errors.handle} />
              )}
            </div>
          </div>
          <div className="d-flex">
            <div className="w-100">
              <MDBInput
                type="textarea"
                label="bio"
                icon="user"
                name="bio"
                outline
                value={bio}
                onChange={handleChange}
                className={classnames({
                  "is-invalid": errors.bio,
                })}
              />
              {errors.bio && (
                <ValidationError className="pl-4 ml-2" error={errors.bio} />
              )}
            </div>
          </div>
          <br />
          <h4 style={{ display: "inline" }}>Add Social Links </h4>
          <span className="text-muted">(Optional)</span>
          <br />
          <br />
          <div style={{ marginRight: "350px" }}>
            <div className="d-flex">
              <div className="w-100">
                <InputField
                  name="facebook"
                  prepend={<MDBIcon fab icon="facebook-f" />}
                  value={facebook}
                  onChange={handleChange}
                  hint="Facebook Profile URL"
                  className={classnames("form-control", {
                    "is-invalid": errors.facebook,
                  })}
                />
                {errors.facebook && (
                  <ValidationError
                    className="pl-4 ml-2"
                    error={errors.facebook}
                  />
                )}
              </div>
            </div>
            <div className="d-flex">
              <div className="w-100">
                <InputField
                  prepend={<MDBIcon fab icon="linkedin-in" />}
                  hint="LinkedIn Profile URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={handleChange}
                  className={classnames("form-control", {
                    "is-invalid": errors.linkedin,
                  })}
                />
                {errors.linkedin && (
                  <ValidationError
                    className="pl-4 ml-2"
                    error={errors.linkedin}
                  />
                )}
              </div>
            </div>
            <div className="d-flex">
              <div className="w-100">
                <InputField
                  prepend={<MDBIcon fab icon="instagram" />}
                  hint="Instagram Profile URL"
                  name="instagram"
                  value={instagram}
                  onChange={handleChange}
                  className={classnames("form-control", {
                    "is-invalid": errors.instagram,
                  })}
                />
                {errors.instagram && (
                  <ValidationError
                    className="pl-4 ml-2"
                    error={errors.instagram}
                  />
                )}
              </div>
            </div>
            <div className="d-flex">
              <div className="w-100">
                <InputField
                  prepend={<MDBIcon fab icon="twitter" />}
                  hint="Twitter Profile URL"
                  name="twitter"
                  value={twitter}
                  onChange={handleChange}
                  className={classnames("form-control", {
                    "is-invalid": errors.twitter,
                  })}
                />
                {errors.twitter && (
                  <ValidationError
                    className="pl-4 ml-2"
                    error={errors.twitter}
                  />
                )}
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <MDBBtn
              color="dark"
              style={{ width: "100%" }}
              type="submit"
              onClick={onSubmit}
            >
              Create Profile
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateUserProfile)
);
