<template>
  <div id="tender_file_decode">
    <h5>
      招标管理 / 投标文件解密
      <a-button type="primary" style="right:200px;" @click="failure">流标</a-button>
      <a-button type="primary" style="right:120px;" @click="refresh">刷新</a-button>
      <a-button type="primary" @click="start_decode">开始解密</a-button>
    </h5>
    <section class="content">
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        rowKey="id"
      >
        <template slot="status" slot-scope="text">
          <a href="javascript:;" @click="showModel">{{text|status}}</a>
        </template>
      </a-table>
    </section>
    <a-modal
      class="failure-modal"
      :destroyOnClose="true"
      style="top: 10%;"
      width="55%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
    >
      <h3 class="text-center">流标</h3>
      <a-form :form="form" @submit="handleSubmit">
        <h4>项目基本信息</h4>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">项目编号：</a-col>
          <a-col :span="6">{{formData.custom_code}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">项目名称：</a-col>
          <a-col :span="6">{{formData.bid_type_name}}</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">项目编号：</a-col>
          <a-col :span="6">{{formData.custom_code}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">项目名称：</a-col>
          <a-col :span="6">{{formData.bid_type_name}}</a-col>
        </a-row>
        <a-form-item label="流标原因" v-bind="formItemLayout">
          <a-textarea
            style="width:65%"
            :rows="4"
            placeholder="请输入流标原因"
            v-decorator="[
              'reason',
              { rules: [{ required: true, message: '请输入流标原因' }],initialValue:formData.reason}
            ]"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="附件" v-bind="formItemLayout">
          <a-upload
            :showUploadList="false"
            :customRequest="customRequest"
            :beforeUpload="beforeUpload"
            v-decorator="[
              'file_path',
              { rules: [{ required: true, message: '请选择附件' }],initialValue:formData.file_path }
            ]"
            >
            <a-button>
              <a-icon type="upload" />上传
            </a-button>
            <ul>
              <li
                @click.stop="del"
                class="file-list-item"
                v-for="(item,index) of formData.file_path"
                :key="index"
              >
                <svg-icon class="wenjian" icon-class="wenjian" />
                <span class="ml-10 mr-10">{{item.file_name}}</span>
                <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
              </li>
            </ul>
          </a-upload>
        </a-form-item>
        <a-form-item class="text-right">
          <a-button class="mr-10" @click="ModalVisible = false">取消</a-button>
          <a-button class="ml-10" type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { POST } from "@common/js/apis";
export default {
  props: {
    father: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      priv: this.$store.getters.priv,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      bid_code: "",
      del_icon: require("@static/icon/icon_close.png"),
      formData: {
        custom_code: "1234465464",
        buy_type_name: "公开招标",
        reason: "流标原因",
        file_path: [
          {
            file_name: "emila.jpg",
            file_path: "",
            full_path: ""
          },
          {
            file_name: "emila.jpg",
            file_path: "",
            full_path: ""
          },
          {
            file_name: "emila.jpg",
            file_path: "",
            full_path: ""
          },
          {
            file_name: "emila.jpg",
            file_path: "",
            full_path: ""
          }
        ]
      },
      dataSource: [
        {
          id: "2",
          supply_name: "供应商1",
          people: "贾克斯",
          status: "1",
          contact_number: "13312345678",
          decode_time: "2019-05-10 10:00:00"
        },
        {
          id: "3",
          supply_name: "供应商1",
          people: "贾克斯",
          status: "1",
          contact_number: "13312345678",
          decode_time: "2019-05-10 10:00:00"
        },
        {
          id: "4",
          supply_name: "供应商1",
          people: "贾克斯",
          contact_number: "13312345678",
          status: "1",
          decode_time: "2019-05-10 10:00:00"
        },
        {
          id: "5",
          supply_name: "供应商1",
          people: "贾克斯",
          contact_number: "13312345678",
          status: "1",
          decode_time: "2019-05-10 10:00:00"
        }
      ],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "供应商名称",
          dataIndex: "supply_name",
          width: "10%"
        },
        {
          title: "法定代表人或授权委托人",
          dataIndex: "people",
          width: "10%"
        },
        {
          title: "联系手机",
          dataIndex: "contact_number",
          width: "10%"
        },
        {
          title: "解密时间",
          dataIndex: "decode_time",
          width: "10%"
        },
        {
          title: "操作",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        }
      ],
      ModalVisible: true
    };
  },
  filters: {
    status: key => {
      switch (key) {
        case "15":
          return "待开标";
          break;
        case "16":
          return "评标中";
          break;
        case "18":
          return "已确认";
          break;
        case "20":
          return "已流标";
          break;
        case "21":
          return "已流标";
          break;
        default:
          return "未知状态";
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Bid/open_bid_list"];
  },
  methods: {
    showModel() {
      this.ModalVisible = true;
    },
    failure() {},
    refresh() {
      console.log("刷新");
    },
    start_decode() {
      var self = this;
      this.$confirm({
        title: "温馨提示",
        content: "确定要开启标书信息吗？",
        onOk() {
          self.$message.success("开启标书成功");
        },
        onCancel() {
          console.log("开启标书失败");
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_code: this.bid_code
          };
          console.log(values);
        }
      });
    },
    customRequest(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.formData.file_path.push(img_obj);
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    beforeUpload(file) {
      const isJPGPDF = file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf";
      if (!isJPGPDF) {
        this.$message.error("您只可以上传JPG,PNG,PDF格式的文件");
      }
      var isPicLt100KB;
      var isPdfLt2M;
      if(file.type === "image/jpeg" || file.type === "image/png"){
        if(file.size / 1024 / 1024 < 0.8){
          isPicLt100KB = true;
        }else{
          this.$message.error("图片大小必须小于 800KB!");
          isPicLt100KB = false;
        }
      }else if(file.type === "application/pdf"){
        if(file.size / 1024 / 1024 < 8){
          isPdfLt2M = true;
        }else{
          this.$message.error("文件大小必须小于 8MB!");
          isPdfLt2M = false;
        }
      }
      return isJPGPDF && isPicLt100KB && isPdfLt2M;
    },
    del(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData.file_path.splice(index, 1);
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#tender_file_decode {
  @include component;
  h5 {
    position: relative;
    button {
      position: absolute;
      right: 15px;
      top: -9px;
    }
  }
}
</style>
<style lang="scss">
.failure-modal {
  h4 {
    border-left: 4px solid $primary2;
    @extend .pl-10;
    @extend .ml-40;
    @extend .mb-10;
  }
  .wenjian {
    width: 17px;
    height: 17px;
  }
  .ant-input {
    @extend .pl-10;
  }
  .file-list-item{
    margin-top: 5px;
  }
}
</style>