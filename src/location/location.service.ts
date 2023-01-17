import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { userInfo } from 'os';
import { Auth } from 'src/auth/auth.entity';
import { UserType } from 'src/auth/user-type.enum';
import { EntityManager } from 'typeorm';
import { District } from './district.entity';
import { Division } from './division.entity';
import { AddDistrictDto } from './dtos/add-district.dto';
import { AddDivisionDto } from './dtos/add-division.dto';
import { AddSubDistrictDto } from './dtos/add-subdistrict.dto';
import { AddUnionDto } from './dtos/add-union.dto';
import { SubDistrict } from './sub-district.entity';
import { Union } from './union.entity';

@Injectable()
export class LocationService {
    constructor(
        private entityManager: EntityManager
    ) { }

    async addDivision(addDivisionDto: AddDivisionDto, auth: Auth) {
        const { user } = auth;

        if (user.userType === UserType.ADMIN) {
            const { name, bnName, coordinates } = addDivisionDto;
            const { longitude, latitude } = coordinates;

            try {
                const division = await this.entityManager.save(
                    this.entityManager.create(Division, {
                        name,
                        bnName,
                        coordinates: {
                            longitude, latitude
                        }
                    })
                );

                return division.id;
            } catch (err) {
                if (err.errno === 1062)
                    throw new BadRequestException("Cannot add divisions with duplicate names");

                throw new InternalServerErrorException();
            }
        }

        throw new UnauthorizedException();
    }

    async addDistrict(addDistrictDto: AddDistrictDto, auth: Auth) {
        const { user } = auth;

        if (user.userType === UserType.ADMIN) {
            const { name, bnName, coordinates, divisionId } = addDistrictDto;
            const { longitude, latitude } = coordinates;

            try {
                const division = await this.entityManager.findOneBy(Division, { id: divisionId });

                if (!division) {
                    throw new BadRequestException("Invalid division ID sent");
                }

                const district = await this.entityManager.save(
                    this.entityManager.create(District, {
                        name,
                        bnName,
                        coordinates: {
                            longitude, latitude
                        },
                        division
                    })
                );

                return district.id;
            } catch (err) {
                if (err.errno === 1062)
                    throw new BadRequestException("More than one district cannot coexist on same coordinates");

                throw new InternalServerErrorException();
            }
        }

        throw new UnauthorizedException();
    }

    async addSubDistrict(addSubDistrictDto: AddSubDistrictDto, auth: Auth) {
        const { user } = auth;

        if (user.userType === UserType.ADMIN) {
            const { name, bnName, coordinates, districtId } = addSubDistrictDto
            const { longitude, latitude } = coordinates;

            try {
                const district = await this.entityManager.findOneBy(District, { id: districtId });

                if (!district) {
                    throw new BadRequestException("Invalid district ID sent");
                }

                const subDistrict = await this.entityManager.save(
                    this.entityManager.create(SubDistrict, {
                        name,
                        bnName,
                        coordinates: {
                            longitude, latitude
                        },
                        district
                    })
                );

                return subDistrict.id;
            } catch (err) {
                if (err.errno === 1062)
                    throw new BadRequestException("More than one subdistrict cannot coexist on same coordinates");

                throw new InternalServerErrorException();
            }
        }

        throw new UnauthorizedException();
    }

    async addUnion(addUnionDto: AddUnionDto, auth: Auth) {
        const { user } = auth;

        if (user.userType === UserType.ADMIN) {
            const { name, bnName, coordinates, subDistrictId } = addUnionDto
            const { longitude, latitude } = coordinates;

            try {
                const subDistrict = await this.entityManager.findOneBy(SubDistrict, {
                    id: subDistrictId
                });

                if (!subDistrict) {
                    throw new BadRequestException("Invalid subdistrict ID sent");
                }

                const union = await this.entityManager.save(
                    this.entityManager.create(Union, {
                        name, bnName,
                        coordinates: {
                            longitude, latitude
                        },
                        subDistrict
                    })
                );

                return union.id;
            } catch (err) {
                if (err.errno === 1062)
                    throw new BadRequestException("More than one union cannot coexist on same coordinates");

                throw new InternalServerErrorException();
            }
        }

        throw new UnauthorizedException();
    }
}
