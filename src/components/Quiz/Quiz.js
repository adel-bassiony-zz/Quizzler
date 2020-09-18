import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import moment from 'moment';
import { Progress } from 'reactstrap';
import QuizResult from '../QuizResult/QuizResult';
import Header from '../Header/Header';

const Quiz = props => {

    // ------------------------------------------------------
    // React: States
    // ------------------------------------------------------
    const [currentQuestionID, setCurrentQuestionID] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({
        "category": null,
        "question": null,
        "correct_answer": null,
        "incorrect_answers": [],
        "difficulty": null,
        "type": null
    })
    const [answer, setAnswer] = useState('')
    const [showQuizResult, setShowQuizResult] = useState(false)
    const [startTime, setStartTime] = useState(new Date())

    useEffect(() => {
        getNextQuestion()
    }, [])

    // Get Next Question
    const getNextQuestion = () => {
        
        if (currentQuestionID != props.questionsCount) {
            setCurrentQuestionID(currentQuestionID + 1)
        }

        setCurrentQuestion(props.questionsList[currentQuestionID])

        if (answer === currentQuestion.correct_answer) {
            props.saveCorrectAnswersHandler(props.correctAnswers + 1)
        }

        if (currentQuestionID == props.questionsCount) {
            finalQuizResult()
        }
        setAnswer("")
    }

    // Difference Betwen Dates
    function diff_hours(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        return Math.abs(Math.round(diff));
    }
    
    // Final Result
    const finalQuizResult = () => {
        setShowQuizResult(true)

        let currentQuiz = {
            "date": new Date(),
            "score": `${props.correctAnswers} / ${props.questionsList.length}`,
            "time": diff_hours(startTime, new Date())
        }

        let newQuizzes = [...props.previousQuizzes, currentQuiz]

        props.savePreviousQuizzesHandler(newQuizzes)
    }
    
    // Question Component
    const questionTemplate = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-5">
                    {/* Question */}
                    <p className="text-center">{currentQuestion.question}</p>

                    {/* Questions Answers */}
                    <div className="form-group">
                        <select className="custom-select" value={answer} onChange={(e) => setAnswer(e.target.value)}>
                            <option value="" disabled>Choose The Correct Answer...</option>
                            <option value={currentQuestion.correct_answer}>{currentQuestion.correct_answer}</option>
                            {currentQuestion.incorrect_answers.map((answer, index) =>
                                <option key={`answer-${index}`} value={answer}>{answer}</option>
                            )}
                        </select>
                    </div>
                </div>  
            </div>  
        )
    }

    // Quiz Button
    const quizButton = () => {
        return (
            <div className="row mt-4">
                <div className="col-md-4 offset-md-4">
                    <button
                        className="btn btn-success w-100"
                        disabled={answer === ""}
                        onClick={getNextQuestion}
                    >{currentQuestionID == props.questionsCount ? 'Show Result' : 'Next Question'}</button>
                </div>
            </div>
        )
    }

    // ------------------------------------------------------
    // React: Component Template
    // ------------------------------------------------------
    if (props.questionsList.length !== 0) {
        return (
            <>
                <Header />
                <div className="container">

                    {/* Quiz Progress */}
                    <div className="row my-5">
                        <div className="col-md-4 offset-md-4">
                            <h4 className="text-center">{`${currentQuestionID} / ${props.questionsList.length}`}</h4>
                            <Progress color="success" className="my-3" value={(currentQuestionID / props.questionsList.length) * 100} />
                        </div>
                    </div>

                    {/* Question Component */}
                    {!showQuizResult ? questionTemplate() : ''}

                    {/* Quiz Button */}
                    {!showQuizResult ? quizButton() : ''}

                    {/* Quiz Result */}
                    <div className="row">
                        {showQuizResult ? <QuizResult /> : ''}
                    </div>
                </div>
            </>
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
        previousQuizzes: state.quiz_reducer.previousQuizzes,
    };
};

// Map Dispatch From Redux to component props
const mapDispatchToProps = dispatch => {
    return {
        saveCorrectAnswersHandler: (count) => dispatch({ type: 'Save_Correct_Answers', correctAnswers: count}),
        savePreviousQuizzesHandler: (quizzes) => dispatch({ type: 'Save_Previous_Quizzes', previousQuizzes: quizzes}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);