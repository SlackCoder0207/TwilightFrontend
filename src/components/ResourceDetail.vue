<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow flex items-center justify-center">
      <div v-if="resource" class="bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-3xl font-bold">{{ resource.title }}</h1>
          <button @click="goBack" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            ← 返回
          </button>
        </div>
        <p class="text-gray-600 mb-2">发布者: {{ publisherUsername }}</p>
        <p class="text-gray-500 mb-4">分类: {{ resource.category }}</p>

        <!-- 资源展示 -->
        <div v-if="resource.type === 'video'">
          <video controls class="w-full rounded-lg">
            <source :src="resourceUrl" type="video/mp4" />
          </video>
        </div>
        <div v-else-if="resource.type === 'audio'">
          <audio controls class="w-full">
            <source :src="resourceUrl" type="audio/mp3" />
          </audio>
        </div>
        <div v-else-if="resource.type === 'post'">
          <div v-html="markdownContent" class="prose"></div>
        </div>
      </div>
    </main>
    <footer class="bg-gray-800 text-gray-300 py-6 text-center">
      © 2025 Twlight. All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { marked } from 'marked';
import axios from 'axios';

export default {
  name: 'ResourceDetail',
  components: { Navbar },
  data() {
    return {
      resource: null,
      publisherUsername: "加载中...",
      markdownContent: ''
    };
  },
  computed: {
    resourceUrl() {
      if (!this.resource || !this.resource.url) return "";
      return new URL(`/src/assets/${this.resource.url}`, import.meta.url).href;
    }
  },
  mounted() {
    this.fetchResource();
  },
  methods: {
    fetchResource() {
      const resourceId = this.$route.params.resourceId;
      axios.get(`/api/resource/resDetail/${resourceId}`)
          .then(response => {
            this.resource = response.data.data;
            if (this.resource.publisher) {
              this.fetchPublisherUsername(this.resource.publisher);
            }
            if (this.resource.type === "post") {
              this.loadMarkdown();
            }
          })
          .catch(error => {
            console.error("Error fetching resource:", error);
          });
    },
    fetchPublisherUsername(userId) {
      axios.get(`/api/user/${userId}`)
          .then(response => {
            this.publisherUsername = response.data.data.username || "未知用户";
            console.log(response)
          })
          .catch(error => {
            console.error("Error fetching username:", error);
            this.publisherUsername = "未知用户";
          });
    },
    loadMarkdown() {
      fetch(this.resourceUrl)
          .then(response => response.text())
          .then(text => {
            this.markdownContent = marked.parse(text);
          })
          .catch(error => {
            console.error("Error loading markdown:", error);
          });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.prose {
  max-width: 100%;
}
</style>
