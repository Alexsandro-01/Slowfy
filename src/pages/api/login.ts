// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';

type Data = {
  name: string
}

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

export default function login(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

	// permissões para os dados do usuário
	const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read playlist-read-private playlist-read-collaborative';
	res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    }));
}
