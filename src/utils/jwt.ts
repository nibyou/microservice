import * as jwt from 'jsonwebtoken';
import config from '../../config';

export async function verifyAccessToken(token: string): Promise<any> {
  const publicKey = await fetch(config.JWT_PUBLIC_KEY_ADDRESS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey.public_key, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
