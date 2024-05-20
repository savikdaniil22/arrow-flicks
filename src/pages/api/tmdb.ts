import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const baseUrl = 'https://api.themoviedb.org/3';
  const { endpoint, params } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'TMDB API key is not set' });
  }
  try {
    const url = new URL(`${baseUrl}/${endpoint}`);
    if (typeof params === 'string') {
      url.search = new URLSearchParams(JSON.parse(params)).toString();
    }
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    res.status(500).json({ error: (error as Error).message || 'An unknown error occurred' });
  }
};

export default handler;
