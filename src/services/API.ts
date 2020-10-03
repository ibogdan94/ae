import {ImageDetailsI, ImageI} from '../types/image';
import httpClient from '../httpClient';
import {API_ENDPOINT} from '../contants';
import {AuthResponse} from '../types/auth';

export type PicturesResponseI = {
  hasMore: boolean;
  page: number;
  pageCount: number;
  pictures: Array<ImageI>;
};

export async function getPictures(
  page: number = 1,
): Promise<PicturesResponseI> {
  try {
    const {data} = await httpClient.get(`${API_ENDPOINT}/images/?page=${page}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getPictureDetails(id: number): Promise<ImageDetailsI> {
  try {
    const {data} = await httpClient.get(`${API_ENDPOINT}/images/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function auth(apiKey: string): Promise<AuthResponse> {
  try {
    const {data} = await httpClient.post(
      `${API_ENDPOINT}/auth`,
      {apiKey},
      {headers: {isPublic: true}},
    );

    return data;
  } catch (e) {
    throw e;
  }
}

export async function refresh(): Promise<AuthResponse> {
  //no end point for this
  return {
    auth: true,
    token: 'foo',
  };
}
