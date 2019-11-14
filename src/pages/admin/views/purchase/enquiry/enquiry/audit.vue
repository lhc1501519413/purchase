<template>
  <div id="auditEnquiry">
    <h5>
        <span>在线询价 / 询价单管理 / 审核询价单</span>
        <div>
          <a-button type="primary" @click="audit">审核</a-button>
          <a-button style="margin-left:20px;" type="primary" @click="reject">驳回</a-button>
        </div>
    </h5>
    <enquiry :formData="formData" :r_id="id" :region_area='region_area' :status='status'></enquiry>
  </div>
</template>

<script>
import enquiry from './components/enquiry';
import {
  inquiry_audit, // 审核
  inquiry_refuse, // 驳回
  get_inquiry_info
} from "@admin/api/enquiry";
export default {
  components: {
    enquiry
  },
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      formData:{},
      id:'',
      status:'待审核',
      region_area:''
    };
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
  methods: {
    audit(){
      var self = this;
      this.$confirm({
        title: '确认审核此询价单?',
        onOk() {
          inquiry_audit(self.id).then(res=>{
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
        title: '确认驳回此询价单?',
        onOk() {
          inquiry_refuse(self.id).then(res=>{
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
    }
  },
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/enquiry/auditEnquiry";
</style>