import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import Header from '../Header/Header';

const Account = props => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    let history = useHistory();

    const createAccount = () => {
        props.createAccountHandler(true, name, email)
        history.push("/dashboard")
    }

    // ------------------------------------------------------
    // React: Component Template
    // ------------------------------------------------------
    return (
        <>
            <Header />
            
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1>Account</h1>

                        {/* Name */}
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-control" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        {/* Create Account Button */}
                        <button className="btn btn-success w-100 mt-3" onClick={createAccount}>Create Account</button>
                        <Link to="/" className="btn btn-warning w-100 mt-3">Back To Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

// Map Dispatch From Redux to component props
const mapDispatchToProps = dispatch => {
    return {
        createAccountHandler: (isAuth, name, email) => dispatch({ type: 'Create_Account', isAuth: true, accountName: name, accountEmail: email}),
    };
};

export default connect(null, mapDispatchToProps)(Account);