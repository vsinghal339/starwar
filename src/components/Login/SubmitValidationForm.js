import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { SubmissionError } from "redux-form";
import { manualLogin } from '../../actions/users';

export var user1;
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const validate = val => {
  const errors = {};
  if (!val.username) {
    errors.username = 'Required';
  }
  if (!val.password) {
    errors.password = 'Required';
  }

  return errors;
};

class SubmitValidationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { loginMessage: "Hi" }
  }


  submit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(manualLogin(values, '/search')
      ).catch((error) => {
        alert("err0r")
        throw new SubmissionError(error);
      })
    })
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    const { user } = this.props;

    return (
      <div>

        <form onSubmit={handleSubmit(this.submit.bind(this))}>
          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username"
          />
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
          />
          {error && <strong>{error}</strong>}
          <div>
            <button type="submit" >Log In</button>
          </div>
        </form>
        {user.isWaiting &&
          <Dimmer active>
            <Loader />
          </Dimmer>}

      </div>
    );
  }

}

export default reduxForm({
  form: 'submitValidation', 
  validate,
})(SubmitValidationForm);
