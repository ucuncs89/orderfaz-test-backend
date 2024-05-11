import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courier')
export class CourierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  logistic_name: string;

  @Column({ type: 'double precision' })
  amount: number;

  @Column({ type: 'varchar' })
  origin_name: string;

  @Column({ type: 'varchar' })
  destination_name: string;

  @Column({ type: 'varchar' })
  duration: string;
}
