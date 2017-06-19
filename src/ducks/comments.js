import {
    TYPE_KEY
} from "../app/constant";
import axios from "axios";

const LOADED_COMMEND_DATA_SUCCESSFUL = "LOADED_COMMEND_DATA_SUCCESSFUL";
const OPEN_HIDE_COMMENT = "OPEN_HIDE_COMMENT";

export const DATA = "data";
export const OPEN = "open";

export const initialState = {
    [DATA]: null,
    [OPEN]: false
};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action[TYPE_KEY]) {
        case LOADED_COMMEND_DATA_SUCCESSFUL:
            newState = {
                ...state,
                [OPEN]: true,
                [DATA]: action[DATA]
            };
            break;
        case OPEN_HIDE_COMMENT:
            newState = {
                ...state,
                [OPEN]: action[OPEN]
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
    return (dispatch) => {
        axios.get("../comment_data.json").then(response => {
            dispatch(loadCommentsSuccessful(response));
        });
    };
}

export function openComments(open) {
    return {
        [TYPE_KEY]: OPEN_HIDE_COMMENT,
        [OPEN]: open
    };
}

export function loadCommentsSuccessful(comments) {
    return {
        [TYPE_KEY]: LOADED_COMMEND_DATA_SUCCESSFUL,
        [DATA]: comments.data
    };
}

