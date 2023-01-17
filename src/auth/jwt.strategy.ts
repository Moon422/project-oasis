import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EntityManager } from "typeorm";
import { Auth } from "./auth.entity";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private entityManager: EntityManager
    ) {
        super({
            secretOrKey: "9z$C&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+MbQeThWmZq4",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Auth> {
        const { username } = payload;
        const auth = this.entityManager.findOneBy(Auth, { username });

        if (!auth) {
            throw new UnauthorizedException();
        }

        return auth;
    }
}
