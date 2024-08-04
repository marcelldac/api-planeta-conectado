import { IsString, Length } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @Length(1, 255)
  path: string;

  @IsString()
  post_id: string;
}
