import {Document, Types} from "mongoose";
import {IProduct} from "@/types/IProduct";

export interface IOrder extends Document {
  products: Array<{
    product: IProduct;
    quantity: number;
  }>;
  total: number;
  deliveryMethod: 'pickup' | 'courier' | 'post';
  postalService?: 'nova_poshta' | 'ukrposhta' | 'meest';
  phoneNumber: string
  recipientName: string;
  recipientSurname: string;
  recipientCity: string;
  recipientStreet?: string;
  recipientHouse?: string;
  recipientApartment?: string;
  recipientPostalCode?: string;
  recipientNovaPoshtaBranch?: string;
  recipientMeestBranch?: string;
  status: 'pending' | 'processed' | 'shipped' | 'delivered' | 'canceled';
}

export interface OrderState{
  productsToOrder:{product: IProduct, quantity: number}[]
  orderList: IOrder[]
}

export interface IOrderToCreate {
  products: Array<{
    product: IProduct;
    quantity: number;
  }>;
  total: number;
  deliveryMethod: 'pickup' | 'courier' | 'post';
  postalService?: 'nova_poshta' | 'ukrposhta' | 'meest';
  phoneNumber: string
  recipientName: string;
  recipientSurname: string;
  recipientCity: string;
  recipientStreet?: string;
  recipientHouse?: string;
  recipientApartment?: string;
  recipientPostalCode?: string;
  recipientNovaPoshtaBranch?: string;
  recipientMeestBranch?: string;
}