import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "../redcucers/authReducer";
import thunk from 'redux-thunk';
import { uiReducer } from "../redcucers/uiReducer";
import { notesReducer } from "../redcucers/notesReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
}) 

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
     );

    