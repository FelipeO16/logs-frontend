import { defineStore } from 'pinia'

export const useMyLogStore = defineStore('logs',{
  state: () => ({
    authenticated: false,
    loading: false,
    logs: [],
  }),
  actions: {
    async getLogs() {
      const { logs } = await useFetchData(`http://localhost:3333/logs`, "GET");
      this.logs = logs;
    },
    async filteredLogs(id: number, category: {name: string}) {
      const { logs } = await useFetchData(`http://localhost:3333/logs/${id}/${category.name}`, "GET");
      this.logs = logs;
    },
  },
});
