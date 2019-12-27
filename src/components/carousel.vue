<template>
  <a-carousel autoplay>
    <div><router-link to="/enter_step"><div class="bc_img_1"></div></router-link></div>
    <div><router-link to="/login"><div class="bc_img_2"></div></router-link></div>
  </a-carousel>
</template>
<script>
  export default {
      name:"carousel"
  };
</script>
<style scoped>
    .bc_img_1{
        width: 100%;
        height: 320px;
        background:url('~@indexAssets/images/new/banner1_01.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .bc_img_2{
        width: 100%;
        height: 320px;
        background: url('~@indexAssets/images/new/img_banner.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
</style>