import { PurchaseItem } from './purchase-item';

export class Product {
	id!: number;
	name!: string;
	price!: number;
	purchaseItems!: PurchaseItem[];
}