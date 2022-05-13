export default interface IUSER {
  
    name: string,
    age: number,
    tech: string,
    email: string,
    password: string,
    status:string,
    Role:string
}

export default interface IREQUEST {
    user: IUSER
    type: String
}



