<template>
  <div class="home">
    <h1>Welcome, {{ user?.username }}!</h1>
    <button v-if="isLoggedIn" class="btn btn-primary" @click="handleLogout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { default as authService } from "../api/auth";

export default defineComponent({
  name: "Home",
  setup() {
    const handleLogout = async () => {
	  await authService.logout();
    };
	
	const isLoggedIn = () => authService.getCurrentUser() != null;

    return { handleLogout, isLoggedIn, user: {username: authService.getCurrentUser()} };
  },
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 6rem);
  background-color: #f8f9fa;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

button.btn {
  background-color: #007bff;
  color: #fff;
  border-radius: 0.25rem;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button.btn:hover {
  background-color: #0069d9;
}
</style>
