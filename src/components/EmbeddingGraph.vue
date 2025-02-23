<template>
  <div class="min-h-screen flex flex-col">
    <!-- 如果有 NavBar 可添加 -->
    <Navbar />
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Embedding Graph Visualization</h1>
      <!-- 图形容器 -->
      <div id="cy" style="width: 100%; height: 600px; border: 1px solid #ccc;"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cytoscape from 'cytoscape';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'EmbeddingGraph',
  components: { Navbar },
  data() {
    return {
      cy: null,
      graphData: null,
    }
  },
  mounted() {
    this.fetchGraphData();
  },
  methods: {
    fetchGraphData() {
      axios.get('/api/embeddingGraph')
          .then(response => {
            console.log("Graph API response:", response.data);  // 添加调试日志
            this.graphData = response.data;
            if (!this.graphData || !this.graphData.nodes) {
              console.error("Graph data format error:", this.graphData);
            }
            this.initializeCytoscape();
          })
          .catch(error => {
            console.error("Error fetching graph data:", error);
          });
    }
,
    initializeCytoscape() {
      const elements = [];

      // 处理节点
      this.graphData.nodes.forEach(node => {
        let label = '';
        if (node.labels.includes('User')) {
          // 假设 User 节点有一个属性叫 username
          label = node.properties.username || 'User';
        } else if (node.labels.includes('Resource')) {
          // 假设 Resource 节点有一个属性叫 title
          label = node.properties.title || 'Resource';
        }
        elements.push({
          data: {
            id: String(node.id),
            label: label
          }
        });
      });

      // 处理边数据
      this.graphData.relationships.forEach(rel => {
        // 将边的 weight 格式化为两位小数
        let weight = parseFloat(rel.properties.weight).toFixed(2);
        elements.push({
          data: {
            id: String(rel.id),
            source: String(rel.startNode),
            target: String(rel.endNode),
            weight: weight
          }
        });
      });


      this.cy = cytoscape({
        container: document.getElementById('cy'),
        elements: elements,
        style: [
          {
            selector: 'node',
            style: {
              'label': 'data(label)',
              'text-valign': 'center',
              'color': '#fff',
              'background-color': '#0074D9',
              'font-size': '10px',
              'width': '30px',
              'height': '30px'
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'label': 'data(weight)',         // 这里显示边的 weight 属性
              'font-size': '8px',
              'text-rotation': 'autorotate',
              'text-margin-x': '0px',
              'text-margin-y': '-5px',
              'color': '#333'
            }
          }
        ],
        layout: {
          name: 'cose', // 力导向布局
          animate: true,
          padding: 10
        }
      });

    }
  }
}
</script>

<style scoped>
/* 你可以在这里添加额外的样式 */
</style>
