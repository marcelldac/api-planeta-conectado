import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 80, unique: true })
  email: string;

  @Column('varchar', { length: 80 })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  created_at: Date;
  updated_at: Date;
}
