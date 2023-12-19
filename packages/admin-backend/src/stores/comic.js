import {defineStore} from "pinia"

export const useComicStore = defineStore("comics",{
  state: () => ({
    selectedComic: null,
  }),
  actions: {
    selectComic(comic) {
      this.selectedComic = comic
    },
  }
})