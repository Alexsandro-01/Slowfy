import { IData } from '@/interfaces/types';
import { fetchRefreshToken } from './fetchs/spotify';
import { getItem, saveItem } from './localStorage';

const refreshTokenUrl = process.env.NEXT_PUBLIC_REFRESH_TOKEN_IRL;

function updateLocalToken(refreshedToken: string) {
  const DATAUSER = getItem('slowfy');
  DATAUSER.access = refreshedToken;
  DATAUSER.date = new Date();

  saveItem('slowfy', DATAUSER);
  return true;
}

function validTime(dataUser: IData) {
  const timeGap = new Date().getTime() - new Date(dataUser.date).getTime();
  const requiredTimeGap = 3600 * 1000;

  return timeGap >= requiredTimeGap;
}

export async function validateTokenTime(dataUser: IData) {

  if (validTime(dataUser)) {
    const newToken = await fetchRefreshToken(dataUser.refresh, refreshTokenUrl as string);

    return updateLocalToken(newToken.access_token);
  } else {
    return true;
  }
}