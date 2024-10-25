import { ICurrentUser } from './userAuth.interface'

export interface IPublicProfile {
    status: string
    checkUser: ICurrentUser
    checkedUsername: string
}
