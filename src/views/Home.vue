<template>
  <div class="home">
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <div class="counter">
      <h2>Counter: {{ counter.count }}</h2>
      <h3>Double Count: {{ counter.doubleCount }}</h3>
      <button @click="counter.increment">
        Increment
      </button>
      <button @click="counter.decrement">
        Decrement
      </button>
    </div>

    <!-- MSW测试请求 -->
    <div class="msw-test">
      <h2>MSW测试请求</h2>
      <div class="buttons">
        <button :disabled="loading.get" @click="testGetRequest">
          {{ loading.get ? '请求中...' : '测试GET请求' }}
        </button>
        <button :disabled="loading.post" @click="testPostRequest">
          {{ loading.post ? '请求中...' : '测试POST请求' }}
        </button>
        <button :disabled="loading.report" @click="testUserReportList">
          {{ loading.report ? '请求中...' : '测试getUserReportList' }}
        </button>
      </div>

      <!-- GET请求结果 -->
      <div v-if="getResponse" class="response">
        <h3>GET请求结果:</h3>
        <pre>{{ JSON.stringify(getResponse, null, 2) }}</pre>
      </div>

      <!-- POST请求结果 -->
      <div v-if="postResponse" class="response">
        <h3>POST请求结果:</h3>
        <pre>{{ JSON.stringify(postResponse, null, 2) }}</pre>
      </div>

      <!-- getUserReportList请求结果 -->
      <div v-if="reportResponse" class="response">
        <h3>getUserReportList请求结果:</h3>
        <pre>{{ JSON.stringify(reportResponse, null, 2) }}</pre>
      </div>

      <!-- 错误信息 -->
      <div v-if="error" class="error">
        <h3>错误信息:</h3>
        <p>{{ error }}</p>
      </div>
    </div>

    <!-- 使用自动注册的组件 -->
    <TestComponent />
    <router-link to="/about">
      Go to About
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getUserReportList } from '../api/about';
import { testGet, testPost } from '../api/test';
import { useCounterStore } from '../stores/counter';

const counter = useCounterStore();

// 状态管理
const getResponse = ref(null);
const postResponse = ref(null);
const reportResponse = ref(null);
const error = ref(null);
const loading = ref({ get: false, post: false, report: false });

// 测试GET请求
async function testGetRequest() {
  loading.value.get = true;
  error.value = null;
  try {
    const response = await testGet();
    getResponse.value = response;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value.get = false;
  }
}

// 测试POST请求
async function testPostRequest() {
  loading.value.post = true;
  error.value = null;
  try {
    const response = await testPost({
      name: '测试POST数据',
      value: 456,
      timestamp: new Date().toISOString(),
    });
    postResponse.value = response;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value.post = false;
  }
}

// 测试getUserReportList API
async function testUserReportList() {
  loading.value.report = true;
  error.value = null;
  try {
    const response = await getUserReportList({
      page: 1,
      pageSize: 10,
    });
    reportResponse.value = response;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value.report = false;
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.counter {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.msw-test {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.buttons {
  margin: 10px 0;
}

button {
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.response {
  margin: 10px 0;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  overflow-x: auto;
}

.error {
  margin: 10px 0;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
}

pre {
  margin: 0;
  font-family: monospace;
  white-space: pre-wrap;
}
</style>
