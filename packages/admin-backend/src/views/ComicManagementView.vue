<script>
import { onMounted, ref, Transition } from 'vue'
import { RouterLink,useRouter } from 'vue-router'
import { TheButton, TheIcon, TheModal } from 'ui'
import { http, msg, comicConstants, AlertBox, showMsg } from 'common'

const { tags, statuses } = comicConstants

export default {
  name: 'ComicManagementView',
  components: { TheButton, TheIcon, TheModal, RouterLink, AlertBox, Transition },
  setup() {
    const router = useRouter()

    const name = ref('')
    const author = ref('')
    const selectedStatus = ref('')
    const selectedTags = ref([])
    const description = ref('')

    const comicsCount = ref(0)
    const unfilledComics = ref([])
    const foundComics = ref([])
    const unfilledComicsCount = ref(0)

    const messageShow = ref(false)
    const unfilledComicsShow = ref(false)

    const keyword = ref('')

    const uploadComic = async () => {
      const data = {
        name: name.value,
        author: author.value,
        status: selectedStatus.value,
        tags: selectedTags.value,
        description: description.value
      }
      for (const key in data) {
        if (key !== 'description' && !data[key]) {
          messageShow.value = true
          return
        }
      }
      const response = await http.postComic(data)
      if (response && response.code === 200) {
        document.getElementById('newComicModal').close()
        showMsg({
          msg: msg['CREATE_COMIC_SUCCESS'],
          messageType: "success",
          popupType: "toast"
        })
        setTimeout(() => {
          router.go(0)
        }, 1000)
      }
    }

    const viewUnfilledComicsHandler = () => {
      unfilledComicsShow.value = !unfilledComicsShow.value
      if (unfilledComics.value.length === 0) document.getElementById('noUnfilledComic').showModal()
    }

    const searchComic = async () => {
      if (keyword.value.trim() === '') return
      const response = await http.getSearch(keyword.value.trim())
      foundComics.value = response.data
    }

    onMounted(async () => {
      comicsCount.value = (await http.getComicsWithoutCache()).data.length
      unfilledComics.value = (await http.getComicsWithoutCache()).data.filter((comic) => comic.chapters === 0)
      unfilledComicsCount.value = unfilledComics.value.length
    })

    return {
      viewUnfilledComicsHandler,
      uploadComic,
      msg,
      comicsCount,
      unfilledComics,
      foundComics,
      unfilledComicsCount,
      statuses,
      tags,
      selectedStatus,
      selectedTags,
      name,
      author,
      description,
      messageShow,
      unfilledComicsShow,
      searchComic,
      keyword
    }
  }
}
</script>

