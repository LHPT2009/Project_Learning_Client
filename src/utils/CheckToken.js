import Cookies from 'js-cookie';

const CheckToken = () => {
  const timeTokenStr = Cookies.get('tokenExpirationMs');
  const timeRefreshTokenStr = Cookies.get('refreshTokenExpirationMs');

  if (timeTokenStr && timeRefreshTokenStr) {
    const timeToken = new Date(timeTokenStr).getTime();
    const timeRefreshToken = new Date(timeRefreshTokenStr).getTime();
    const timeNow = new Date().getTime();

    if (timeNow < timeToken) {
      return 0;
    } else if (timeNow < timeRefreshToken) {
      return 1;
    } else {
      return 2;
    }
  } else {
    return 2;
  }
};

export default CheckToken;
