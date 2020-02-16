import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// useState is a hook, returns current state value and function that lets you update it

// Hooks dont work inside classes
// Hooks allow you to use state without writing a class

// There is no this
const Register = ({ register }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password} = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        register({ name, email, password });
    };

    return (
        <Fragment>
            <form className='form' onSubmit={e => onSubmit(e)}>
                    <label>
                        Name:<input type="text" name="name" value={name} onChange={e => onChange(e)} required/>
                    </label>
                    <label>
                        Email:<input type="email" name="email" value={email} onChange={e => onChange(e)} required/>
                    </label>
                    <label>
                        Password:<input type="password" name="password" value={password} onChange={e => onChange(e)} required/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };
  

export default connect(null, { register })(Register);