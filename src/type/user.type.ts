 export interface User{
    name:string,
    email:string,
    password:string,
    provider:string,
    otp:number,
    otpExpiredAt:Date
    isVerified:boolean
    createdAt?:string
    updatedAt?:string

}