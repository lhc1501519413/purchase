<template>
  <div id="auditBid">
    <h5>
      <span>招标管理 / 招标项目管理 / 审核项目</span>
      <div>
        <a-button type="primary" @click="audit">审核</a-button>
        <a-button type="primary" class="ml-10" @click="reject">驳回</a-button>
      </div>
    </h5>
    <bid :formData="formData" :region_area="region_area"></bid>
  </div>
</template>

<script>
import {
  audit_bid, // 审核
  refuse_bid, // 驳回
} from '@admin/api/bids'
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
  },
  methods:{
    audit(){
      var self = this;
      this.$confirm({
        title: '确认审核此招标项目？',
        onOk() {
          audit_bid(self.id).then(res=>{
            self.$message.success(res.msg);
            let time = setTimeout(()=>{
              self.$router.go(-1);
              clearTimeout(time)
            },1500)
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    reject(){
      var self = this;
      this.$confirm({
        title: '确认驳回此招标项目？',
        onOk() {
          refuse_bid(self.id).then(res=>{
            self.$message.success(res.msg)
            let time = setTimeout(()=>{
              self.$router.go(-1);
              clearTimeout(time)
            },1500)
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#auditBid {
  @include component;
}
</style>