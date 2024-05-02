import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryValidator {
    @IsNotEmpty()
    @IsString()
    name: string;
}