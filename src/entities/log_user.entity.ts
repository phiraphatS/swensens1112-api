// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class LogUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", { name: "user_id" })
  user_id: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    length: 255,
  })
  name: string | null;

  @Column("integer", { name: "is_active", default: () => "1" })
  is_active: number;

  @Column("integer", { name: "is_delete", default: () => "0" })
  is_delete: number;

  @Column({ type: 'datetime', name: 'created_at' })
  created_at: Date;

  @Column("integer", { name: "created_by", default: () => "0" })
  created_by: number;

  @Column({ type: 'datetime', name: 'updated_at' })
  updated_at: Date;

  @Column("integer", { name: "updated_by" })
  updated_by: number;

}