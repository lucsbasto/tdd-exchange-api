import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['currency'])
export class Currency {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  currency: string;

  @Column()
  value: number;

  @CreateDateColumn({type: 'timestamp with local time zone'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp with local time zone'})
  updatedAt: Date;
}
