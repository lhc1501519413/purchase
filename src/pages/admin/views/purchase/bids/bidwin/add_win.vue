<template>
  <div id="add_win">
    <h5>招标管理 / 中标通知书
      <div>
        <a-button type="primary" class="mr-10" @click="save">保存</a-button>
        <a-button type="primary" class="mr-10" @click="submit">提交</a-button>
        <a-button @click="$router.go(-1)">返回</a-button>
      </div>
    </h5>
    <section class="content">
      <h2 class="text-center mb-10">{{formData.com_name}}成交通知书</h2>
      <div class="mb-10">{{formData.supply_name}}：</div>
      <div class="text-indent-35 mb-10">
        你单位在我方组织的{{formData.com_name}}{{formData.project_title}}采购项目（项目编号：{{formData.project_code}}）竞争性谈判{{formData.project_type_name}}采购中中标，
        请于<a-date-picker class="ml-10 mr-10" v-model="confirm_date" :format="dateFormat"/>前完成采购合同签订工作。
      </div>
      <div class="text-indent-35 mb-10">
        采购人联系方式：
      </div>
      <div class="text-indent-35 mb-10">
        联系人：<a-input placeholder='请输入联系人' v-model="formData.contact_name"/>
      </div>
      <div class="text-indent-35 mb-10">
        联系方式：<a-input placeholder='请输入联系方式' v-model="formData.contact_number"/>
      </div>
      <div class="text-indent-35 mb-10">
        联系地址：<a-input placeholder='请输入联系地址' v-model="formData.address"/>
      </div>
      <div class="text-indent-35 mb-10">
        特此通知。
      </div>
      <div class="text-right border-bottom">
        <a-date-picker class="ml-10 mr-10" v-model="close_date" :format="dateFormat"/>
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
      <div class="text-right bottom-date">
        <a-date-picker class="ml-10 mr-10" disabled :format="dateFormat"/>
      </div>
      <div class="mb-10">
        <img class="img_point" :src="point" alt="必填" />
        中标成交通知书附件：上传的中标通知书为签章后的文件，未签章文件视为无效文件。点击<a @click="signModalVisible = true">去签章</a>
      </div>
      <a-button type='primary' @click="download">
        <a-icon type="upload" />下载通知书
      </a-button>
      <upload
        class="ml-10"
        @choose-file="quality_grade_change"
        accept="image/png, image/jpg, image/jpeg, application/pdf"
        >
        <a-button>
          <a-icon type="upload" />上传通知书
        </a-button>
      </upload>
      <ul>
        <li
          class="mt-10"
          @click.stop="del"
          v-for="(item,index) of file_list"
          :key="index"
        >
          <svg-icon class="wenjian" icon-class="wenjian" />
          <span class="ml-10 mr-10" style="width:10px;">{{item.file_name}}</span>
          <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
        </li>
      </ul>
    </section>
    <a-modal
      class="supply-purchase-info"
      width="50%"
      :afterClose="afterClose"
      :destroyOnClose="false"
      :visible="signModalVisible"
      @ok="signModalVisible = false"
      @cancel="signModalVisible = false"
      :footer="null"
      >
      <h3 slot="title">签章</h3>
      <a-alert message="注意事项：" type="warning" showIcon>
        <div slot="description">
          <p>1、请将文件转换为PDF格式。</p>
          <p>2、签章将直接签署在您的原文件上，建议您将文件进行备份。</p>
          <p>3、请将您的文件在本机的文件路径及文件名称填写到下框中，以便于将您的文件进行本地签章。</p>
        </div>
      </a-alert>
      <div>
        <p class="mb-10">
          文件路径：
          <a-input
            style="width:30%;margin:0 5px;"
            class="pl-10"
            @keyup.enter="add_sign"
            v-model="file_path"
          />
          <a-button type="primary" @click="add_sign">签章</a-button>
        </p>
        <p class="mb-10">
          例：填写格式为
          <span class="file-path-model">e:\pdf\文件.pdf</span>
        </p>
      </div>
    </a-modal>
  </div>