<template>
  <main class="absolute top-20 w-full px-4">
    <div class="mx-auto mb-4 w-4/5 navbar bg-primary rounded-lg max-w-3xl">
      <h1 class="w-screen justify-center font-Noto font-medium text-xl text-white">漫画管理</h1>
    </div>
    <div class="mx-auto flex flex-col xl:grid xl:grid-cols-2 gap-2 max-w-3xl">
      <div class="mx-auto w-5/6 xl:w-full navbar bg-base-200 rounded-lg py-4 pl-6">
        <TheButton type="success" shape="square" class="mr-6 rounded">
          <TheIcon type="book" size="2xl" />
        </TheButton>
        <div class="flex flex-col">
          <span class="text-base text-primary opacity-60">总漫画数 </span>
          <span class="text-2xl">{{ comicsCount }}</span>
        </div>
      </div>
      <div class="mx-auto w-5/6 xl:w-full navbar bg-base-200 rounded-lg py-4 pl-6">
        <TheButton type="warning" shape="square" class="mr-6 rounded">
          <TheIcon type="book-bookmark" size="2xl" />
        </TheButton>
        <div class="flex flex-col">
          <span class="text-base text-primary opacity-60">未填充漫画数 </span>
          <span class="text-2xl">{{ unfilledComicsCount }}</span>
        </div>
        <TheButton
          type="ghost"
          size="md"
          shape="square"
          class="ml-auto bg-base-300"
          @click="viewUnfilledComicsHandler"
        >
          <TheIcon type="eye" size="lg" />
        </TheButton>
        <TheModal id="noUnfilledComic">
          <h1 class="text-lg text-center">当前无未填充漫画</h1>
        </TheModal>
      </div>
    </div>
    <div class="mt-6 px-4 flex items-center">
      <div class="mx-auto flex items-center gap-3">
        <input
          type="text"
          placeholder="请输入关键字"
          class="input input-primary mr-auto block"
          v-model="keyword"
        />
        <TheButton type="ghost" class="bg-secondary-content px-3 h-9" @click="searchComic">
          <span class="text-xs">搜索</span>
        </TheButton>
      </div>
    </div>
    <div class="w-full px-4 mt-4">
      <div
        class="bg-base-300/25 w-full py-4 box-border"
        v-for="comic in foundComics"
        :key="comic._id"
      >
        <RouterLink :to="{ name: 'comic-detail', params: { id: comic._id } }">
          <div class="mx-auto flex flex-col w-5/6 navbar btn bg-base-300 rounded-lg p-0">
            <h1 class="text-lg">{{ comic.name }}</h1>
            <h3>{{ comic.author }}</h3>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="w-full px-4 mt-4" v-show="unfilledComicsShow">
      <div
        class="bg-base-300/25 w-full py-4 box-border"
        v-for="comic in unfilledComics.slice(0, 5)"
        :key="comic._id"
      >
        <RouterLink :to="{ name: 'comic-detail', params: { id: comic._id } }">
          <div class="mx-auto flex flex-col w-5/6 navbar btn bg-base-300 rounded-lg p-0">
            <h1 class="text-lg">{{ comic.name }}</h1>
            <h3>{{ comic.author }}</h3>
          </div>
        </RouterLink>
      </div>
    </div>
    <!--  addButton  -->
    <TheButton
      class="fixed right-4 bottom-4 hover:shadow-2xl"
      type="info"
      shape="circle"
      size="lg"
      onclick="document.getElementById('newComicModal').showModal()"
    >
      <TheIcon type="plus" size="xl" />
    </TheButton>
    <!--    -->

    <!--  modal -->
    <TheModal id="newComicModal">
      <div class="card">
        <form class="card-body">
          <div class="form-control space-y-3">
            <input
              type="text"
              placeholder="漫画名字"
              class="input input-bordered"
              v-model="name"
              required
            />
            <input
              type="text"
              placeholder="作者"
              class="input input-bordered"
              v-model="author"
              required
            />
            <select class="select select-bordered" required v-model="selectedStatus">
              <option disabled selected value="">状态</option>
              <template v-for="status in statuses">
                <option :value="status.value">
                  {{ status.label }}
                </option>
              </template>
            </select>
            <div class="btn" onclick="document.getElementById('tags').showModal()">
              选择标签
              <TheModal id="tags">
                <div class="grid grid-cols-3 gap-2">
                  <template v-for="tag in tags" :key="tag">
                    <input
                      type="checkbox"
                      :id="tag"
                      :value="tag"
                      v-model="selectedTags"
                      class="hidden"
                      @change="() => console.log(selectedTags)"
                    />
                    <label :for="tag" class="btn checked">{{ tag }}</label>
                  </template>
                </div>
              </TheModal>
            </div>
            <div class="btn" onclick="document.getElementById('description').showModal() ">
              添加简介
              <TheModal id="description">
                <textarea rows="3" class="textarea textarea-primary" v-model="description" />
              </TheModal>
            </div>
          </div>
          <div class="form-control mt-6">
            <TheButton type="primary" @click.prevent="uploadComic">存储</TheButton>
          </div>
        </form>
      </div>
    </TheModal>
  </main>
</template>
