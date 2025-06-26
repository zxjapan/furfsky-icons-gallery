import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const v3Path = path.join(process.cwd(), 'skyblockicons', 'v3');
    
    if (!fs.existsSync(v3Path)) {
      return res.status(404).json({ files: [] });
    }

    const files = fs.readdirSync(v3Path)
      .filter(file => /\.(png|gif|jpg|jpeg)$/i.test(file))
      .sort();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error reading files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 