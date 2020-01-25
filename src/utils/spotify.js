import moment from 'moment';

const SPOTIFY_RETURN_URI = 'spotifyReturnUri';
const SPOTIFY_ACCESS_TOKEN = 'spotifyAccessToken';
const SPOTIFY_REFRESH_TOKEN = 'spotifyRefreshToken';
const SPOITFY_EXPIRE_TIME = 'spotifyExpireTime';
const REFRESH_THRESHOLD_MIN = 1;

export const getReturnUri = () => localStorage.getItem(SPOTIFY_RETURN_URI);

const calculateExpireTime = expiresIn => moment().add(expiresIn, 'seconds').toString();

export const setSpotifyAuth = ({ accessToken, refreshToken, expiresIn }) => {
  const expireTime = calculateExpireTime(expiresIn);

  localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
  localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
  localStorage.setItem(SPOITFY_EXPIRE_TIME, expireTime);
};

const getExpireTime = currentMoment => {
  const expireTime = localStorage.getItem(SPOITFY_EXPIRE_TIME);
  return expireTime ? moment(expireTime) : currentMoment;
};

const getIsAuthExpired = currentMoment => {
  const expireTime = getExpireTime(currentMoment);
  const expireDiff = moment.duration(expireTime.diff(currentMoment)).asMinutes();

  return expireDiff < REFRESH_THRESHOLD_MIN;
};

export const getAccessToken = () => {
  const isTokenValid = !getIsAuthExpired(moment());
  const localAccessToken = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);

  return isTokenValid ? localAccessToken : null;
};
