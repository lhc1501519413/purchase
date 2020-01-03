<template>
  <div id="bid_notice_detail">
    <h5>招标管理 / 项目公告 / 流标公告
      <a-button @click="$router.go(-1)">返回</a-button>
    </h5>
    <section class="bid_notice_detail mt-20 content">
      <div class="bigcontent">
        <h2 class="text-center mb-10">{{formData.title}}</h2>
        <h4 class="text-center mb-10 no-border">
          <span>发布时间：{{formData.create_time}}</span>
          <span class="ml-10">浏览次数：{{formData.times}}</span>
        </h4>
        <h3>一、采购人名称：{{formData.com_name}}</h3>
        <h3>二、采购项目名称：{{formData.project_name}}</h3>
        <h3>三、项目编号：{{formData.custom_code}}</h3>
        <h3>四、采购组织类型：自行采购</h3>
        <h3>五、采购方式：{{formData.bid_type_name}}</h3>
        <h3>六、采购公告发布日期：{{formData.publish_time}}</h3>
        <h3>七、流标日期：{{formData.create_time}}</h3>
        <h3>八、流标原因</h3>
        <div class="text-indent-35 mb-10">
          {{formData.reason}}
        </div>
        <h3>九、
          联系人：{{formData.contact_name}}
          <span class="ml-20">
            联系电话：{{formData.contact_number}}
          </span>
        </h3>
        <div class="text-center mb-10">{{formData.com_name}}</div>
        <div class="text-center mb-10">{{formData.create_time}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { get_notice_info } from '@admin/api/open_bid';
export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      id:'',
      formData: {},
    };
  },
  created() {
    this.father.selectedKeys = ['/Bid/notice_list'];
    this.id = this.$route.query.id;
    this.get_notice_info_method()
  },
  methods: {
    get_notice_info_method(){
      get_notice_info({id:this.id}).then(res=>{
        this.formData = res.data;
      }).catch(error=>this.$message.error(error))
    },
  }
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#bid_notice_detail{
  @include component;
  .bid_notice_detail {
    width: 100%;
    padding: 0 17.5%;
    & > h4 {
      margin: 8px 0;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      opacity: 1;
    }
    .bigcontent {
      background-color: $white;
      padding: 30px;
      h3 {
        margin-bottom: 10px;
      }
      .text-indent-35 {
        text-indent: 35px;
      }
    }
  }
}
</style>