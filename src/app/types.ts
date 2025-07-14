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

export type AddInfo = {
    place: string;
    info: AddInfoMessages[];
}

type AddInfoMessages = {
    message: string;
    details?: AddInfoDetails[];
}

type AddInfoDetails = {
    message: string;
    url: string;
}