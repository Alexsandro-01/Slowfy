import { NextApiRequest, NextApiResponse } from "next";
import request from 'request';
import querystring from 'querystring';

export default function user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code || null;

  const client_id = process.env.CLIENT_ID
  const client_secret = process.env.CLIENT_SECRET
  let redirect_uri = process.env.REDIRECT_URI

  if (process.env.NODE_ENV !== 'production') {
    redirect_uri = 'http://localhost:3000/api/user'
  }

  const buff = Buffer.from(client_id + ':' + client_secret).toString('base64')
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + buff
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      const access_token = body.access_token;
      const refresh_token = body.refresh_token;

      const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // pass the token to the browser to make requests from there
      res.redirect('/#?' +
        querystring.stringify({
          access: access_token,
          refresh: refresh_token
        }));
    } else {
      res.redirect('/#?' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
}