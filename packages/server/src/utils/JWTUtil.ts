import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRED = '7d';

if (!JWT_SECRET) {
  console.warn(
    '未设置JWT_SECRET环境变量，请在server项目根目录[.env]文件中设置',
  );
}

const encode = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRED,
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
