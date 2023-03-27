<template>
  <nav>
    <ul>
      <li :class="{ active: route.path === '/' }"><router-link to="/">Home</router-link></li>
      <li v-if="!isLoggedIn" :class="{ active: route.path === '/login' }"><router-link to="/login">Login</router-link></li>
      <li v-if="!isLoggedIn" :class="{ active: route.path === '/register' }"><router-link to="/register">Register</router-link></li>
      <li v-if="isLoggedIn"><button @click="logmeout"><span data-feather="log-out"></span> Logout</button></li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { default as authService } from "@/api/auth";
//import feather from "feather-icons";



export default defineComponent({
  name: "Nav",
  setup() {
    const route = useRoute();
    const { isLoggedIn, logout } = authService.useAuth();

	const logmeout = (event) => {
		// `this` inside methods points to the current active instance
		alert(`Hello ${this.name}!`)
		// `event` is the native DOM event
		if (event) {
		  alert(event.target.tagName)
		}
	  }
	  //feather.replace();

    return { route, isLoggedIn, logout, logmeout };
  },
});
</script>

<style scoped>
nav {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin: 0 1rem;
}

nav li.active {
  font-weight: bold;
}

nav a {
  color: #fff;
  text-decoration: none;
}

nav button {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}

nav button:hover {
  text-decoration: underline;
}
</style>
