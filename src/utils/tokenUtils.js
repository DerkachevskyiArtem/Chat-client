import { jwtDecode } from 'jwt-decode';

export function checkToken(token) {
  if (!token) {
    return false;
  }

  const { exp } = jwtDecode(token);

  const currentTime = Date.now();

  return exp * 1000 > currentTime + 5000;
}
