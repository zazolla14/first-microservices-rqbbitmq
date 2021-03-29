import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    likes: number
}
