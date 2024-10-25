export interface IButton {
    title: string
    onClick: () => void
    image_link?: string
    alt?: string
    onLoad?: () => void
    logoLoaded?: boolean
}
