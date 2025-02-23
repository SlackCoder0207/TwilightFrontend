<template>
  <div
      class="relative min-h-screen bg-cover bg-center"
      style="background-image: url('@/assets/background.jpg')"
  >
    <!-- 背景遮罩 -->
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <!-- NavBar（始终在顶部，NavBar.vue 已设置较高 z-index） -->
    <div class="relative z-50">
      <Navbar />
    </div>
    <!-- 表单容器 -->
    <div class="relative z-10 flex items-center justify-center min-h-screen pt-16">
      <transition name="slide-down">
        <div
            v-if="authFormVisible"
            class="w-full max-w-md p-8 bg-white/30 backdrop-blur-md rounded-lg shadow-lg"
        >
          <h2 class="text-3xl font-bold text-center text-white mb-6">
            {{ isLogin ? '登录' : '注册' }}
          </h2>
          <form @submit.prevent="handleSubmit">
            <!-- 注册模式显示用户名 -->
            <div v-if="!isLogin" class="mb-4">
              <label class="block text-white mb-1">用户名</label>
              <input
                  type="text"
                  v-model="form.username"
                  required
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="请输入用户名"
              />
            </div>
            <div class="mb-4">
              <label class="block text-white mb-1">邮箱</label>
              <input
                  type="email"
                  v-model="form.email"
                  required
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="请输入邮箱"
              />
            </div>
            <div class="mb-4">
              <label class="block text-white mb-1">密码</label>
              <input
                  type="password"
                  v-model="form.password"
                  required
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="请输入密码"
              />
            </div>
            <!-- 注册模式显示确认密码 -->
            <div v-if="!isLogin" class="mb-4">
              <label class="block text-white mb-1">确认密码</label>
              <input
                  type="password"
                  v-model="form.confirmPassword"
                  required
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="再次输入密码"
              />
              <p v-if="passwordError" class="text-red-500 text-sm mt-1">
                {{ passwordError }}
              </p>
            </div>
            <!-- 注册模式显示用户类型 -->
            <div v-if="!isLogin" class="mb-4">
              <label class="block text-white mb-1">用户类型</label>
              <select
                  v-model="form.userType"
                  required
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="0">普通用户</option>
                <option value="1">管理员</option>
              </select>
            </div>
            <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
            >
              {{ isLogin ? '登录' : '注册' }}
            </button>
          </form>
          <div class="mt-4 text-center">
            <span class="text-white">
              {{ isLogin ? '没有账户？' : '已有账户？' }}
            </span>
            <button
                @click="toggleMode"
                class="ml-2 text-blue-300 hover:underline cursor-pointer"
            >
              {{ isLogin ? '注册' : '登录' }}
            </button>
          </div>
          <div class="mt-4 text-center">
            <router-link
                to="/"
                class="inline-block px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors cursor-pointer"
            >
              返回首页
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AuthPage',
  components: { Navbar },
  data() {
    return {
      isLogin: true,
      authFormVisible: false,
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '0'
      },
      passwordError: ''
    }
  },
  setup() {
    const route = useRoute();
    return { route }
  },
  mounted() {
    // 根据路由 query 参数设置初始模式
    if (this.route.query.mode === 'register') {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    // 显示表单动画（延时触发）
    setTimeout(() => {
      this.authFormVisible = true;
    }, 100);
  },
  methods: {
    toggleMode() {
      // 切换模式时先隐藏表单，然后再触发 slide-down 动画重新显示
      this.authFormVisible = false;
      setTimeout(() => {
        this.isLogin = !this.isLogin;
        this.resetForm();
        this.authFormVisible = true;
      }, 50);
    },
    resetForm() {
      this.form.username = '';
      this.form.email = '';
      this.form.password = '';
      this.form.confirmPassword = '';
      this.form.userType = '0';
      this.passwordError = '';
    },
    validatePassword() {
      const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
      if (!regex.test(this.form.password)) {
        this.passwordError = '密码必须包含至少一个大写字母、一个小写字母，长度8-16位';
        return false;
      }
      if (this.form.password !== this.form.confirmPassword) {
        this.passwordError = '两次输入的密码不一致';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    handleSubmit() {
      if (!this.isLogin && !this.validatePassword()) {
        return;
      }
      console.log('提交表单：', this.form, this.isLogin ? '登录' : '注册');
      // 根据需要调用登录或注册 API
    }
  }
}
</script>

<style scoped>
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
