import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { EntityManager } from 'typeorm';
import { Auth } from './auth.entity';
import { AuthCredDto } from './dtos/auth-cred.dto';
import { NewUserDto } from './dtos/new-user.dto';
import { UserType } from './user-type.enum';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        private entityManager: EntityManager,
        private jwtService: JwtService
    ) { }

    private encodeToken(username: string): Promise<string> {
        const payload = {
            username
        };
        return this.jwtService.signAsync(payload);
    }

    async signup(newUserDto: NewUserDto): Promise<string> {
        const { firstName, lastName, dateOfBirth, address, auth: _auth } = newUserDto;
        const { username, password } = _auth;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        try {
            return await this.entityManager.transaction(async manager => {
                const user = await manager.save(
                    manager.create(User, {
                        firstName,
                        lastName,
                        dateOfBirth,
                        userType: UserType.FARMER,
                        address
                    })
                );

                const auth = await manager.save(
                    manager.create(Auth, {
                        username,
                        password: hashedPassword,
                        user
                    })
                )

                return this.encodeToken(username);
            });
        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                throw new BadRequestException("Username already exists. Please use a different username.");
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signin(authCredDto: AuthCredDto): Promise<string> {
        const { username, password } = authCredDto;

        const auth = await this.entityManager.createQueryBuilder(Auth, "auth").where("auth.username = :username", { username }).getOne();
        // console.log(auth);

        if (auth && await compare(password, auth.password)) {
            return await this.encodeToken(auth.username);
        }

        throw new BadRequestException("Invalid credentials");
    }
}
