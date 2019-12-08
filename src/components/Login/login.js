import React, { Component } from 'react'
import SubmitValidationForm from "./SubmitValidationForm";

export default class Login extends Component {
    render() {
        return (
            <div style={{ float:'left',marginLeft:'25%',marginTop:'15%', width:'50%', padding: '40px 0px 20px 0px',marginTtop: '20px',backgroundColor: '#f7f7f7',boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)' }}>
                <SubmitValidationForm user={this.props.user} />
            </div>
        )
    }
}