import { NextApiRequest, NextApiResponse } from 'next';
import request from 'request';
import querystring from 'querystring';

export default function user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code || null;

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI;

  const buff = Buffer.from(client_id + ':' + client_secret).toString('base64');
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

      // pass the token to the browser to make requests from there
      res.redirect('/user?' +
        querystring.stringify({
          access: access_token,
          refresh: refresh_token
        }));
    } else {
      res.redirect('/user?' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
}