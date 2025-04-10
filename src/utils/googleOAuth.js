import { OAuth2Client } from 'google-auth-library';
import { getEnvVar } from './getEnvVar.js';

const googleOAuthClient = new OAuth2Client({
  clientId: getEnvVar('GOODLE_OAUTH_CLIENT_ID'),
  clientSecret: getEnvVar('GOODLE_OAUTH_CLIENT_SECRED'),
  redirectUri: getEnvVar('GOODLE_OAUTH_REDIRECT_URI'),
});

export function getOAuthURL() {
  return googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
}

export async function validateCode(code) {
  const response = await googleOAuthClient.getToken(code);

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
}
