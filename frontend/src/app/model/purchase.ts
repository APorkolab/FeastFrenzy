import { PurchaseItem } from "./purchase-item";

export class Purchase {
	id!: number;
	date!: Date;
	closed!: boolean;
	purchaseItems!: PurchaseItem[];
	employeeId!: number;
	total!: number;
}