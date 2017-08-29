import { Routes, RouterModule }  from '@angular/router';


import {LaBlog} from "./lablog.component";
import {BlogQuery} from "./components/blog/blog.component";
import {CategoryQuery} from "./components/category/category.component";
import {CategoryEdit} from "./components/category/categoryEdit.component";
import {BlogEdit} from "./components/blog/blogEdit.component";
import {BlogView} from "./components/blog/blogView.component";
import {BlogApply} from "./components/blog/blogApply.component";
import {BlogApproved} from "./components/blog/blogApproved.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaBlog,
    children: [
      { path: 'category', component: CategoryQuery },
      { path: 'categoryedit', component: CategoryEdit },
      { path: 'blog', component: BlogQuery },
      { path: 'blogedit', component: BlogEdit },
      { path: 'blogview', component: BlogView },
      { path: 'blogapply', component: BlogApply },
      { path: 'blogapproved', component: BlogApproved }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
