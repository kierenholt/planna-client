export interface JWT {
    iss: string,
    aud: string, 
    sub: string, 
    email: string, 
    email_verified: boolean, 
    nbf: number, 
    name: string, 
    picture: string,
    given_name: string
}