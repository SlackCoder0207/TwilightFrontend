<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">热门推荐</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
          v-for="resource in resources"
          :key="resource.resourceId"
          class="bg-white/30 backdrop-blur-md shadow rounded p-4 cursor-pointer hover:scale-105 transition-transform"
          @click="goToResourceDetail(resource.resourceId)"
      >
        <h3 class="text-xl font-semibold mb-2">{{ resource.title }}</h3>
        <p class="mb-2">{{ resource.description }}</p>
        <p class="text-blue-500">交互数：{{ resource.interactions }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PopularResources',
  data() {
    return {
      resources: []
    };
  },
  mounted() {
    this.fetchPopularResources();
  },
  methods: {
    fetchPopularResources() {
      axios.get('/api/recommend/popular')
          .then(response => {
            console.log("Popular resources:", response.data);
            this.resources = response.data.data;
          })
          .catch(error => {
            console.error("Error fetching popular resources:", error);
          });
    },
    goToResourceDetail(resourceId) {
      this.$router.push(`/resDetail/${resourceId}`);
    }
  }
};
</script>

<style scoped>
/* 样式保持不变 */
</style>
