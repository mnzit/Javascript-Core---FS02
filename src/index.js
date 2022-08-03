import { Select } from "./core/select";
import {LoginComponent} from "./components/login/login";
import {UserListComponent} from "./components/users/list";
import {UserDetailComponent} from "./components/users/detail";
import {UserCreateComponent} from "./components/users/create";
import {UserEditComponent} from "./components/users/edit";
import {RouterInstance} from "./core/router";

export const RENDER = Select("#render")
export const router = RouterInstance
    .setRender(RENDER)
    .register('login',  LoginComponent)
    .register('user-list',  UserListComponent)
    .register('user-detail',  UserDetailComponent)
    .register("user-create",  UserCreateComponent)
    .register('user-edit',  UserEditComponent)
    .register('logout',  LoginComponent)
    .onLoad(sessionStorage.getItem("token") != null ? UserListComponent : LoginComponent)
