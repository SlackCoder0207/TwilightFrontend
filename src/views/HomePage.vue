<template>
  <div class="min-h-screen flex flex-col">
    <!-- 导航栏 -->
    <Navbar />

    <!-- Banner 部分 -->
    <section class="relative h-96 bg-cover bg-center" style="background-image: url('@/assets/banner.jpg')">
      <!-- 半透明遮罩 -->
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-6">Twlight</h1>
        <p class="text-xl mb-8">智能推荐最适合你的学习资源，助你轻松掌握新技能。</p>
        <!-- 搜索栏：点击输入框后弹出搜索弹窗 -->
        <div class="max-w-md mx-auto flex">
          <input
              type="text"
              placeholder="搜索学习资源..."
              class="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              @click="openSearchModal"
              readonly
          />
          <button class="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none">
            搜索
          </button>
        </div>
      </div>
    </section>

    <!-- 搜索弹窗 -->
    <div v-if="showSearchModal" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- 弹窗背景遮罩 -->
      <div class="absolute inset-0 bg-black opacity-50" @click="closeSearchModal"></div>
      <div class="relative bg-white rounded-lg p-6 w-11/12 max-w-md z-10">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">搜索条件</h3>
          <button class="text-gray-600 hover:text-gray-800" @click="closeSearchModal">×</button>
        </div>
        <div>
          <p class="mb-2">请选择学科：</p>
          <div class="flex flex-wrap gap-2">
            <span
                v-for="subject in subjects"
                :key="subject"
                @click="toggleSubject(subject)"
                :class="{'bg-blue-600 text-white': selectedSubjects.includes(subject), 'bg-gray-200 text-gray-800': !selectedSubjects.includes(subject)}"
                class="cursor-pointer px-3 py-1 rounded-full transition-colors">
              {{ subject }}
            </span>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" @click="applySearch">
            应用
          </button>
        </div>
      </div>
    </div>

    <!-- 热门推荐资源列表 -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- 热门推荐标题采用动态文字颜色 -->
        <h2 class="text-3xl font-bold mb-8" :style="{ color: hotTextColor }">热门推荐</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
              v-for="resource in resources"
              :key="resource.id"
              class="bg-white/30 backdrop-blur-md shadow rounded-lg overflow-hidden transition transform duration-300 hover:scale-105"
          >
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2" :style="{ color: hotTextColor }">{{ resource.title }}</h3>
              <p class="mb-4" :style="{ color: hotTextColor }">{{ resource.description }}</p>
              <a :href="resource.url" class="hover:underline" :style="{ color: hotTextColor }">了解更多</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-gray-300 py-6">
      <div class="container mx-auto px-4 text-center">
        © 2025 Twlight. 保留所有权利.
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import ColorThief from 'colorthief'

export default {
  name: 'HomePage',
  components: { Navbar },
  data() {
    return {
      hotTextColor: '#000', // 默认文字颜色为黑色
      showSearchModal: false,
      subjects: ['数学', '物理', '化学', '生物', '英语', '历史'],
      selectedSubjects: [],
      resources: [
        {
          id: 1,
          title: 'Java 基础教程',
          description: '从零开始学习 Java 编程，打好编程基础。',
          url: '#'
        },
        {
          id: 2,
          title: 'Spring Boot 实战',
          description: '深入了解 Spring Boot 的开发与部署技巧。',
          url: '#'
        },
        {
          id: 3,
          title: 'Neo4j 图数据库入门',
          description: '掌握图数据库的基本概念及应用场景。',
          url: '#'
        }
      ]
    }
  },
  mounted() {
    this.adjustHotTextColor()
  },
  methods: {
    adjustHotTextColor() {
      const img = new Image()
      // 使用 Banner 图片作为计算依据
      img.src = this.resolveImagePath('@/assets/banner.jpg')
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const colorThief = new ColorThief()
        const dominantColor = colorThief.getColor(img) // 返回 [R, G, B]
        // 计算亮度，判断使用白色或黑色文字
        const brightness = 0.299 * dominantColor[0] + 0.587 * dominantColor[1] + 0.114 * dominantColor[2]
        this.hotTextColor = brightness < 128 ? '#fff' : '#000'
      }
      img.onerror = (err) => {
        console.error('加载背景图片失败', err)
      }
    },
    resolveImagePath(path) {
      // 将 @ 替换为 /src，确保路径正确
      return path.replace('@', '/src')
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
      // 这里处理应用搜索条件的逻辑，例如调用 API 获取数据
      console.log('选择的学科：', this.selectedSubjects)
      this.closeSearchModal()
    }
  }
}
</script>

<style scoped>
/* 如需添加其他自定义样式，可在此添加 */
</style>
