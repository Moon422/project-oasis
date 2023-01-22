import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { Union } from 'src/location/union.entity';
import { EntityManager } from 'typeorm';
import { Auth } from './auth.entity';
import { AuthCredDto } from './dtos/auth-cred.dto';
import { NewUserDto } from './dtos/new-user.dto';
import { UserType } from './user-type.enum';
import { Admin, Farmer, User } from './user.entity';

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

    async createAdmin(newUserDto: NewUserDto): Promise<string> {
        const { firstName, lastName, dateOfBirth, email, phoneNumber, address, auth: _auth } = newUserDto;
        const { username, password } = _auth;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        try {
            const union = await this.entityManager.findOneBy(Union, {
                id: address.unionId
            });

            if (!union) {
                throw new BadRequestException();
            }

            return await this.entityManager.transaction(async manager => {
                const user = await manager.save(
                    manager.create(Admin, {
                        firstName,
                        lastName,
                        dateOfBirth,
                        userType: UserType.ADMIN,
                        email,
                        phoneNumber,
                        placeName: address.placeName,
                        union
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

    async signup(newUserDto: NewUserDto): Promise<string> {
        const { firstName, lastName, dateOfBirth, email, phoneNumber, address, auth: _auth } = newUserDto;
        const { username, password } = _auth;
        const { placeName, unionId } = address;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        try {
            const union = await this.entityManager.findOneBy(Union, {
                id: unionId
            });

            if (!union) {
                throw new BadRequestException();
            }

            console.log(union);

            return await this.entityManager.transaction(async manager => {
                const user = await manager.save(
                    manager.create(Farmer, {
                        firstName,
                        lastName,
                        dateOfBirth,
                        userType: UserType.FARMER,
                        email,
                        phoneNumber,
                        placeName,
                        union
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

        const auth = await this.entityManager.findOneBy(Auth, { username });

        if (auth && await compare(password, auth.password)) {
            return await this.encodeToken(auth.username);
        }

        throw new BadRequestException("Invalid credentials");
    }
}
