<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-control">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div class="form-control">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required>
      </div>
      <div class="form-control">
        <button type="submit" :disabled="loading" v-on:click="loginHandler">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          <span v-else>Login</span>
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
/*
methods: {
  loginHandler(event) {
    // `this` inside methods points to the current active instance
    alert(`Hello ${this.name}!`)
    // `event` is the native DOM event
    if (event) {
      alert(event.target.tagName)
    }
  }
}
*/
export default defineComponent({
  name: 'Login',
  setup() {
    const form = ref({
      email: '',
      password: ''
    });
    const loading = ref(false);
    const error = ref('');

    const router = useRouter();

    const loginHandler = async () => {
      loading.value = true;
      error.value = '';

      try {
        const token = await authService.login(form.value.email, form.value.password);
        localStorage.setItem('token', token);
        router.push('/');
      } catch (error) {
        console.error(error);
        error.value = 'Invalid email or password.';
      } finally {
        loading.value = false;
      }
    };

    return { form, loading, error, login: loginHandler };
  }
});
</script>

<style>
  .login-container {
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

  input {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: #0077cc;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
</style>