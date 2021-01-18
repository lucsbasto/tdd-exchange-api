import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, Unique, UpdateDateColumn } from "typeorm";
import {IsNotEmpty, IsNumber, Length} from 'class-validator'
import { Type } from "class-transformer";
@Entity()
@Unique(['currency'])
export class Currency {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @Length(3, 3)
  @IsNotEmpty()
  currency: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  value: number;

  @CreateDateColumn({type: 'timestamp with local time zone'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp with local time zone'})
  updatedAt: Date;
}
