import { createStore, combineReducers } from 'redux';

// WARN : You must only edit initialState for configuration

const initialState = {
    session: {
        user: null
    }
};

export const Keys = {
    SESSION: 'session'
};

// Anything below this line must not be edited

export const Action = {
    SET_OBJECT_KEY_VALUE: "SET_OBJECT_KEY_VALUE",
    SET_KEY_VALUE: "SET_KEY_VALUE",
    RESET: "RESET",
    ADD_VALUE_TO_ARRAY_ON_KEY: "ADD_VALUE_TO_ARRAY_ON_KEY",
    REMOVE_VALUE_FROM_ARARY_ON_KEY: "REMOVE_VALUE_FROM_ARARY_ON_KEY"
};

export const ActionTriggers = {
    handleKeyValue: (payload = { key: "", value: "" } ) => ({ payload, type: Action.SET_KEY_VALUE }),
    handleObjectKeyValue: ( object, payload = { key: "", value: "" } ) => ({ object, payload, type: Action.SET_OBJECT_KEY_VALUE }),
    handleReset: () => ({ type: Action.RESET }),
    addValueToArrayOnKey: (payload = { key: "", value: "" }) => ({ payload, type: Action.ADD_VALUE_TO_ARRAY_ON_KEY }),
    removeValueFromArrayOnKey: (payload = { key: "", value: "" }) => ({ payload, type: Action.REMOVE_VALUE_FROM_ARARY_ON_KEY }),
};

export const buildAction = (key, options) => ({ key, ...options });

const stateHandler = (state, action, key) => {
    if (action.key === key) {
        switch (action.type) {
            case Action.SET_OBJECT_KEY_VALUE:
                return {
                    ...state,
                    [action.object]: {
                        ...state[action.object],
                        [action.payload.key]: action.payload.value
                    }
                };
            case Action.SET_KEY_VALUE:
                return {
                    ...state,
                    [action.payload.key]: action.payload.value
                };
            case Action.ADD_VALUE_TO_ARRAY_ON_KEY:
                return {
                    ...state,
                    [action.payload.key]: [...state[action.payload.key], action.payload.value]
                };
            case Action.REMOVE_VALUE_FROM_ARARY_ON_KEY:
                let mutableArray = [...state[action.payload.key]];
                return {
                    ...state,
                    [action.payload.key]: mutableArray.filter(x => typeof(action.payload.value) === 'object' ? x.id !== action.payload.value.id : x !== action.payload.value)
                };
            default:
                console.log(key, state);
                return state;
        }
    } else if (action.type === Action.RESET) {
        return initialState[action.key];
    } else {
        return state;
    }
};

const reducers = Object.keys(initialState).reduce((obj, key) => ({
    ...obj,
    [key]: (state = initialState[key], action) => stateHandler(state, action, key)
}), {});

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer);

export default store;