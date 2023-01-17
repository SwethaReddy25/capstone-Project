export enum Category{
    fruits='fruits', flowers='flowers' ,vegetables='vegetables',pulses='pulses',cereals='cereals',grains='grains',dairy='dairy'
}
export interface IProduct{

    id:number;
    code:string;
    name:string;
    category:Category;
    price:number;
    image:string;   
    desc:string;
    qty:number;
    discount:number;

}