<template>
  <div id="add_win">
    <h5>招标管理 / 中标通知书详情
        <a-button @click="$router.go(-1)">返回</a-button>
    </h5>
    <section class="content">
      <h2 class="text-center mb-10">{{formData.com_name}}成交通知书</h2>
      <div class="mb-10">{{formData.supply_name}}：</div>
      <div class="text-indent-35 mb-10">
        你单位在我方组织的{{formData.com_name}}{{formData.project_title}}采购项目（项目编号：{{formData.project_code}}）竞争性谈判{{formData.project_type_name}}采购中中标，
        请于{{$moment(formData.confirm_date).format(dateFormat)}}前完成采购合同签订工作。
      </div>
      <div class="text-indent-35 mb-10">
        采购人联系方式：
      </div>
      <div class="text-indent-35 mb-10">
        联系人：{{formData.contact_name}}
      </div>
      <div class="text-indent-35 mb-10">
        联系方式：{{formData.contact_number}}
      </div>
      <div class="text-indent-35 mb-10">
        联系地址：{{formData.address}}
      </div>
      <div class="text-indent-35 mb-10">
        特此通知。
      </div>
      <div class="text-right border-bottom mr-30">
        {{$moment(formData.close_date).format(dateFormat)}}
      </div>
      <h2 class="text-center mb-10">中标签领单</h2>
      <div class="mb-10">
        {{formData.com_name}}：
      </div>
      <div class="text-indent-35 mb-10">
        我单位已收取贵方中标通知书，明确合同签订的时限与要求，并承诺按要求做好合同签订工作。
      </div>
      <div class="mb-10 signature text-right">
        中标单位（盖章）：
      </div>
      <div class="mb-10 signature text-right">
        投标代表（签字）：
      </div>
      <div class="text-right mr-30" :class="{'bottom-date':!formData.sign_date}">
        {{formData.sign_date?$moment(formData.sign_date).format(dateFormat):'年月日'}}
      </div>
      <div class="mb-10 file-container">
        中标成交通知书附件：
        <ul>
          <li
            class="mb-10"
            v-for="(item,index) of formData.file_list"
            :key="index"
          >
            <svg-icon class="wenjian" icon-class="wenjian" />
            <span class="ml-10 mr-10" style="width:10px;">{{item.file_name}}</span>
            <a :href="item.full_path" target="_blank">预览</a>
            <a :href="item.full_path" target="_blank">下载</a>
          </li>
        </ul>
      </div>
      <div class="mb-10 file-container">
        中标签领单附件：
        <ul>
          <li
            class="mb-10"
            v-for="(item,index) of formData.sign_file_list"
            :key="index"
          >
            <svg-icon class="wenjian" icon-class="wenjian" />
            <span class="ml-10 mr-10" style="width:10px;">{{item.file_name}}</span>
            <a :href="item.full_path" target="_blank">预览</a>
            <a :href="item.full_path" target="_blank">下载</a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import {
  get_win_notice_info // 获取中标通知书详情
} from '@admin/api/bidswin';
export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      id: "",
      formData: {},
      dateFormat:"YYYY年MM月DD日",
      point: require("@static/images/icon_point.png"),
    };
  },
  created() {
    this.father.selectedKeys = ['/Bidwin/win_notice_list'];
    this.id = this.$route.query.id;
    get_win_notice_info({ id: this.id }).then(res=>{
      this.formData = res.data||{};
    }).catch(error=>this.$message.error(error))
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#add_win{
  @include component;
  .content{
    width: 60%;
    margin: 0 auto;
  }
  .text-indent-35 {
    text-indent: 35px;
  }
  .border-bottom{
    border-bottom: 1px dashed #333;
    padding-bottom: 50px;
    margin-bottom: 50px;
  }
  .signature{
    margin-right: 150px;
  }
  .bottom-date{
    letter-spacing: 50px;
  }
  .file-container{
    @include flex(flex-start,flex-start);
  }
}
</style>