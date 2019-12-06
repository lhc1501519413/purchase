<template>
  <div id="app">
    <a-locale-provider :locale="zh_CN">
    <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      zh_CN:this.global.zh_CN,
    }
  }
}
</script>
