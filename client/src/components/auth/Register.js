import React, { useState, Fragment } from 'react'
// useState is a hook, returns current state value and function that lets you update it

// Hooks dont work inside classes
// Hooks allow you to use state without writing a class

// There is no this
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
         console.log(formData);
    }

    return (
        <Fragment>
            <form onSubmit={e => onSubmit(e)}>
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

export default Register;