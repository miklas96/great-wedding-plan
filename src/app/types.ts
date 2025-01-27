export type Navigation = {
    label: string;
    url: string;
    icon?: string
}

export type WeddingLocation = {
    iframeSrc: string;
    isVisible: boolean;
    name?: string;
    description?: string
    sleepMode: boolean;
    extendedDescription?: string;
}

export type Food = {
    name: string;
}