import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';
const encode = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
};

const verify = (token: string) =>
  new Promise<any>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

export default { encode, verify };
