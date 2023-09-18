// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class FilesUpload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('blob')
  file_blob: Buffer;

  @Column("varchar", {
    name: "file_raw_name",
    nullable: true,
    length: 255,
  })
  file_raw_name: string | null;
  
  @Column("integer", { name: "file_size" })
  file_size: number;

  @Column("varchar", {
    name: "file_mime_type",
    nullable: true,
    length: 255,
  })
  file_mime_type: string | null;

  @Column("varchar", {
    name: "file_ext",
    nullable: true,
    length: 255,
  })
  file_ext: string | null;

  @Column("varchar", {
    name: "file_desc",
    nullable: true,
    length: 255,
  })
  file_desc: string | null;

  @Column("varchar", {
    name: "file_type",
    nullable: true,
    length: 255,
  })
  file_type: string | null;

}