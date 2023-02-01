// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'querystring';

type Data = {
  name: string
}

const client_id = process.env.CLIENT_ID
let redirect_uri = process.env.REDIRECT_URI

if (process.env.NODE_ENV !== 'production') {
  redirect_uri = 'http://localhost:3000/api/user'
}

export default function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    }));
}
