import { User } from 'firebase/auth'

interface IProviderData {
    providerId: string
    uid: string
    displayName: string
    email: string
    phoneNumber: string | null
    photoURL: string
}

interface IStsTokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
}

export interface IFirebaseUser extends User {
    uid: string
    email: string
    emailVerified: boolean
    displayName: string
    isAnonymous: boolean
    photoURL: string
    providerData: IProviderData[]
    stsTokenManager: IStsTokenManager
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string
}

//FOR CONTEXT
export interface IUseAuth {
    user: User | null
    accessToken: string | null
    fetchedData: IFetchedData | null
    setFetchedData: (value: IFetchedData | null) => void
    googleSignIn: () => Promise<void>
    logOut: () => Promise<void>
    loading: boolean
}

export interface ICurrentUser {
    id: string
    email: string
    fullName: string
    image: string
}

//username model
export interface ICheckedUsername {
    id: string
    userId: string
    username: string
}

//response from api
export interface IFetchedData {
    status: string
    checkUser: ICurrentUser
    checkedUsername: ICheckedUsername
}
