export interface GetUser {
    id: number
    name: string
    email: string
    telphone: string
    coordinates: number[]
}

export interface PostUser {
    name: string
    email: string
    telphone: string
    coordinates: number[]
}