<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto flex items-center justify-between px-4 py-4">
      <!-- 左侧品牌文字，点击返回首页 -->
      <router-link to="/" class="text-2xl font-bold text-blue-600">
        Twilight
      </router-link>
      <!-- 右侧导航按钮，仅保留登录和注册 -->
      <ul class="flex space-x-4">
        <li>
          <router-link to="/auth?mode=login" class="text-gray-600 hover:text-blue-600">
            登录
          </router-link>
        </li>
        <li>
          <router-link to="/auth?mode=register" class="text-gray-600 hover:text-blue-600">
            注册
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
