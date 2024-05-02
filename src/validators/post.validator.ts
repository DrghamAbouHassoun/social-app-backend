import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostValidator {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsString()
    file: string;

    @IsString()
    filetype: string;
}

export class CreateCommentValidator {
    @IsNotEmpty()
    @IsString()
    content: string;
}