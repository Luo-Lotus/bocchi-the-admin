import { t } from "./helpers/createRouter";
import { usersRouter } from "./User.router";
import { rolesRouter } from "./Role.router";
import { permissionsRouter } from "./Permission.router";

export const appRouter = t.router({
  user: usersRouter,
  role: rolesRouter,
  permission: permissionsRouter
})

