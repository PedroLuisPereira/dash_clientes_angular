import { Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

export const routes: Routes = [
    { path: '', component: ClientComponent },
    { path: 'facturas/:id', component: InvoiceComponent },
    //{ path: '**',  component:NofoudComponent }
];