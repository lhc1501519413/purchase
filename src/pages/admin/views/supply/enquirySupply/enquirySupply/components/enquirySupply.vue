<template>
  <div id="enquiry">
    <h3>
      <span>
        询价单编号：{{formData.code}}
      </span>
      <span class="status">
        状态：{{status}}
      </span>
    </h3>
    <section class="content">
      <h4>询价基本信息</h4>
      <a-row>
        <a-col :span='2' :offset='1'>询价标题：</a-col>
        <a-col :span='6'>{{formData.title}}</a-col>
        <a-col :span='2' :offset='1'>报价时间：</a-col>
        <a-col :span='6'>{{formData.start_date}}  ~  {{formData.end_date}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>询价单位：</a-col>
        <a-col :span='8'>{{formData.com_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>联系人：</a-col>
        <a-col :span='6'>{{formData.contact_name}}</a-col>
        <a-col :span='2' :offset='1'>联系方式：</a-col>
        <a-col :span='6'>{{formData.contact_number}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>成交规则：</a-col>
        <a-col :span='8'>{{formData.rule_type_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>供应商要求：</a-col>
        <a-col :span='8'>{{formData.remark}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>配送区域：</a-col>
        <a-col :span='8'>{{formData.region_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='8' :offset='3'>{{region_area}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>配送要求：</a-col>
        <a-col :span='8'>{{formData.shipping_remark}}</a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true
    },
    region_area:{
      type:String,
      required:true
    },
    status:{
      type:String,
      required:true
    }
  },
  computed:{
    data(){
      return this.formData.stock_list||[]
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/enquiry/enquiry";
</style>