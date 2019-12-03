<template>
  <div id="bidDetail">
    <h5>
      <span>招标管理 / 招标项目管理 / 项目基本信息</span>
      <div></div>
    </h5>
    <bid></bid>
  </div>
</template>

<script>
export default {
  components: {
    bid: () => import("@admin/components/bid")
  },
  props: {
    father: {
      type: Object
    }
  },
  created() {
    this.father.selectedKeys = ["/Bid/bid_list"];
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#bidDetail {
  @include component;
}
</style>