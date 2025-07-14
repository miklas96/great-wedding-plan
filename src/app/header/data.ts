import { Navigation } from "../types";

export const navigationItems: Navigation[] = [
    {
        label: 'Strona Główna',
        url: '',
        icon: 'home'
    },
    {
        label: 'Kiedy?',
        url: '/when',
        icon: 'access_time'
    },
    {
        label: 'Gdzie?',
        url: '/where',
        icon: 'place'
    },
    {
        label: 'Jak?',
        url: '/how',
        icon: 'airplanemode_active'
    },
    {
        label: 'Dodatkowe info',
        url: '/additional',
        icon: 'control_point'
    },
    {
        label: 'Kontakt',
        url: '/contact',
        icon: 'contact_mail'
    },
    {
        label: 'Zdjęcia',
        url: '/photos',
        icon: 'photo_camera'
    }
];
