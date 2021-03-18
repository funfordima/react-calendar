import { State, Members, Events } from './interfaces';

const defaultState = {
  isLoad: true,
  eventID: '',
  currentUser: {} as Members,
  users: [] as Members[],
  isUpdate: '',
  events: [] as Events[],
  error: ''
};

const reducer = (state = defaultState, action: any): State => {
  switch (action.type) {
    case 'UPDATE_LOADING': {
      return {
        ...state,
        isLoad: action.payload,
      } 
    }

    case 'UPDATE_ID': {
      return {
        ...state,
        eventID: action.payload,
      } 
    }

    case 'UPDATE_CURRENT_USER': {
      return {
        ...state,
        currentUser: action.payload,
      } 
    }

    case 'UPDATE_MEMBERS': {
      return {
        ...state,
        users: action.payload,
      } 
    }

    case 'UPDATE_EVENTS': {
      return {
        ...state,
        events: action.payload,
      } 
    }

    case 'FETCH_UPDATE_SUCCESS_USERS': {
      return {
        ...state,
        isUpdate: action.payload,
      } 
    }

    case 'FETCH_UPDATE_ERROR': {
      return {
        ...state,
        error: action.payload,
      } 
    }

    default: {
      return {...state};
    }
  };
};

export default reducer;