</template>
<script>
import {
  get_win_notice_info, // 获取中标通知书详情
  save_win_notice, // 编辑中标通知书
  submit_win_notice, // 提交中标通知书
  download
} from '@admin/api/bidswin';
import upload from "@admin/components/upload";
import { POST } from "@common/js/apis";
export default {
  components: {
    upload
  },
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      id: "",
      formData: {},
      confirm_date:null,
      close_date:null,
      dateFormat:"YYYY年MM月DD日",
      point: require("@static/images/icon_point.png"),
      del_icon: require("@static/icon/icon_close.png"),
      signModalVisible:false,
      file_list:[],
      file_path:''
    };
  },
  created() {
    this.father.selectedKeys = ['/Bidwin/win_notice_list'];
    this.id = this.$route.query.id;
    this.get_win_notice_info();
  },
  methods: {
    get_win_notice_info(){
      get_win_notice_info({ id: this.id }).then(res=>{
        this.formData = res.data||{};
        this.confirm_date = res.data.confirm_date?this.$moment(res.data.confirm_date):null;
        this.close_date = res.data.close_date?this.$moment(res.data.close_date):null;
        this.file_list = res.data.file_list||[];
      })
      .catch(error=>this.$message.error(error))
    },
    save(){
      var formData= this.formData;
      formData.close_date = this.close_date&&this.$moment(this.close_date).format('YYYY-MM-DD');
      formData.confirm_date = this.confirm_date&&this.$moment(this.confirm_date).format('YYYY-MM-DD');
      formData.file_list = this.file_list;
      delete formData.sign_date;
      save_win_notice(formData).then(res=>{
        this.$message.success(res.msg)
        let time = setTimeout(()=>{
          this.$router.go(-1);
          clearTimeout(time)
        },1500)
      }).catch(error=>this.$message.error(error))
    },
    submit(){
      var self = this;
      var formData=this.formData;
      this.$confirm({
        title: '确认提交此中标通知书？',
        onOk() {
          formData.submit=1;
          save_win_notice(formData).then(res=>{
            self.$message.success(res.msg)
            let time = setTimeout(()=>{
              self.$router.go(-1);
              clearTimeout(time)
            },1500)
          }).catch(error=>self.$message.error(error))
        },
        onCancel() {},
      });
    },
    afterClose() {
      this.file_path = "";
    },
    add_sign() {
      open(`https://localhost:7688/index.html?file=/${this.file_path}`);
    },
    quality_grade_change(event) {
      // 添加资质评分要求文件
      var self = this;
      var files = event.target.files;
      if (
        (files[0].type === "image/png" ||
          files[0].type === "image/jpg" ||
          files[0].type === "image/jpeg") &&
        files[0].size / 1024 / 1024 > 2
      ) {
        self.$message.error("图片大小必须小于2MB!");
        return;
      } else if (
        files[0].type === "application/pdf" &&
        files[0].size / 1024 / 1024 > 8
      ) {
        self.$message.error("文件大小必须小于 8MB!");
        return;
      }
      const formData = new FormData();
      formData.append("file", files[0]);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          self.file_list=[img_obj];
        })
        .catch(error => self.$message.error(error));
    },
    del() {
      var index2 = event.target.dataset.key;
      if (index2 !== undefined) {
        this.file_list.splice(index2, 1);
      }
    },
    download(){
      download(this.id)
    }
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
  .ant-calendar-picker{
    text-indent: 0;
  }
  .ant-input{
    width: 200px;
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
}
</style>
<style lang="scss">
.supply-purchase-info {
  .ant-alert {
    width: 85% !important;
    margin-bottom: 20px !important;
    p {
      font-size: 12px !important;
    }
  }
  .file-path-model {
    color: $red;
  }
}
</style>