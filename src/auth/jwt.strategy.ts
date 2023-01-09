import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { Auth } from "./auth.entity";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Auth)
        private authRepo: Repository<Auth>
    ) {
        super({
            secretOrKey: "9z$C&F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+MbQeThWmZq4",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Auth> {
        const { username } = payload;
        const auth = this.authRepo.findOneBy({ username });

        if (!auth) {
            throw new UnauthorizedException();
        }

        return auth;
    }
}
