import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes),
    //provideHttpClient()
    importProvidersFrom(HttpClientModule)
  ]
};


//import { provideAnimations } from '@angular/platform-browser/animations';
//import { provideToastr } from 'ngx-toastr';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(HttpClientModule),
//     provideAnimations(),
//     provideToastr({
//       timeOut: 5000,
//       positionClass: 'toast-top-center',
//       preventDuplicates: true,
//     }),
//   ],
// };
