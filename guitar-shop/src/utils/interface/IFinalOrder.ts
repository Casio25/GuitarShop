export interface IBackendOrder{
    date: string;
    items: Order[];
    totalPrice: number;
    userEmail: string;
    userName: string;
    userPhoneNumber: string;


}
interface Order{
    id: number;
    price: number;
    quantity: number;
}