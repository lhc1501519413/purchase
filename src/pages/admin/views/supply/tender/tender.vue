<template>
  <div id="">
    投标
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    father:{
      type:[Object,Array],
      required:true
    }
  },
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  created() {
    this.father.selectedKeys=['tender'];
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>

</style>