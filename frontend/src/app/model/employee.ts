import { Sale } from "./sale";

export class Employee {
	id!: number;
	firstName!: string;
	lastName!: string;
	role!: string;
	sales!: Sale[];
}