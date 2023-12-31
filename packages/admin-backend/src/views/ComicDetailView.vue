<script>
import {onMounted, ref} from "vue"
import {useRouter, useRoute} from "vue-router"
import {useComicStore} from "@/stores/comic"
import {TheNavigation, TheButton, TheIcon, TheModal} from "ui"
import {http, comicConstants, showMsg, msg, BASE_URL} from "common"

const {statuses, tags} = comicConstants

export default {
  name: "ComicDetailView",
  components: {TheNavigation, TheButton, TheIcon, TheModal},

  setup() {
    const route = useRoute()
    const router = useRouter()
    const comicStore = useComicStore()
    const id = route.params.id

    const selectedComic = ref(null)
    const addComicImageInput = ref()
    const bulkAddComicImageInput = ref()
    const imageUrls = ref([])
    const images = ref([])
    const formData = new FormData()

    const comicName = ref('')
    const comicAuthor = ref('')
    const comicStatus = ref('')
    const comicDescription = ref('')
    const comicTags = ref([])

    const selectedChapter = ref(1)
    const selectedPage = ref(1)

    onMounted(async () => {
        try {
          const response = await http.getComic(id)
          comicStore.selectComic(response.data)
          selectedComic.value = response.data
          selectedChapter.value = response.data.coverImage.chapter
          selectedPage.value = response.data.coverImage.page
        } catch (error) {

        }
    })
    const selectCoverImage = async (chapter, page) => {
      selectedChapter.value = chapter
      selectedPage.value = page
    }

    const setCoverImage = async () => {
      const response = await http.putComicCoverImage({
        id,
        chapter: selectedChapter.value,
        page: selectedPage.value
      })
      if (response.code === 200) {
        document.getElementById('coverImage').close()
        showMsg({
          messageType: 'success',
          msg: msg["SET_COMIC_COVER_SUCCESS"],
          popupType: 'toast'
        })
        setTimeout(() => {
          router.go(0)
        }, 1000)
        return
      }
      document.getElementById('coverImage').close()
      showMsg({
        messageType: 'error',
        msg: msg["UPDATE_COMIC_FAIL"],
        popupType: 'alert'
      })
    }

    const modifyComic = async (field, newVal) => {
      try {
        const response = await http.patchComic({
          id,
          field,
          newVal
        })
        console.log(response)
        if (response.code === 200) {
        document.getElementById(field).close()
        showMsg({
          messageType: 'success',
          msg: msg["UPDATE_COMIC_SUCCESS"],
          popupType: 'toast'
        })
        setTimeout(() => {
          router.go(0)
        }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const addComicImage = (e) => {
      const image = e.target.files[0]
      if (image) {
        images.value.push(image)
        const url = URL.createObjectURL(image)
        imageUrls.value.push(url)
        e.target.value = ''
      }
    }

    const bulkAddComicImage = (e) => {
      const images = e.target.files
      if (images) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i]
          images.value.push(image)
          const url = URL.createObjectURL(image)
          imageUrls.value.push(url)
        }
        e.target.value = ''
      }
    }

    const removeComicImage = (index) => {
      imageUrls.value.splice(index, 1)
      images.value.splice(index, 1)
    }

    const createChapter= async () => {
      try {
        images.value.forEach(image => {
          formData.append('images', image)
        })
        const response = await http.postComicChapter({
          id,
          chapter: selectedComic.value.chapters + 1,
          formData
        })
        if (response.code === 200) {
          document.getElementById('newChapter').close()
          showMsg({
            messageType: 'success',
            msg: msg["CREATE_COMIC_CHAPTER_SUCCESS"],
            popupType: 'toast'
          })
          setTimeout(() => {
            router.go(0)
          }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const viewChapter = async (chapter) => {
      try {
        const response = await http.getComicChapter(route.params.id, chapter)
        if (response.code === 200) {
          imageUrls.value = Array.from({length: response.data.pages}, (v, k) => `${BASE_URL}/${route.params.id}/${chapter}/${k + 1}.webp`)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const removeChapter = async () => {

    }

    return {
      BASE_URL,
      statuses,
      tags,
      goBack: () => router.go(-1),
      selectedComic,
      imageUrls,

      addComicImage,
      bulkAddComicImage,
      removeComicImage,
      viewChapter,
      removeChapter,
      selectCoverImage,

      modifyComic,
      createChapter,
      setCoverImage,

      addComicImageInput,
      bulkAddComicImageInput,

      comicName,
      comicAuthor,
      comicStatus,
      comicDescription,
      comicTags,

      selectedChapter,
      selectedPage,
    }
  },
}
</script>

<template>
  <main>
    <TheNavigation class="z-50">
      <template #left>
        <div
            class="text-white btn btn-ghost tracking-wider font-medium text-lg px-4"
            @click="goBack"
        >
          <span class="text-xl">&lt;</span>Back
        </div>

      </template>
    </TheNavigation>
    <div class="absolute top-20 w-full px-4" v-if="selectedComic">
      <div class="navbar min-h-0 max-w-4xl w-full mx-auto bg-base-200 rounded-lg flex-col space-y-4 px-6">
        <div class="w-full pl-4">
          <span class="mr-auto text-lg 2xl:text-xl">名字</span>
          <span class="text-lg mx-auto">{{selectedComic.name}}</span>
          <TheButton type="ghost" size="sm" class="bg-base-300 ml-auto" onclick="document.getElementById('name').showModal()">
            <TheIcon type="pencil" size="lg" />
          </TheButton>
          <TheModal id="name">
            <input type="text" class="input input-info mx-auto block" v-model="comicName">
            <form method="dialog">
              <TheButton type="info" class="block mx-auto mt-4" @click="modifyComic('name', comicName)">确定</TheButton>
            </form>
          </TheModal>
        </div>
        <div class="divider divider-primary"></div>
        <div class="w-full pl-4">
          <span class="mr-auto text-lg 2xl:text-xl">作者</span>
          <span class="text-lg mx-auto">{{selectedComic.author}}</span>
          <TheButton type="ghost" size="sm" class="bg-base-300 ml-auto" onclick="author.showModal()">
            <TheIcon type="pencil" size="lg" />
          </TheButton>
          <TheModal id="author">
            <input type="text" class="input input-info mx-auto block" v-model="comicAuthor">
            <form method="dialog">
              <TheButton type="info" class="block mx-auto mt-4" @click="modifyComic('author', comicAuthor)">确定</TheButton>
            </form>
          </TheModal>
        </div>
        <div class="divider divider-primary"></div>
        <div class=" w-full pl-4">
          <span class="mr-auto text-lg 2xl:text-xl">状态</span>
          <span class="text-lg mx-auto">{{statuses.find(status => status.value === selectedComic.status).label}}</span>
          <TheButton type="ghost" size="sm" class="bg-base-300 ml-auto" onclick="document.getElementById('status').showModal()">
            <TheIcon type="pencil" size="lg" />
          </TheButton>
          <TheModal id="status">
            <select class="select select-bordered block mx-auto" required v-model="comicStatus">
              <option disabled selected value="">状态</option>
              <template v-for="status in statuses">
                <option :value="status.value">
                  {{status.label}}
                </option>
              </template>
            </select>
            <form method="dialog">
              <TheButton type="info" class="block mx-auto mt-4" @click="modifyComic('status', comicStatus)">确定</TheButton>
            </form>
          </TheModal>
        </div>
        <div class="divider divider-primary"></div>
        <div class="w-full pl-4">
          <span class="mr-auto text-lg 2xl:text-xl">简介</span>
          <span class="text-sm mx-auto text-center">{{selectedComic.description}}</span>
          <TheButton type="ghost" size="sm" class="bg-base-300 ml-auto" onclick="description.showModal()">
            <TheIcon type="pencil" size="lg" />
          </TheButton>
          <TheModal id="description">
            <textarea class="textarea textarea-primary mx-auto block" rows="3" v-model="comicDescription">

            </textarea>
            <form method="dialog">
              <TheButton type="info" class=" block mx-auto mt-4" @click="modifyComic('description', comicDescription)">确定</TheButton>
            </form>
          </TheModal>
        </div>
        <div class="divider divider-primary"></div>
<!--        标签-->
        <div class="w-full pl-4">
          <span class="mr-auto text-lg 2xl:text-xl">标签</span>
          <template v-for="tag in selectedComic.tags">
            <TheButton type="ghost" class="mx-auto bg-base-300">{{tag}}</TheButton>
          </template>
          <TheButton type="ghost" size="sm" class="bg-base-300 ml-auto" onclick="document.getElementById('tags').showModal()">
            <TheIcon type="pencil" size="lg" />
          </TheButton>
          <TheModal id="tags">
            <div class="grid grid-cols-3 gap-2">
              <template v-for="tag in tags" :key="tag">
                <input type="checkbox" :id="tag" :value="tag" v-model="comicTags" class="hidden" @change="()=>console.log(comicTags)">
                <label :for="tag" class="btn checked">{{tag}}</label>
              </template>
            </div>
            <form method="dialog">
              <TheButton type="info" class=" block mx-auto mt-4" @click="modifyComic('tags', comicTags)">确定</TheButton>
            </form>
          </TheModal>
        </div>
<!--        -->
        <div class="divider divider-primary"></div>
        <div v-if="selectedComic.coverImage" class="w-full pl-4">
          <span class="mr-auto text-lg 2xl:text-xl whitespace-nowrap">封面</span>
          <div class="px-8 max-w-screen-xs">
            <img  class="rounded-xl" :src="`${BASE_URL}/${selectedComic._id}/${selectedComic.coverImage.chapter}/${selectedComic.coverImage.page}.webp`" alt="">
          </div>
          <TheButton type="ghost" size="sm" class="bg-base-300 ml-auto" onclick="coverImage.showModal()">
            <TheIcon type="pencil" size="lg" />
          </TheButton>
          <TheModal id="coverImage">
            <div class="w-full grid grid-cols-3 gap-4">
              <template v-for="chapter in selectedComic.chapters" :key="chapter">
                <TheButton type="ghost" class="bg-primary-content" onclick="document.getElementById('selectCoverImage').showModal()" @click="viewChapter(chapter)">{{chapter}}</TheButton>
                <TheModal id="selectCoverImage">
                  <div class="w-full mt-4 px-4 grid grid-cols-3 gap-4">
                    <div v-for="(image, index) in imageUrls" :key="index" class="relative rounded-lg">
                     <div v-if="selectedChapter === chapter && selectedPage === index + 1" class="bookmark border-[20px] -top-2 -left-2">
                       <p class="text-xs -left-4 -top-4">封面</p>
                     </div>
                      <img :src="image" alt="" class="object-cover object-center rounded-lg" @click="selectCoverImage(chapter, index + 1)">
                    </div>
                  </div>
                  <form method="dialog">
                    <TheButton type="info" class=" block mx-auto mt-4" @click="setCoverImage">确定</TheButton>
                  </form>
                </TheModal>
              </template>
            </div>
          </TheModal>
        </div>
        <div class="divider divider-primary"></div>
        <div class="w-full pl-4">
          <span class="mr-auto text-lg 2xl:text-xl">章节数</span>
          <span class="text-xl mx-auto">
            {{selectedComic.chapters}}
          </span>
          <TheButton type="ghost" size="sm" class="bg-base-300 ml-auto" onclick="chapters.showModal()">
            <TheIcon type="eye" size="lg" />
          </TheButton>
          <TheModal id="chapters">
              <div class="w-full grid grid-cols-3 gap-4">
                <template v-for="i in selectedComic.chapters" :key="i">
                  <TheButton type="ghost" class="bg-primary-content" onclick="document.getElementById('viewChapter').showModal()" @click="viewChapter(i)">{{i}}</TheButton>
                </template>
                <TheModal id="viewChapter">
                  <div class="w-full mt-4 px-4 grid grid-cols-3 gap-4">
                    <div v-for="(image, index) in imageUrls" :key="index" class="relative rounded-lg">
                      <TheButton type="error" shape="circle" class="absolute sm:w-6 sm:h-6 -right-1 -top-1" @click="removeComicImage(index)">
                        <TheIcon type="xmark" size="sm" class="text-white"/>
                      </TheButton>
                      <img :src="image" alt="" class="object-cover object-center rounded-lg">
                    </div>
                  </div>
                </TheModal>
              </div>
              <div v-if="!selectedComic.chapters" class="flex items-center place-items-center px-4">
                <span  class="text-lg ">当前无章节</span>
                <TheButton type="info" size="md" shape="circle" class="ml-auto" onclick="document.getElementById('newChapter').showModal()">
                  <TheIcon type="plus" size="xl" class="text-white"/>
                </TheButton>
              </div>
              <TheModal id="newChapter">
                  <h1 class="text-center text-lg">第{{selectedComic.chapters + 1}}章</h1>
                  <div class="w-full mt-4 px-4 grid grid-cols-3 gap-4">
                    <div v-for="(image, index) in imageUrls" :key="index" class="relative rounded-lg">
                      <TheButton type="error" shape="circle" class="absolute sm:w-6 sm:h-6 -right-1 -top-1" @click="removeComicImage(index)">
                        <TheIcon type="xmark" size="sm" class="text-white"/>
                      </TheButton>
                      <img :src="image" alt="" class="object-cover object-center rounded-lg">
                    </div>
                    <div class="text-center aspect-3/4 rounded-lg bg-base-300 flex justify-center items-center">
                      <TheButton type="ghost" size="md" shape="circle" class="z-10" @click="addComicImageInput.click()">
                        <TheIcon type="plus" size="xl" class="text-white"/>
                      </TheButton>
                      <input type="file" class="absolute hidden" @change="addComicImage" ref="addComicImageInput">
                    </div>
                    <div class="text-center aspect-3/4 rounded-lg bg-base-300 flex justify-center items-center">
                      <TheButton type="ghost" size="md" shape="circle" class="z-10" @click="bulkAddComicImageInput.click()">
                        <TheIcon type="folder-plus" size="xl" class="text-white"/>
                      </TheButton>
                      <input type="file" multiple class="absolute hidden" @change="bulkAddComicImage" ref="bulkAddComicImageInput">
                    </div>
                  </div>
                  <div class="flex justify-center">
                    <TheButton type="primary" class="relative mt-4" @click="createChapter">上传</TheButton>
                  </div>
              </TheModal>
          </TheModal>
        </div>
      </div>
      <div class="max-w-xl w-full flex justify-evenly mt-6 mx-auto">
        <TheButton type="success">
          存儲
        </TheButton>
        <TheButton type="error" @click="removeChapter">
          刪除
        </TheButton>
      </div>
    </div>
  </main>
</template>