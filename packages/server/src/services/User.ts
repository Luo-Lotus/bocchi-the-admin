import { Prisma } from '@prisma/client';
import prisma from '../repositories';
import JWTUtil from '../utils/JWTUtil';
import { throwBusinessError } from '../utils/ErrorUtil';
import ErrorCode from '@bta/common/BusinessErrorCode';

const userServer = {
  async signIn(password: string, account: string) {
    const loginAccount = await prisma.account.findFirst({
      where: {
        password: password,
        OR: [
          {
            account: account,
          },
          {
            phoneNumber: account,
          },
          {
            email: account,
          },
        ],
      },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });
    return account
      ? {
          user: loginAccount?.user,
          authorization: JWTUtil.encode({ id: loginAccount?.user?.id }),
        }
      : throwBusinessError(
          ErrorCode.User.PASSWORD_OR_ACCOUNT_ERROR,
          '登陆失败，请检查用户名或密码是否正确',
        );
  },
};

export default userServer;
