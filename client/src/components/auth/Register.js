import React, { Component, Fragment } from 'react'

// This has to be a class component because it will be manipulating data

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        };

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
      }


    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:<input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label>
                        Email:<input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Fragment>
        )
    }

    // Component did mount -- called once, immediately after the render has taken place
    // used to perform any DOM manipulation of data-fetching
}


// Component did mount, which updates the data without the user having to refresh the page


// componentwillunmount -- cleans up any processes that was set up in component did mount,
// such as clearning an interval

export default Register