<template>
  <div class="w-screen h-screen flex justify-between items-center">
    <div class="rounded-3xl bg shadow-xl flex flex-col">
      <div class="flex flex-col items-center justify-center w-screen h-screen">
        <img width="300" src="https://media.discordapp.net/attachments/916002437620432917/1244307370507767948/LOGO1.png?ex=6699d9cb&is=6698884b&hm=c365cfcfd2688f0d8b5350fe4f707727803888354d17d25e3e3ed3a081da3192&=&format=webp&quality=lossless&width=628&height=628" alt="">
        <Card class=" w-2/3">
          <template #title>
            <h1 class="w-full flex justify-center text-4xl font-semibold">Sistema de Logs</h1>
          </template>
          <template #content>
            <div class="card">
              <div class="flex flex-col md:flex-row">
                  <div class="w-full md:w-5/12 flex flex-col items-center justify-center gap-6 py-8">
                      <div class="flex justify-center items-center gap-2">
                          <label class="w-1/4">E-mail</label>
                          <InputText id="email" v-model="loginData.email" type="text" class="w-2/4" />
                      </div>
                      <div class="flex justify-center items-center gap-2">
                          <label class="w-1/4">Password</label>
                          <InputText id="password" v-model="loginData.password" type="password" class="w-2/4" />
                      </div>
                      <Button label="Login" icon="pi pi-user" class="w-2/3 mx-auto" @click="handleLogin"></Button>
                  </div>
                  <div class="w-full md:w-2/12">
                      <Divider layout="vertical"><b>OR</b></Divider>
                      <!-- <Divider layout="horizontal" class="!flex md:!hidden" align="center"><b>OR</b></Divider> -->
                  </div>
                  <div class="w-full md:w-5/12 flex items-center justify-center py-8">
                      <Button label="Sign Up" icon="pi pi-user-plus" severity="success" class="w-40" @click="showModal = true"></Button>
                  </div>
              </div>
          </div>
          </template>
        </Card>
        <Dialog v-model:visible="showModal" modal header="Edit Profile" :style="{ width: '25rem' }">
          <template #header>
              <div class="inline-flex items-center justify-center gap-2">
                  <Avatar size="xlarge" image="https://media.discordapp.net/attachments/916002437620432917/1244307328728043540/GIF.gif?ex=6699d9c1&is=66988841&hm=d905a75005b2dcad8bdf2db70b1383f070401a9411689ba08b6489bcb7422edf&=" shape="circle" />
                  <span class="font-bold whitespace-nowrap">Deluxe RP</span>
              </div>
          </template>
          <span class="text-surface-500 dark:text-surface-400 block mb-8">Cadastre-se</span>
          <div class="flex items-center gap-4 mb-4">
              <label for="fullname" class="font-semibold w-24">Token</label>
              <InputText id="fullname" v-model="registerData.fullname" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-2">
              <label for="email" class="font-semibold w-24">Email</label>
              <InputText id="email" v-model="registerData.email" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-2">
              <label for="password" class="font-semibold w-24">Senha</label>
              <InputText type="password" v-model="registerData.password" id="password" class="flex-auto" autocomplete="off" />
          </div>
          <template #footer>
              <Button label="Cancel" text severity="secondary" @click="showModal = false" autofocus />
              <Button label="Save" outlined severity="secondary" @click="handleRegister" autofocus />
          </template>
        </Dialog>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
  const showModal = ref(false);

  const registerData = ref({
    fullname: '',
    email: '',
    password: ''
  } as {
    fullname: string;
    email: string;
    password: string;

  });
  const loginData = ref({
    email: '',
    password: ''
  } as {
    email: string;
    password: string;
  });

  

import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const router = useRouter();

const handleLogin = async () => {
  // router.push('/');
  await authenticateUser(loginData.value);
  if (authenticated) {
    router.push('/');
  }
};

const handleRegister = () => {
  // Implement registration logic here
  showModal.value = false
  console.log('Register', registerData.value);
};
</script>