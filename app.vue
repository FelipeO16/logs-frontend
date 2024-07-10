<template>
  <div>
    <Button label="Check" icon="pi pi-check" />
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
import 'primeicons/primeicons.css'

const { data } = await useLazyFetch('https://668df8a1bf9912d4c92c5f5f.mockapi.io/api/v1/teste')
</script>
