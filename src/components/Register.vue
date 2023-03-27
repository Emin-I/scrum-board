<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="form-control">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required>
      </div>
      <div class="form-control">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div class="form-control">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required>
      </div>
      <div class="form-control">
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" v-model="form.confirmPassword" required>
      </div>
      <div class="form-control">
        <button type="submit" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          <span v-else>Register</span>
        </button>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { default as authService } from '../api/auth';

export default defineComponent({
  name: 'Register',
  setup() {
    const form = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    const loading = ref(false);
    const error = ref('');

    const router = useRouter();

    const registerHandler = async () => {
      loading.value = true;
      error.value = '';

      try {
        const response = await authService.register(form.value);
        localStorage.setItem('token', response.token);
        router.push('/');
      } catch (error) {
        console.error(error);
        error.value = 'Failed to register. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    return { form, loading, error, register: registerHandler };
  }
});
</script>

<style scoped>
.register-container {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background-color: #f5f5f5; /* Change the background color */
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border-radius: 0.25rem;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0069d9;
}
</style>
