<template>
  <span class="fileinput-button">
    <slot>上传</slot>
    <input
      class="pointer"
      type="file"
      :multiple="multiple"
      :accept="accept"
      @change="choose_file"
    />
  </span>
</template>

<script>
export default {
  props: {
    multiple: {
      default: false
    },
    accept: {
      default: "image/png,image/jpg,image/jpeg"
    }
  },
  methods: {
    choose_file() {
      if(event.target.files.length!=0) this.$emit("choose-file", event);
    }
  }
};
</script>
<style lang="scss" scoped>
.fileinput-button {
  position: relative;
  display: inline-block;
  input {
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
}
</style>