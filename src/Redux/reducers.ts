import { State } from './interfaces';

const reducer = (state: any, action: any): State => {
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

    default: {
      return {...state};
    }
  };
};

export default reducer;
