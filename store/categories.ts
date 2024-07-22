import { defineStore } from 'pinia'
import type { Categories } from '@/interfaces/categories';

export const useMyCategoriesStore = defineStore('categories',{
  state: () => ({
    authenticated: false,
    loading: false,
    categories: [],
  }),
  actions: {
    async getCategories() {
      const { categories } = await useFetchData("http://89.213.41.215:3333/categories", "GET");
      this.categories = categories;
    },
  },
});
