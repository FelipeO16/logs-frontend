import { useAuthStore } from '@/store/auth'; 

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const { setFullName } = useAuthStore();
  const token = useCookie('token'); // get token from cookies
  const name = useCookie('name'); // get token from cookies

  
  
  if (token.value) {
    // check if value exists
    setFullName(name.value); // set full name to state
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'login') {
    navigateTo('/login');
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  }
});