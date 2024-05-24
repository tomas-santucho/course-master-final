import EmptyContentPage from "./lib/EmptyContentPage.svelte";
import Login from "./lib/auth/Login.svelte";
import Register from "./lib/auth/Register.svelte";


const routes = [
    { path: "/", component: EmptyContentPage },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
];

export default routes;
