import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { HowComponent } from './how/how.component';
import { WhenComponent } from './when/when.component';
import { WhereComponent } from './where/where.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'when',
        component: WhenComponent
    },
    {
        path: 'where',
        component: WhereComponent
    },
    {
        path: 'how',
        component: HowComponent
    },
    {
        path: 'additional',
        component: AdditionalInfoComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
];
