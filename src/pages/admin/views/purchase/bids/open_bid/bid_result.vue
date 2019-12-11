<template>
  <div id="bidDetail">
    <h5>
      <span>招标管理 / 开标评标管理 / 中标信息</span>
      <div>
        <a-button @click="$router.go(-1)">返回</a-button>
      </div>
    </h5>
    <bid></bid>
  </div>
</template>

<script>
export default {
  components: {
    bid: () => import("@admin/components/bid_result")
  },
  props: {
    father: {
      type: Object
    }
  },
  created() {
    this.father.selectedKeys = ["/Bid/open_bid_list"];
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#bidDetail {
  @include component;
}
</style>