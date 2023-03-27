import { createRouter, createWebHistory /*, RouteRecordRaw */} from 'vue-router'
import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'

//const routes: Array<RouteRecordRaw> = [
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		}
	]
})
/*
const router = createRouter({
  history: createWebHistory(),
  routes
})
*/
export default router
