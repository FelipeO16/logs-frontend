import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}
interface UserRegisterPayloadInterface {
  full_name: string;
  email: string;
  password: string;
  token: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    name: ""
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch(`http://localhost:3333/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        const name = useCookie('name'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        name.value = data?.value?.user?.fullName
        this.authenticated = true; // set authenticated  state value to true
      }
    },
    async registerUser({ full_name, email, password, token }: UserRegisterPayloadInterface) {
      try{
        const { data, pending, status }: any = await useFetch('http://localhost:3333/register', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: {
            full_name,
            email,
            password,
            token,
          },
        });
        if (status.value == "error") {
          throw new Error(status.value);
        }
        this.loading = pending;
        return {success: true, data};
      } catch (error: any) {
        throw new Error(error);
      }
    },

    setFullName(name: string) {
      this.name = name;
    },

    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      const name = useCookie('name'); // useCookie new hook in nuxt 3
      name.value = null; // clear the token cookie
    },
  },
});