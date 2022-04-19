import { Select } from "./core/select";
import {Router} from "./core/router";
import {LoginComponent} from "./components/login/login";
import {UserListComponent} from "./components/users/list";
import {UserDetailComponent} from "./components/users/detail";
import {UserCreateComponent} from "./components/users/create";
import {UserEditComponent} from "./components/users/edit";

export const RENDER = Select("#render")
export const router = new Router(RENDER)
    .getInstance()
    .register('login',  LoginComponent)
    .register('user-list',  UserListComponent)
    .register('user-detail',  UserDetailComponent)
    .register("user-create",  UserCreateComponent)
    .register('user-edit',  UserEditComponent)
    .register('logout',  LoginComponent)
    .onLoad(sessionStorage.getItem("token") != null ? UserListComponent : LoginComponent)
