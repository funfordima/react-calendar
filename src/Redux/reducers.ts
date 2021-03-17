import { State } from './interfaces';

const reducer = (state: any, action: any): State => {
  switch (action.type) {
    case 'UPDATE_LOADING': {
      return {
        ...state,
        isLoad: action.payload,
      } 
    }

    default: {
      return {...state};
    }
  };
};

export default reducer;
