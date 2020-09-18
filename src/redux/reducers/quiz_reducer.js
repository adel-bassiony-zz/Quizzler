import * as actionTypes from '../actions';

// Define initialState
const initialState = {
    questionsCount: 0,
    questionsCategory: null,
    questionsDifficulty: null,
    questionsList: [],
    correctAnswers: 0,
    previousQuizzes: JSON.parse(localStorage.getItem('previousQuizzes')) ? JSON.parse(localStorage.getItem('previousQuizzes')) : []
}


// Define the Auth Reducer
export default function auth_reducer(state = initialState, action) {
    switch (action.type) {
        
        // Quiz: Start Quiz
        case actionTypes.Setup_Quiz:
            return {
                ...state,
                questionsCount: action.questionsCount,
                questionsCategory: action.questionsCategory,
                questionsDifficulty: action.questionsDifficulty,
            }
        
        // Quiz: Save Quiz Questions
        case actionTypes.Save_Quiz_Questions:
            return {
                ...state,
                questionsList: action.questionsList,
            }
        
        // Quiz: Save Correct Answers
        case actionTypes.Save_Correct_Answers:
            return {
                ...state,
                correctAnswers: action.correctAnswers,
            }
        
        // Quiz: Save Correct Answers
        case actionTypes.Save_Previous_Quizzes:
            localStorage.setItem('previousQuizzes', JSON.stringify(action.previousQuizzes));
            return {
                ...state,
                previousQuizzes: action.previousQuizzes,
            }
        
        // Auth: Default
        default:
            return state;
    }
};
