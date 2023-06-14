export interface Profile {
    name:string,
    email:string,
    image?:string,
}
export interface User {
    find(arg0: (data: any) => boolean): unknown;
    _id:any;
    name:string,
    email:string,
}