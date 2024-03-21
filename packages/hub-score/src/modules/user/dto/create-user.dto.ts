import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsEvmAddress } from "src/common/decorators/IsEvmAddress.decorator";
export class createUserDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsEvmAddress()
    username: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}