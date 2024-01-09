import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterFindDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsInt()
    @Transform(({ value }) => +value)
    @IsNotEmpty()
    @IsOptional()
    page: number;

    @IsInt()
    @Transform(({ value }) => +value)
    @IsNotEmpty()
    @IsOptional()
    limit: number;
}
