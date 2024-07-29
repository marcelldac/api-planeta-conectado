import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(3, 30)
  title: string;

  @IsString()
  @Length(1, 100)
  description: string;

  @IsString()
  user_id: string;
}
