<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold text-blue-600">
        Twlight
      </div>
      <ul class="flex space-x-4">
        <li>
          <router-link to="/" class="text-gray-600 hover:text-blue-600">首页</router-link>
        </li>
        <li>
          <router-link
              to="/auth?mode=login"
              class="text-gray-600 hover:text-blue-600"
          >
            登录
          </router-link>
        </li>
        <li>
          <router-link
              to="/auth?mode=register"
              class="text-gray-600 hover:text-blue-600"
          >
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
