import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.entity';
import { GetAuth } from 'src/auth/get-auth.decorator';
import { AddDistrictDto } from './dtos/add-district.dto';
import { AddDivisionDto } from './dtos/add-division.dto';
import { AddSubDistrictDto } from './dtos/add-subdistrict.dto';
import { AddUnionDto } from './dtos/add-union.dto';
import { LocationService } from './location.service';

@Controller('locations')
@UseGuards(AuthGuard())
export class LocationController {
    constructor(
        private locationService: LocationService
    ) { }

    @Post("divisions")
    addDivision(@Body() addDivisionDto: AddDivisionDto, @GetAuth() auth: Auth) {
        return this.locationService.addDivision(addDivisionDto, auth);
    }

    @Post("districts")
    addDistrict(@Body() addDistrictDto: AddDistrictDto, @GetAuth() auth: Auth) {
        return this.locationService.addDistrict(addDistrictDto, auth);
    }

    @Post("subdistricts")
    addSubDistrict(@Body() addSubDistrictDto: AddSubDistrictDto, @GetAuth() auth: Auth) {
        return this.locationService.addSubDistrict(addSubDistrictDto, auth);
    }

    @Post("unions")
    addUnion(@Body() addUnionDto: AddUnionDto, @GetAuth() auth: Auth) {
        return this.locationService.addUnion(addUnionDto, auth);
    }
}
