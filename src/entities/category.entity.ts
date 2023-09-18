// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    name: "title_th",
    nullable: true,
    length: 255,
  })
  title_th: string | null;

  @Column("varchar", {
    name: "title_en",
    nullable: true,
  })
  title_en: string | null;

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