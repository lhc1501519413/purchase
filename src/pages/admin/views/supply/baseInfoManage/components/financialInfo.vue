<template>
  <div id>财务信息</div>
</template>

<script>
export default {
  components: {},
  props: ["father"],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.father.activeKey = "financial_info";
    this.father.BreadcrumbTwo = "财务信息";
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>