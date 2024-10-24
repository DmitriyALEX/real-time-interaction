export interface IButton {
    title: string
    image_link?: string
    alt?: string
    onClick: () => void
    onLoad?: () => void
    logoLoaded?: boolean
}
