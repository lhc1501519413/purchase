<template>
  <div id="bidDetail">
    <h5>
      <span>招标管理 / 招标项目管理 / 项目基本信息</span>
      <div></div>
    </h5>
    <bid :formData="formData" :region_area="region_area"></bid>
  </div>
</template>

<script>
import {
  get_bid_info // 获取详情
} from "@admin/api/bids";
export default {
  components: {
    bid: () => import("@admin/components/bid")
  },
  data() {
    return {
      id:'',
      formData: {},
      region_area: ""
    };
  },
  props: {
    father: {
      type: Object
    }
  },
  created() {
    this.father.selectedKeys = ["/Bid/bid_list"];
    this.id = this.$route.query.id;
    get_bid_info(this.id)
      .then(res => {
        this.formData = res.data;
        var list = res.data.shipping_region_list;
        var region_area = "";
        list.forEach(elem => {
          region_area += elem.name + "，";
        });
        this.region_area = region_area.slice(0, -1);
      })
      .catch(error => {
        this.$message.error(error);
      });
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#bidDetail {
  @include component;
}
</style>