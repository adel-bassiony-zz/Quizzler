import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Redirect } from "react-router-dom";
import Header from '../Header/Header';

const Dashboard = props => {

    // Previous Quizzes Items
    const quizzesItems = props.previousQuizzes.map((quiz, index) =>
        <tr>
            <th scope="row">{index}</th>
            <td>{moment(quiz.date).format('DD MMM YYYY, h:mm a')}</td>
            <td>{quiz.score}</td>
            <td>{`${quiz.time} Seconds`}</td>
        </tr>
    )

    // Empty Quizzes Data Placeholder
    const emptyQuizzesPlaceholder = () => {
        return (
            <tr>
                <th>Empty Data</th>
            </tr>
        )
    }

    // ------------------------------------------------------
    // React: Component Template
    // ------------------------------------------------------
    if (props.isAuth) {
        return (
            <>
                <Header />
                <div className="container">
                    <h1 className="mt-3">Dashboard</h1>
                    <h6 className="mt-4">Previous Quizzes</h6>

                    <table className="table table-striped mt-2">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Score</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.previousQuizzes.length != 0 ? quizzesItems : emptyQuizzesPlaceholder()}
                        </tbody>
                    </table>
                </div>
            </>
        )
    } else {
        return <Redirect to="/" />
    }
}

// Map States from Redux to component props
const mapStateToProps = state => {
    return {
        isAuth: state.auth_reducer.isAuth,
        previousQuizzes: state.quiz_reducer.previousQuizzes,
    };
};

export default connect(mapStateToProps)(Dashboard);