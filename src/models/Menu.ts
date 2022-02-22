import { IIceCream } from './Icecream';

export interface IMenu {
  id?: number;
  iceCream: IIceCream;
  inStock: boolean;
  quantity: number;
  price: number;
  description: string;
}
