import moment from 'moment';

const SPOTIFY_RETURN_URI = 'spotifyReturnUri';
const SPOTIFY_ACCESS_TOKEN = 'spotifyAccessToken';
const SPOTIFY_REFRESH_TOKEN = 'spotifyRefreshToken';
const SPOITFY_EXPIRE_TIME = 'spotifyExpireTime';
const REFRESH_THRESHOLD_MIN = 1;

export const calculateExpireTime = expiresIn => moment().add(expiresIn, 'seconds').toString();

export const setLocalReturnUri = returnUri => localStorage.setItem(SPOTIFY_RETURN_URI, returnUri);

export const setLocalAuth = ({ accessToken, refreshToken, expireTime }) => {
  localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
  refreshToken && localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
  localStorage.setItem(SPOITFY_EXPIRE_TIME, expireTime);
};

export const getLocalReturnUri = () => localStorage.getItem(SPOTIFY_RETURN_URI);

const getLocalExpireTime = currentMoment => {
  const expireTime = localStorage.getItem(SPOITFY_EXPIRE_TIME);
  return expireTime ? moment(new Date(expireTime)) : currentMoment;
};

const getIsAuthExpired = currentMoment => {
  const expireTime = getLocalExpireTime(currentMoment);
  const expireDiff = moment.duration(expireTime.diff(currentMoment)).asMinutes();
  return expireDiff < REFRESH_THRESHOLD_MIN;
};

export const getLocalAccessToken = () => localStorage.getItem(SPOTIFY_ACCESS_TOKEN);

const getLocalRefreshToken = () => localStorage.getItem(SPOTIFY_REFRESH_TOKEN);

export const getLocalAuth = () => {
  return {
    accessToken: getLocalAccessToken(),
    refreshToken: getLocalRefreshToken(),
    expireTime: (getLocalExpireTime() || '').toString()
  };
};

export const hasValidLocalAuth = () => !getIsAuthExpired(moment());

export const getTimeFromMilliseconds = ms => {
  const time = {
    hours: ms.hours(),
    minutes: ms.minutes(),
    seconds: ms.seconds()
  };

  const hours = time.hours > 0 ? `${time.hours}:` : '';
  const minutes = time.minutes < 10 ? `0${time.minutes}` : time.minutes;
  const seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds;
  
  return `${hours}${minutes}:${seconds}`;
};
