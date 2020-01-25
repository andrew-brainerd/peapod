import moment from 'moment';

const SPOTIFY_RETURN_URI = 'spotifyReturnUri';
const SPOTIFY_ACCESS_TOKEN = 'spotifyAccessToken';
const SPOTIFY_REFRESH_TOKEN = 'spotifyRefreshToken';
const SPOITFY_EXPIRE_TIME = 'spotifyExpireTime';

export const getReturnUri = () => localStorage.getItem(SPOTIFY_RETURN_URI);

const calculateExpireTime = expiresIn => {
  console.log(`Calculate: `, expiresIn);
  return moment().add(expiresIn, 'seconds').toString();
};

export const setSpotifyAuth = ({ accessToken, refreshToken, expiresIn }) => {
  const expireTime = calculateExpireTime(expiresIn);

  console.log(`%cSpotify Auth: %o`, 'color: green', { accessToken, refreshToken, expireTime });

  localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
  localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
  localStorage.setItem(SPOITFY_EXPIRE_TIME, expireTime);
};

const getExpireTime = currentMoment => {
  const expireTime = localStorage.getItem(SPOITFY_EXPIRE_TIME);
  expireTime ? console.log(`%cExpire Time: ${expireTime}`, 'color: green') : console.log(`%cNow: ${currentMoment.toString()}`, 'color: yellow');
  return expireTime ? moment(expireTime) : currentMoment;
};

const getIsAuthExpired = currentMoment => {
  const expireTime = getExpireTime(currentMoment);
  const expireDiff = expireTime.diff(currentMoment);
  console.log({ expireTime, expireDiff: moment.duration(expireDiff).asMinutes(), isExpired: moment.duration(expireDiff).asMinutes() < 5 });
  return moment.duration(expireDiff).asMinutes() < 5;
};

export const getAccessToken = () => {
  const isAuthExpired = getIsAuthExpired(moment());
  const localAccessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);

  isAuthExpired ? console.log('%cExpired', 'color: red') : console.log('%cGood', 'color: blue');

  if (isAuthExpired) {
    return null;
  }
  return localAccessToken;
};
