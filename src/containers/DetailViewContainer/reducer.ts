import {AnyAction} from 'redux';

import {
  PICTURE_DETAILS_FETCH_FAILED,
  PICTURE_DETAILS_FETCH_REQUESTED,
  PICTURE_DETAILS_FETCH_SUCCESS,
} from './actions';

const initialState = {
  hiResPictures: [],
  isLoading: false,
};

export default function (state: any = initialState, action: AnyAction) {
  switch (action.type) {
    case PICTURE_DETAILS_FETCH_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PICTURE_DETAILS_FETCH_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        hiResPictures: [...state.hiResPictures].concat(action.payload),
      };
    }
    case PICTURE_DETAILS_FETCH_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
