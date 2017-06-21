import {
    TYPE_KEY
} from "../app/constant";
import axios from "axios";

const LOADED_COMMEND_DATA_SUCCESSFUL = "LOADED_COMMEND_DATA_SUCCESSFUL";
const OPEN_HIDE_COMMENT = "OPEN_HIDE_COMMENT";
const SET_ACKNOWLEDGE = "SET_ACKNOWLEDGE";

export const DATA = "data";
export const OPEN = "open";
export const COMMENT = "comment";
export const NUMBER = "numberOfAcknowledgedComment";

export const initialState = {
    [DATA]: null,
    [OPEN]: false,
    [NUMBER]: ""
};

export default function reducer( state = initialState, action ) {
    let newState;
    switch ( action[ TYPE_KEY ] ) {
        case LOADED_COMMEND_DATA_SUCCESSFUL:
            newState = {
                ...state,
                [OPEN]: true,
                [NUMBER]: action[ NUMBER ],
                [DATA]: action[ DATA ]
            };
            break;
        case OPEN_HIDE_COMMENT:
            newState = {
                ...state,
                [OPEN]: action[ OPEN ]
            };
            break;
        case SET_ACKNOWLEDGE:
            newState = {
                ...state,
                [NUMBER]: action[ NUMBER ]
            };
            break;
        default:
            newState = {
                ...state
            };
            break;
    }
    return newState;
}

export function loadComments() {
    return ( dispatch ) => {
        axios.get("../comment_data.json").then(response => {
            dispatch(loadCommentsSuccessful(response));
        });
    };
}

export function acknowledge( id ) {
    return ( dispatch, getState ) => {
        const comment = getState().comments.data.find(d => d.id === id);
        comment.acknowledged = true;
        const numberOfComment = getState().comments.data.filter(x => x.acknowledged === false).length;
        dispatch(setAcknowledged(comment, numberOfComment));
    };
}

export function openComments( open ) {
    return {
        [TYPE_KEY]: OPEN_HIDE_COMMENT,
        [OPEN]: open
    };
}

export function loadCommentsSuccessful( comments ) {
    return {
        [TYPE_KEY]: LOADED_COMMEND_DATA_SUCCESSFUL,
        [DATA]: comments.data,
        [NUMBER]: comments.data.filter(x => x.acknowledged === false).length
    };
}

function setAcknowledged( comment, numberOfComment ) {
    return {
        [TYPE_KEY]: SET_ACKNOWLEDGE,
        [COMMENT]: comment,
        [NUMBER]: numberOfComment
    };
}

