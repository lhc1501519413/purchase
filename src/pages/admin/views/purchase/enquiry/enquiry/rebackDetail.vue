<template>
  <div id="auditEnquiry">
    <h5>
        <span>在线询价 / 询价单管理 / 询价单详情</span>
        <div></div>
    </h5>
    <enquiry :formData="formData" :r_id="id" :region_area='region_area' :status='status'></enquiry>
    <section class="content">
      <h4>询价结果</h4>
      <a-row>
        <a-col :span='10' :offset='1'>参与报价的供应商：{{formData.supply_count}}家</a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import enquiry from './components/enquiry';
import {
  get_inquiry_info
} from "@admin/api/enquiry";
export default {
  components: {
    enquiry
  },
  data() {
    return {
      formData:{},
      id:'',
      status:'已撤销',
      region_area:''
    };
  },
  props:{
    father:{
      type:Object
    }
  },
  created() {
    this.father.selectedKeys = ['/Inquiry/get_inquiry_list'];
    this.id = this.$route.query.id;
    let code = this.$route.query.code;
    get_inquiry_info(code)
      .then(res => {
        this.formData = res.data;
        var list = res.data.shipping_region_list;
        var region_area='';
        list.forEach(elem => {
          region_area +=elem.name+'，';
        });
        this.region_area = region_area.slice(0,-1);
      })
      .catch(error => {
        this.$message.error(error)
      });
  },
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/enquiry/auditEnquiry";
</style>