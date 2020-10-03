import {getPictures, PicturesResponseI} from '../../services/API';
import {AnyAction} from 'redux';

export const PICTURES_FETCH_REQUESTED = 'PICTURES_FETCH_REQUESTED';
export const PICTURES_FETCH_SUCCESS = 'PICTURES_FETCH_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';

export function listIsLoading(): AnyAction {
  return {
    type: PICTURES_FETCH_REQUESTED,
  };
}

export function fetchListSuccess(payload: PicturesResponseI): AnyAction {
  return {
    type: PICTURES_FETCH_SUCCESS,
    payload,
  };
}

export function fetchListFailed(errorMessage: string): AnyAction {
  return {
    type: FETCH_FAILED,
    payload: errorMessage,
  };
}

export function fetchPictures(page: number = 1) {
  return async (dispatch: any) => {
    dispatch(listIsLoading);
    try {
      const res = await getPictures(page);
      dispatch(fetchListSuccess(res));
    } catch (e) {
      dispatch(fetchListFailed(e));
    }
  };
}
