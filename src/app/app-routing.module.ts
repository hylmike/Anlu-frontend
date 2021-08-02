import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './homepage/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'librarian',
    loadChildren: () => import('./librarian/librarian.module')
      .then(m => m.LibrarianModule)
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
