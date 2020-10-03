import {AnyAction} from 'redux';

import {getPictureDetails} from '../../services/API';
import {ImageDetailsI} from '../../types/image';

export const PICTURE_DETAILS_FETCH_REQUESTED =
  'PICTURE_DETAILS_FETCH_REQUESTED';
export const PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS';
export const PICTURE_DETAILS_FETCH_FAILED = 'PICTURE_DETAILS_FETCH_FAILED';

export function pictureIsLoading(): AnyAction {
  return {
    type: PICTURE_DETAILS_FETCH_REQUESTED,
  };
}

export function fetchPictureSuccess(payload: ImageDetailsI): AnyAction {
  return {
    type: PICTURE_DETAILS_FETCH_SUCCESS,
    payload,
  };
}

export function fetchPictureFailed(errorMessage: string): AnyAction {
  return {
    type: PICTURE_DETAILS_FETCH_FAILED,
    payload: errorMessage,
  };
}

export function fetchPictureDetails(imageId: number) {
  return async (dispatch: any) => {
    dispatch(pictureIsLoading);
    try {
      const res = await getPictureDetails(imageId);
      dispatch(fetchPictureSuccess(res));
    } catch (e) {
      dispatch(fetchPictureFailed(e));
    }
  };
}
