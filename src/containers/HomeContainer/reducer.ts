import {
  PICTURES_FETCH_REQUESTED,
  PICTURES_FETCH_SUCCESS,
  FETCH_FAILED,
} from './actions';
import {AnyAction} from 'redux';
import {ImageI} from '../../types/image';
import {PicturesResponseI} from '../../services/API';

export interface PictureReducerState {
  pictures: Array<ImageI>;
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  errorMessage?: string;
}

const initialState: PictureReducerState = {
  pictures: [],
  isLoading: true,
  hasMore: false,
  page: 1,
  errorMessage: '',
};

export default function (
  state: PictureReducerState = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case PICTURES_FETCH_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PICTURES_FETCH_SUCCESS: {
      const {
        page,
        pictures,
        hasMore,
        pageCount,
      } = action.payload as PicturesResponseI;
      console.log(pageCount);
      return {
        ...state,
        isLoading: false,
        hasMore,
        page,
        pictures:
          page === 1 ? pictures : [...state.pictures].concat(...pictures),
      };
    }
    case FETCH_FAILED: {
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
