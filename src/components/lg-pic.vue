<template>
  <div class="lg-pic" v-show="key" @click="father.imgUrl = false">
    <div class="img-container">
      <img :src="imgUrl" alt="附件" @click.stop="change_size" :class="{bigSize:bigSize}"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgUrl: {
      type: [String,Boolean],
      required: true
    },
    father:{
      type:Object,
      required: true
    }
  },
  data(){
    return{
      bigSize:false
    }
  },
  computed:{
    key(){
      return !!this.imgUrl;
    }
  },
  methods:{
    change_size(){
      this.bigSize= !this.bigSize;
    }
  }
};
</script>
<style lang="scss" scoped>
.lg-pic {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  position: fixed;
  padding: 2%;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .img-container{
    width: 100%;
    height: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  img {
    margin: 0 auto;
    min-width: 50%;
    width: 50%;
    max-width: 100%;
  }
  .bigSize{
    width: 70%;
  }
}
</style>