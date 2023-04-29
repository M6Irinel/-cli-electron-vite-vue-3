<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);

function send() {
  window.ipc.send("send", "Text from Vue");
}

let ipcText = ref("---");

window.ipc.on("rev-send", (e, data) => {
  ipcText.value = data;
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <div class="card-2">
    <button type="button" @click="send">Send to Electron for get version with IPC</button>
    <p>{{ ipcText }}</p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
