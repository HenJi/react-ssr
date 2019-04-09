import { ActionType, createStandardAction } from "typesafe-actions"
import { createStore, combineReducers, Dispatch, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { fetchCircuits } from "./api";
import { Circuit } from './models/Circuit'

export interface StoreState {
    loggedIn: boolean
    data: Circuit[]
}

export const storeActions = {
    initializeSession: createStandardAction('INITIALIZE_SESSION')(),
    storeData: createStandardAction('STORE_DATA')<Circuit[]>(),
}
export type StoreAction = ActionType<typeof storeActions>

export const fetchData = ( ) => ( dispatch: Dispatch<StoreAction> ) =>
    fetchCircuits( ).then(
        (res: Circuit[]) => dispatch( storeActions.storeData( res ) )
    );

const sessionReducer = ( state: boolean = false, action: StoreAction ) => {
    switch ( action.type ) {
        case "INITIALIZE_SESSION": return true;
        default: return state;
    }
};

const dataReducer = ( state: Circuit[] = [], action: StoreAction ) => {
    switch ( action.type ) {
        case "STORE_DATA": return action.payload;
        default: return state;
    }
};

const reducer = combineReducers( {
    loggedIn: sessionReducer,
    data: dataReducer,
} );

const emptyState: StoreState = {
    data: [],
    loggedIn: false,
}

export default ( initialState: StoreState = emptyState ) =>
    createStore( reducer, initialState, applyMiddleware( thunkMiddleware ) );
