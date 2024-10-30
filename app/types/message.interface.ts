export interface IMessage {
    id: string
    userId: string
    fromUserId: string
    toUserId: string
    message: string
    isRead: boolean
    date: string
}
