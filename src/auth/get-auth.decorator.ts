import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Auth } from "./auth.entity";

export const GetAuth = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest<{
            user: Auth
        }>();
        // console.log(req);
        return req.user;
    }
)
