import { randomUUID, UUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryColumn({ type: 'uuid', default: randomUUID() })
  id: UUID;

  @Column({ default: false })
  completed: boolean;

  @Column()
  createdAt: Date;

  @Column({ nullable: false })
  todo: string;

  @Column({ nullable: true })
  startAt: Date;

  @Column({ nullable: true })
  endAt: Date;
}
