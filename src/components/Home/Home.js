import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const Home = props => {

    // Pre Added Account Button
    const accountButton = () => {
        return (
            <Link to="/dashboard" className="btn btn-warning w-100">Containue As <strong>{props.accountName}</strong></Link>
        )
    }

    // ------------------------------------------------------
    // React: Component Template
    // ------------------------------------------------------
    return (
        <div className="container">
            <h1 className="text-center mt-5 pt-5">Quizzler</h1>
            <h5 className="text-center mt-3">Funny and powerful quizzes</h5>
            <div className="row mt-5 pt-5">
                <div className="col-md-4 offset-md-4">
                    {props.accountName !== null ? accountButton() : ''}
                    <Link to="/account" className="btn btn-info w-100 mt-2">Create New Account</Link>
                    <Link to="/start" className="btn btn-secondary w-100 mt-5">Skip</Link>
                </div>
            </div>
        </div>
    )
}

// Map States from Redux to component props
const mapStateToProps = state => {
    return {
        accountName: state.auth_reducer.accountName,
    };
};

export default connect(mapStateToProps)(Home);