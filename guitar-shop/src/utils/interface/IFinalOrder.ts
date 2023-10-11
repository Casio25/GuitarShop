export interface IBackendOrder{
    date: string;
    items: Order[];
    totalPrice: number;
    userEmail: string;
    userPassword: string;


}
interface Order{
    itemId: number;
    price: number;
    quantity: number;
}