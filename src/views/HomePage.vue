<template>
  <div class="min-h-screen flex flex-col">
    <!-- 导航栏 -->
    <Navbar />
    <!-- 主要内容区域 -->
    <main class="flex-grow">
      <!-- Banner 部分 -->
      <section class="relative h-96 bg-cover bg-center overflow-hidden"
               style="background-image: url('@/assets/background.jpg')">
        <!-- Banner背景遮罩动画 -->
        <transition name="bg-slide">
          <div v-if="bannerBackgroundVisible" class="absolute inset-0 bg-black opacity-50 z-0"></div>
        </transition>
        <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <!-- Banner标题动画 -->
          <transition name="fall">
            <h1 v-if="bannerTextVisible" class="text-4xl md:text-6xl font-extrabold mb-6">
              Twlight
            </h1>
          </transition>
          <!-- 随机句子动画 -->
          <transition name="fall">
            <p v-if="bannerSubTextVisible" class="text-xl mb-8">
              {{ bannerText }}
            </p>
          </transition>
          <!-- 搜索框动画 -->
          <transition name="fall">
            <div v-if="searchBoxVisible" class="max-w-md mx-auto flex">
              <input type="text"
                     placeholder="搜索学习资源..."
                     class="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     @click="openSearchModal"
                     readonly />
              <button class="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none cursor-pointer">
                搜索
              </button>
            </div>
          </transition>
        </div>
      </section>

      <!-- 搜索弹窗 -->
      <transition name="slide-down">
        <div v-if="showSearchModal" class="fixed inset-0 flex items-center justify-center z-50">
          <!-- 弹窗背景遮罩 -->
          <div class="absolute inset-0 bg-black opacity-50" @click="closeSearchModal"></div>
          <div class="relative bg-white rounded-lg p-6 w-11/12 max-w-md z-10">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold">搜索条件</h3>
              <!-- 关闭按钮：圆角正方形边框，只显示叉号 -->
              <button class="w-10 h-10 flex items-center justify-center border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                      @click="closeSearchModal">
                ×
              </button>
            </div>
            <div>
              <p class="mb-2">请选择学科：</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="subject in subjects" :key="subject"
                      @click="toggleSubject(subject)"
                      :class="{'bg-blue-600 text-white': selectedSubjects.includes(subject),
                               'bg-gray-200 text-gray-800': !selectedSubjects.includes(subject)}"
                      class="cursor-pointer px-3 py-1 rounded-full transition-colors">
                  {{ subject }}
                </span>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                      @click="applySearch">
                应用
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- 热门推荐部分由 PopularResources 组件展示 -->
      <PopularResources />
    </main>
    <!-- 页脚 -->
    <footer class="bg-gray-800 text-gray-300 py-6">
      <div class="container mx-auto px-4 text-center">
        © 2025 Twlight. All Rights Reserved.
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import PopularResources from '@/components/PopularResources.vue'
import ColorThief from 'colorthief'

export default {
  name: 'HomePage',
  components: { Navbar, PopularResources },
  data() {
    return {
      bannerSentences: [
        "Be brave. Be ambitious. Be humble.",
        "Dare to dream. Dare to act.",
        "Knowledge is power.",
        "Success is a journey, not a destination."
      ],
      bannerText: "",
      bannerBackgroundVisible: false,
      bannerTextVisible: false,
      bannerSubTextVisible: false,
      searchBoxVisible: false,
      showSearchModal: false,
      subjects: ["数学", "物理", "化学", "生物", "英语", "历史"],
      selectedSubjects: [],
      hotTextColor: "#000" // 默认文字颜色
    }
  },
  mounted() {
    // 随机选择一句话用于Banner显示
    this.bannerText = this.bannerSentences[Math.floor(Math.random() * this.bannerSentences.length)]
    // 按顺序触发动画（单位：毫秒）
    setTimeout(() => { this.bannerBackgroundVisible = true }, 100)
    setTimeout(() => { this.bannerTextVisible = true }, 600)
    setTimeout(() => { this.bannerSubTextVisible = true }, 1200)
    setTimeout(() => { this.searchBoxVisible = true }, 1800)
    this.adjustHotTextColor()
  },
  methods: {
    adjustHotTextColor() {
      const img = new Image()
      img.src = this.resolveImagePath('@/assets/background.jpg')
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const colorThief = new ColorThief()
        const dominantColor = colorThief.getColor(img)
        const brightness = 0.299 * dominantColor[0] + 0.587 * dominantColor[1] + 0.114 * dominantColor[2]
        this.hotTextColor = brightness < 128 ? "#fff" : "#000"
      }
      img.onerror = (err) => {
        console.error("加载背景图片失败", err)
      }
    },
    resolveImagePath(path) {
      return path.replace("@", "/src")
    },
    openSearchModal() {
      this.showSearchModal = true
    },
    closeSearchModal() {
      this.showSearchModal = false
    },
    toggleSubject(subject) {
      if (this.selectedSubjects.includes(subject)) {
        this.selectedSubjects = this.selectedSubjects.filter(s => s !== subject)
      } else {
        this.selectedSubjects.push(subject)
      }
    },
    applySearch() {
      console.log("选择的学科：", this.selectedSubjects)
      this.closeSearchModal()
    }
  }
}
</script>

<style scoped>
/* 落下/淡入动画 */
.fall-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fall-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fall-enter-to {
  opacity: 1;
  transform: translateY(0);
}
/* 背景遮罩滑入动画 */
.bg-slide-enter-active {
  transition: opacity 1s ease, transform 1s ease;
}
.bg-slide-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.bg-slide-enter-to {
  opacity: 0.5; /* 对应 bg-black opacity-50 */
  transform: translateY(0);
}
/* 搜索弹窗滑入动画 */
.slide-down-enter-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.slide-down-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>
