import { Purchase } from "./purchase";

export class PurchaseItem {
	id!: number;
	productId!: number;
	purchaseId!: number;
	quantity!: number;
	purchase!: Purchase;
}