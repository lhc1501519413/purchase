<template>
  <div class="lg-pic" v-show="key">
    <div class="mb-10">
      <a-icon type="undo" @click.stop="deg-=90"/>
      <a-icon type="minus-circle" @click.stop="minus"/>
      <a-icon type="plus-circle" @click.stop="plus"/>
      <a-icon type="redo" @click.stop="deg+=90"/>
      <a-icon type="close-circle" @click.stop="close"/>
    </div>
    <div class="img-container" @click.stop="">
      <img v-drag id="img" :src="imgUrl" alt="附件" :style="{width:width+'%',left:left+'%',top:top+'%',transform:'rotateZ('+deg+'deg)'}"/>
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
      width:50,
      left:25,
      top:0,
      deg:0
    }
  },
  computed:{
    key(){
      return !!this.imgUrl;
    }
  },
  methods:{
    minus(){
      if(this.width>50){
        this.width-=10;
        this.left+=5;
      }
    },
    plus(){
      if(this.width<100){
        this.width+=10;
        this.left-=5;
      }
    },
    close(){
      document.getElementById('img').style.left = '25%';
      document.getElementById('img').style.top = '0';
      document.getElementById('img').style.width = '50%';
      this.father.imgUrl = false;
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
  padding: 1%;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .img-container{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  img {
    position: absolute;
    min-width: 50%;
    max-width: 100%;
  }
  i.anticon{
    color: #fff;
    font-size: 37px;
    &:not(:first-child){
      @extend .ml-10;
    }
  }
}
</style>