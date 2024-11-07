import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  chain: string;

  @Column('decimal')
  thresholdPrice: number;

  @CreateDateColumn()
  createdAt: Date;
}
