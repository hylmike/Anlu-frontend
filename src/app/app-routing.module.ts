import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'lib',
    loadChildren: () => import('./librarian/lib.module')
      .then(m => m.LibModule)
  },
  {
    path: '',
    redirectTo: '/reader',
    //component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    {
      enableTracing: true,
      preloadingStrategy: PreloadAllModules,
    }
  )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
