import { defineStore } from 'pinia'

export const useMyLogStore = defineStore('logs',{
  state: () => ({
    authenticated: false,
    loading: false,
    logs: [],
  }),
  actions: {
    async getLogs() {
      const { logs } = await useFetchData("http://89.213.41.215:3333/logs", "GET");
      this.logs = logs;
    },
  },
});
