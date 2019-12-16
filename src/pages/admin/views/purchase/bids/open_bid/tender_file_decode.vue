<template>
  <div id="tender_file_decode">
    <h5>
      招标管理 / 投标文件解密
      <div class="btn-container" v-if="status<14">
        <a-button type="primary" class="ml-10" @click="failure">流标</a-button>
        <a-button type="primary" class="ml-10" @click="get_open_supply_list">刷新</a-button>
        <a-button
          type="primary"
          class="ml-10"
          @click="start_decode"
        >开始解密</a-button>
        <a-button type="primary" class="ml-10" @click="open_bid_file">开启标书</a-button>
      </div>
    </h5>
    <section class="content">
      <div v-if="judge_info.decrypt_time">
        供应商
        <span class="ml-10 mr-10">{{decrypt_end_time}}</span>
        完成解密后（时限30分钟），可以结束解密
      </div>
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        rowKey="supply_id"
      >
        <template slot="status" slot-scope="text">
          <a href="javascript:;">{{text|status}}</a>
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
      <h3 class="text-center" slot="title">流标</h3>
      <a-form :form="form" @submit="handleSubmit">
        <h4>项目基本信息</h4>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">项目编号：</a-col>
          <a-col :span="4">{{judge_info.custom_code}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">项目名称：</a-col>
          <a-col :span="4">{{judge_info.title}}</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">采购单位：</a-col>
          <a-col :span="4">{{judge_info.com_name}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">采购方式：</a-col>
          <a-col :span="4">{{judge_info.bid_type_name}}</a-col>
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
              'file_list',
              { rules: [{ required: true, message: '请选择附件' }],initialValue:formData.file_list }
            ]"
          >
            <a-button>
              <a-icon type="upload" />上传
            </a-button>
            <ul>
              <li
                @click.stop="del"
                class="file-list-item"
                v-for="(item,index) of formData.file_list"
                :key="index"
              >
                <svg-icon class="wenjian" icon-class="wenjian" />
                <span class="ml-10 mr-10">{{item.file_name}}</span>
                <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
              </li>
            </ul>
          </a-upload>
        </a-form-item>
        <a-form-item class="text-center">
          <a-button class="mr-10" @click="ModalVisible = false">取消</a-button>
          <a-button class="ml-10" type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { POST } from "@common/js/apis";
import {
  get_judge_info, // 获取项目评标中的状态
  get_open_supply_list, // 获取待解密供应商
  open_decrypt, // 开启解密
  open_bid_file // 开启标书
} from "@admin/api/open_bid";
import { save_bid_fail } from "@admin/api/bids";
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
      status: this.$store.getters.judgeStatus,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      bid_code: "",
      del_icon: require("@static/icon/icon_close.png"),
      formData: {
        reason: "",
        file_list: []
      },
      judge_info: {},
      dataSource: [],
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
          title: "法定代表人",
          dataIndex: "legal_user_name",
          width: "10%"
        },
        {
          title: "联系手机",
          dataIndex: "mobile",
          width: "10%"
        },
        {
          title: "解密时间",
          dataIndex: "decrypt_time",
          width: "10%"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        }
      ],
      ModalVisible: false
    };
  },
  filters: {
    status: key => {
      switch (key) {
        case "8":
          return "待解密";
        case "9":
          return "待解密";
        case "10":
          return "未解密";
        case "12":
          return "已解密";
        default:
          return "未知状态";
      }
    }
  },
  created() {
    this.bid_code = this.$route.query.bid_code;
    this.father.selectedKeys = ["/Bid/open_bid_list"];
    this.get_open_supply_list();
    this.get_judge_info();
  },
  methods: {
    get_open_supply_list() {
      get_open_supply_list(this.bid_code)
        .then(res => {
          this.dataSource = res.data.list || [];
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    get_judge_info() {
      // 获取项目评标中的状态
      get_judge_info(this.bid_code)
        .then(res => {
          this.judge_info = res.data;
          if(res.data.decrypt_time){
            this.decrypt_end_time = this.$moment(res.data.decrypt_time).add(0.5, 'd').format('YYYY-MM-DD hh:mm:ss');
          }
        })
        .catch(error => this.$message.error(error));
    },
    failure() {
      this.ModalVisible = true;
    },
    start_decode() {
      var self = this;
      this.$confirm({
        title: "温馨提示",
        content: "确定要开始解密吗？",
        onOk() {
          open_decrypt(self.bid_code)
            .then(res => {
              self.$message.success(res.msg);
            })
            .catch(error => {
              self.$message.error(error);
            });
        },
        onCancel() {}
      });
    },
    open_bid_file() {
      var self = this;
      this.$confirm({
        title: "温馨提示",
        content: "确定要开启标书信息吗？",
        onOk() {
          open_bid_file(self.bid_code)
            .then(res => {
              self.$message.success(res.msg);
              let time = setTimeout(() => {
                clearTimeout(time);
                self.$router.go(-1);
              }, 1000);
            })
            .catch(error => self.$message.error(error));
        },
        onCancel() {}
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_code: this.bid_code,
            file_list: this.formData.file_list
          };
          save_bid_fail(values)
            .then(res => {
              this.$message.success(res.msg);
              let time = setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            })
            .catch(error => {
              this.$message.error(error);
            });
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
          this.formData.file_list.push(img_obj);
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    beforeUpload(file) {
      const isJPGPDF =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "application/pdf";
      if (!isJPGPDF) {
        this.$message.error("您只可以上传JPG,PNG,PDF格式的文件");
      }
      var isPicLt100KB;
      var isPdfLt2M;
      if (file.type === "image/jpeg" || file.type === "image/png") {
        if (file.size / 1024 / 1024 < 0.8) {
          isPicLt100KB = true;
        } else {
          this.$message.error("图片大小必须小于 800KB!");
          isPicLt100KB = false;
        }
      } else if (file.type === "application/pdf") {
        if (file.size / 1024 / 1024 < 8) {
          isPdfLt2M = true;
        } else {
          this.$message.error("文件大小必须小于 8MB!");
          isPdfLt2M = false;
        }
      }
      return isJPGPDF && isPicLt100KB && isPdfLt2M;
    },
    del(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.formData.file_list.splice(index, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#tender_file_decode {
  @include component;
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
    padding: 5px;
  }
  .file-list-item {
    margin-top: 5px;
  }
}
</style>