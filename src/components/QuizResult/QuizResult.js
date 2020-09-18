import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";

const QuizResult = props => {

    // ------------------------------------------------------
    // React: Component Template
    // ------------------------------------------------------
    if (props.questionsList.length !== 0) {
        return (
            <div className={props.correctAnswers > 0 ? "alert-success w-100 my-5 py-5 text-center" : "alert-danger w-100 my-5 py-5 text-center"} style={{borderRadius: '20px'}}>
                <h1>{props.correctAnswers > 0 ? 'Congratulations!' : 'Oppps'}</h1>
                <h4>Your Score</h4>
                <h1>{props.correctAnswers}</h1>
                <h6>Thank You, Feel free to make another Quiz.</h6>
                <Link to="/start" className="btn btn-success mt-3 mx-2">Start Again</Link>
                {props.isAuth ? <Link to="/dashboard" className="btn btn-warning mt-3 mx-2">Dashboard</Link> : ''}
            </div>
        )
    } else {
        return <Redirect to="/start" />
    }
}

// Map States from Redux to component props
const mapStateToProps = state => {
    return {
        questionsCount: state.quiz_reducer.questionsCount,
        questionsList: state.quiz_reducer.questionsList,
        correctAnswers: state.quiz_reducer.correctAnswers,
        isAuth: state.auth_reducer.isAuth,
    };
};

// Map Dispatch From Redux to component props
const mapDispatchToProps = dispatch => {
    return {
        saveCorrectAnswersHandler: (count) => dispatch({ type: 'Save_Correct_Answers', correctAnswers: count}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizResult);