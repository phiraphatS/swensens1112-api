// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    name: "first_name",
    nullable: true,
    length: 255,
  })
  first_name: string | null;

  @Column("varchar", {
    name: "last_name",
    nullable: true,
    length: 255,
  })
  last_name: string | null;

  @Column("varchar", {
    name: "phone_number",
    nullable: true,
    length: 255,
  })
  phone_number: string | null;

  @Column("varchar", {
    name: "email",
    nullable: true,
    length: 255,
  })
  email: string | null;

  @Column("varchar", {
    name: "password",
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column("integer", { name: "gender_id" })
  gender_id: number;

  @Column("datetime", { name: "birth_date" })
  birth_date: Date;

  @Column("integer", { name: "is_active", default: () => "1" })
  is_active: number | null;

  @Column("integer", { name: "is_delete", default: () => "0" })
  is_delete: number | null;

  @Column({ type: 'datetime', name: 'created_at' })
  created_at: Date;

  @Column("integer", { name: "created_by", default: () => "0" })
  created_by: number;

  @Column({ type: 'datetime', name: 'updated_at' })
  updated_at: Date;

  @Column("integer", { name: "updated_by" })
  updated_by: number;

  @Column("integer", { name: "is_admin", default: () => "1" })
  is_admin: number | null;

  @Column("integer", { name: "agree_news", default: () => "1" })
  agree_news: number | null;

}