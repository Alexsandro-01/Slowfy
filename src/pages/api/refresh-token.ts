import { NextApiRequest, NextApiResponse } from "next";
import request from 'request';

export default function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client_id = process.env.CLIENT_ID
  const client_secret = process.env.CLIENT_SECRET
  let redirect_uri = process.env.REDIRECT_URI

  if (process.env.NODE_ENV !== 'production') {
    redirect_uri = 'http://localhost:3000/api/user'
  }

  const buff = Buffer.from(client_id + ':' + client_secret).toString('base64')
  
  // ****
  const body = JSON.parse(req.body)
  const refresh_token = body.refresh_token;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + buff },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
}