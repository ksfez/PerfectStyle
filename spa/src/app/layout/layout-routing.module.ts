import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared'; 
import { RoleGuard } from '../shared'; 

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'login', loadChildren: './login/login.module#LoginModule'},
			{ path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard]},
            { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
            { path: 'shoesList', loadChildren: './shoesList/shoesList.module#ShoesListModule' },
			{ path: 'topsList', loadChildren: './tables/topsList.module#TopsListModule'},
            { path: 'casualsList', loadChildren: './casualsList/casualsList.module#CasualsListModule'},
            { path: 'workersList', loadChildren: './workersList/workersList.module#WorkersListModule'},
            { path: 'cocktailsList', loadChildren: './cocktailsList/cocktailsList.module#CocktailsListModule'},
            { path: 'accessoriesList', loadChildren: './accessoriesList/accessoriesList.module#AccessoriesListModule' },
            { path: 'myWhishlist', loadChildren: './whishlist/stores.module#StoresModule' },
            { path: 'stores', loadChildren: './stores/stores.module#StoresModule' },
            { path: 'usersList', loadChildren: './usersList/usersList.module#UsersListModule', canActivate: [RoleGuard]},
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'forgotPassword', loadChildren: './forgotPassword/forgotPassword.module#ForgotPasswordModule' },
            { path: 'chat', loadChildren: './chat/chat.module#ChatModule' },
			{ path: 'salesList', loadChildren: './salesList/salesList.module#SalesListModule', canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
