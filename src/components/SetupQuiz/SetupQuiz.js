import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from '../Header/Header';

const SetupQuiz = props => {

    let history = useHistory();

    const [count, setCount] = useState(10)
    const [category, setCategory] = useState(9)
    const [difficulty, setDifficulty] = useState("easy")
    const [isLoaded, setIsLoaded] = useState(true)


    const setupQuiz = () => {
        setIsLoaded(false)

        axios.get(`https://opentdb.com/api.php?amount=${count}&category=${category}&difficulty=${difficulty}`)
            .then(res => {
                console.log(res)
                props.setupQuizHandler(count, category, difficulty)
                props.saveQuizQuestionsHandler(res.data.results)
                history.push("/quiz")
            })
            .catch(err => {
                console.log(err.response)
                setIsLoaded(true)
            })
    }

    // ------------------------------------------------------
    // React: Component Template
    // ------------------------------------------------------
    return (
        <>
            <Header />
            <div className="container">
                <h1 className="my-4">New Quiz</h1>

                <div className="row mt-5">
                    {/* Number Of Questions */}
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Number of Questions</label>
                            <input type="number" className="form-control" placeholder="Enter Number of Questions" value={count} onChange={(e) => setCount(e.target.value)} />
                        </div>
                    </div>

                    {/* Questions Category */}
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Questions Category</label>
                            <select className="custom-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option disabled>Choose The Questions Category...</option>
                                <option value="9">General Knowledge</option>
                                <option value="10">Entertainment: Books</option>
                                <option value="11">Entertainment: Film</option>
                                <option value="12">Entertainment: Music</option>
                                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                                <option value="14">Entertainment: Television</option>
                                <option value="15">Entertainment: Video Games</option>
                                <option value="16">Entertainment: Board Games</option>
                                <option value="17">Science &amp; Nature</option>
                                <option value="18">Science: Computers</option>
                                <option value="19">Science: Mathematics</option>
                                <option value="20">Mythology</option>
                                <option value="21">Sports</option>
                                <option value="22">Geography</option>
                                <option value="23">History</option>
                                <option value="24">Politics</option>
                                <option value="25">Art</option>
                                <option value="26">Celebrities</option>
                                <option value="27">Animals</option>
                                <option value="28">Vehicles</option>
                                <option value="29">Entertainment: Comics</option>
                                <option value="30">Science: Gadgets</option>
                                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                                <option value="32">Entertainment: Cartoon &amp; Animations</option>
                            </select>
                        </div>
                    </div>

                    {/* Questions Difficulty */}
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Questions Difficulty</label>
                            <select className="custom-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                <option disabled>Choose The Questions Difficulty...</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4 offset-md-4">
                        <button className="btn btn-success w-100" disabled={count < 10 || count > 25} onClick={setupQuiz}>{isLoaded ? 'Start' : <Spinner size="sm" color="light" />}</button>
                    </div>
                </div>
            
            </div>
        </>
    )
}

// Map Dispatch From Redux to component props
const mapDispatchToProps = dispatch => {
    return {
        setupQuizHandler: (count, category, difficulty) => dispatch({ type: 'Setup_Quiz', questionsCount: count, questionsCategory: category, questionsDifficulty: difficulty }),
        saveQuizQuestionsHandler: (questions) => dispatch({ type: 'Save_Quiz_Questions', questionsList: questions}),
    };
};

export default connect(null, mapDispatchToProps)(SetupQuiz);