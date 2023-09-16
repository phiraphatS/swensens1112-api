// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    length: 255,
  })
  name: string | null;

  @Column("varchar", {
    name: "detail",
    nullable: true,
  })
  detail: string | null;

  @Column("integer", { name: "price" })
  price: number;

  @Column("boolean", { name: "is_active", default: () => true })
  is_active: number;

  @Column("boolean", { name: "is_delete", default: () => false })
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