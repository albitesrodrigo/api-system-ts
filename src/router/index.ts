import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductForm from "@/views/ProductForm.vue";
import LoginView from "@/views/LoginView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "Inicio",
    component: HomeView,
  },
  {
    path: "/create-product",
    name: "CrearProducto",
    component: ProductForm,
  },
  {
    path: "/edit-product/:id",
    name: "EditarProducto",
    component: ProductForm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
