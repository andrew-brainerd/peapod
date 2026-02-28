const SPOTIFY_RETURN_URI = 'spotifyReturnUri';
const SPOTIFY_ACCESS_TOKEN = 'spotifyAccessToken';
const SPOTIFY_REFRESH_TOKEN = 'spotifyRefreshToken';
const SPOITFY_EXPIRE_TIME = 'spotifyExpireTime';
const REFRESH_THRESHOLD_MIN = 1;

export const calculateExpireTime = expiresIn =>
  new Date(Date.now() + expiresIn * 1000).toISOString();

export const setLocalReturnUri = returnUri => localStorage.setItem(SPOTIFY_RETURN_URI, returnUri);

export const setLocalAuth = ({ accessToken, refreshToken, expireTime }) => {
  localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
  refreshToken && localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
  localStorage.setItem(SPOITFY_EXPIRE_TIME, expireTime);
};

export const getLocalReturnUri = () => localStorage.getItem(SPOTIFY_RETURN_URI);

const getLocalExpireTime = () => {
  const expireTime = localStorage.getItem(SPOITFY_EXPIRE_TIME);
  return expireTime ? new Date(expireTime).getTime() : Date.now();
};

const getIsAuthExpired = () => {
  const expireTime = getLocalExpireTime();
  const diffMin = (expireTime - Date.now()) / 60000;
  return diffMin < REFRESH_THRESHOLD_MIN;
};

export const getLocalAccessToken = () => localStorage.getItem(SPOTIFY_ACCESS_TOKEN);

const getLocalRefreshToken = () => localStorage.getItem(SPOTIFY_REFRESH_TOKEN);

export const getLocalAuth = () => {
  return {
    accessToken: getLocalAccessToken(),
    refreshToken: getLocalRefreshToken(),
    expireTime: new Date(getLocalExpireTime()).toISOString()
  };
};

export const hasValidLocalAuth = () => !getIsAuthExpired();

export const getTimeFromDuration = ms => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = hours < 10 ? `0${hours}` : hours;
  const mm = minutes < 10 ? `0${minutes}` : minutes;
  const ss = seconds < 10 ? `0${seconds}` : seconds;

  return `${hh}:${mm}:${ss}`;
};

export const formatTimer = timer => {
  const totalSeconds = typeof timer === 'number' ? Math.floor(timer / 1000) : 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = hours > 0 ? `${hours}:` : '';
  const mm = minutes < 10 ? `0${minutes}` : minutes;
  const ss = seconds < 10 ? `0${seconds}` : seconds;

  return `${hh}${mm}:${ss}`;
};
