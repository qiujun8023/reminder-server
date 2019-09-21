import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';
import { MomentType } from '../enum/moment-type.enum';
import { DateType } from '../enum/date-type.enum';
import { RepeatType } from '../enum/repeat-type.enum';

@Entity()
export class Moment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: MomentType })
  type: MomentType;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: DateType })
  dateType: DateType;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: RepeatType })
  repeatType: RepeatType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User, user => user.moments)
  user: User;

  @OneToMany(type => Schedule, schedule => schedule.moment)
  schedules: Schedule[];
}
