<template>
  <div id="check_purchase_info">
    <h5>
      <span>招标管理 / 获取采购文件管理 / 查看获取信息</span>
      <div class="btn-container">
        <a-button type="primary" :disabled="formData.status==20||formData.status==21" class="mr-10" @click="failure">流标</a-button>
        <a-button type="primary" :disabled="formData.status==20||formData.status==21" @click="sendFile">发送采购文件</a-button>
      </div>
    </h5>
    <section class="content">
      <h4 class="no-border no-padding">项目名称：{{formData.title}}</h4>
      <div class="mt-10 ml-10">
        <a-icon type="file-text" />
        项目编号：{{formData.custom_code}}
        <a-icon type="user" />
        采购单位：{{formData.com_name}}
        <a-icon type="profile" />
        采购方式：{{formData.bid_type_name}}
      </div>
      <a-row class="mt-10 get-situation">
        <a-col :span="6" class="left">
          <h3 class="pb-10 mb-10">供应商获取采购文件情况</h3>
          <a-table
            :scroll="{ y: 800 }"
            :dataSource="dataSource"
            :columns="columns"
            :pagination="false"
            :rowClassName="rowClassName"
            rowKey="id"
            :customRow="rowClick"
          >
            <template slot="operation" slot-scope="text">{{text|status}}</template>
          </a-table>
        </a-col>
        <a-col :span="18" class="right">
          <h3 class="pb-10 mb-10">{{supply_info.supply_name}}</h3>
          <h4 class="mb-10">供应商联系信息</h4>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">单位名称：</a-col>
            <a-col :span="8">{{supply_info.supply_name}}</a-col>
            <a-col :span="4" class="text-right">法定代表人：</a-col>
            <a-col :span="8">{{supply_info.legal_user_name}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">联系人姓名：</a-col>
            <a-col :span="8">{{supply_info.contact_name}}</a-col>
            <a-col :span="4" class="text-right">手机号：</a-col>
            <a-col :span="8">{{supply_info.contact_phone}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">邮箱：</a-col>
            <a-col :span="8">{{supply_info.email}}</a-col>
            <a-col :span="4" class="text-right">地址：</a-col>
            <a-col :span="8">{{supply_info.address}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">传真：</a-col>
            <a-col :span="8">{{supply_info.fax}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="4" class="text-right">附件：</a-col>
            <a-col :span="10">
              <ul>
                <li
                  class="file-list-item"
                  v-for="(item,index) of supply_info.file_list"
                  :key="index"
                >
                  <svg-icon class="wenjian" icon-class="wenjian" />
                  <span class="ml-10 mr-10">{{item.file_name}}</span>
                  <a :href="item.full_path" target="_blank">下载附件</a>
                </li>
              </ul>
            </a-col>
          </a-row>
          <div v-if="supply_info.status==2">
            <h4 class="mb-10">报名审核</h4>
            <a-row class="mb-10">
              <a-col :span="4" class="text-right">
                <img class="img_point ml-20" :src="point" alt="必填" />
                <span>审核结果：</span>
              </a-col>
              <a-col :span="10">
                <a-radio-group v-model="radio" :disabled="formData.status==20||formData.status==21">
                  <a-radio :value="1">通过</a-radio>
                  <a-radio :value="2">不通过</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row class="mb-10" v-show="radio==2">
              <a-col :span="4" class="text-right">审核意见：</a-col>
              <a-col :span="18">
                <a-textarea class="pl-10" placeholder="审核意见" v-model="auditInfo" :rows="4" />
              </a-col>
            </a-row>
          </div>
          <div>
            <h4 v-if="supply_info.log_list" class="mb-10">审核记录</h4>
            <ul class="ml-30">
              <li class="mt-10" v-for="(item,index) of supply_info.log_list" :key="index">
                <p>操作人员：{{item.com_id!=0?item.com_name:item.supply_name}}</p>
                <p v-if="item.com_id!=0">审核时间：{{item.create_time}}</p>
                <p v-else>提交时间：{{item.create_time}}</p>
                <p v-if="item.com_id!=0">审核结果：{{item.desc}}</p>
                <p v-if="item.com_id!=0&&item.remark">审核意见：{{item.remark}}</p>
              </li>
            </ul>
          </div>
          <div v-if="supply_info.status==2" class="text-right" style="width:92%;">
            <a-button type="primary" :disabled="formData.status==20||formData.status==21" @click="save">保存</a-button>
          </div>
        </a-col>
      </a-row>
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
        <!-- <a-button type='primary' class="btn" @click="print_scrap">打印流标信息</a-button> -->
        <div id="scrap-record">
          <h4>项目基本信息</h4>
          <a-row class="mb-10">
            <a-col :span="5" class="text-right" :offset="1">项目编号：</a-col>
            <a-col :span="4">{{formData.custom_code}}</a-col>
            <a-col :span="5" class="text-right" :offset="1">项目名称：</a-col>
            <a-col :span="4">{{formData.title}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="5" class="text-right" :offset="1">采购单位：</a-col>
            <a-col :span="4">{{formData.com_name}}</a-col>
            <a-col :span="5" class="text-right" :offset="1">采购方式：</a-col>
            <a-col :span="4">{{formData.bid_type_name}}</a-col>
          </a-row>
          <a-form-item label="流标原因：" v-bind="formItemLayout">
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
        </div>
        <a-form-item label="附件" v-bind="formItemLayout">
          <a-upload
            :showUploadList="false"
            :customRequest="customRequest"
            :beforeUpload="beforeUpload"
            v-decorator="[
              'file_list',
              { rules: [{ required: true, message: '请选择附件' }],initialValue:file_list }
            ]"
          >
            <a-button>
              <a-icon type="upload" />上传
            </a-button>
            <ul>
              <li
                @click.stop="del"
                class="file-list-item"
                v-for="(item,index) of file_list"
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
  purchase_supply_list, // 查看采购文件获取情况
  audit_purchase_supply, // 审核/驳回 获取采购文件申请
  purchase_supply_info, // 获取获取采购文件信息
  send_purchase_file, // 发送采购文件
  save_bid_fail, // 流标
  get_bid_purchase_info // 获取采购文件全部详情
} from "@admin/api/bids";
import { getLodop } from '@common/js/lodop';
export default {
  components: {
    "search-condition": () => import("@admin/components/searchCondition")
  },
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      point: require("@static/images/icon_point.png"),
      del_icon: require("@static/icon/icon_close.png"),
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      bid_code: "",
      bid_id: "",
      radio: 1,
      auditInfo: "",
      rowIndex: 0,
      supply_id: "",
      dataSource: [],
      columns: [
        {
          title: "供应商名称",
          dataIndex: "supply_name",
          width: 150
        },
        {
          title: "审核情况",
          dataIndex: "status",
          width: 130,
          scopedSlots: { customRender: "operation" }
        }
      ],
      formData: {
        bid_code: "",
        bid_type_name: "",
        com_name: "",
        create_time: "",
        custom_code: "",
        decrypt_time: "",
        id: "",
        open_time: "",
        status: "",
        title: "",
        update_time: null
      },
      file_list:[],
      supply_info: {
        supply_name: "",
        legal_user_name: "",
        contact_name: "",
        contact_phone: "",
        email: "",
        address: "",
        fax: "",
        file_list: [],
        log_list: []
      },
      ModalVisible: false,
      
    };
  },
  filters: {
    status(key) {
      switch (key) {
        case "2":
          return "待审核";
          break;
        case "3":
          return "已驳回";
          break;
        default:
          return "通过";
          break;
      }
    }
  },
  created() {
    this.bid_code = this.$route.query.code;
    this.bid_id = this.$route.query.id;
    this.father.selectedKeys = ["/Bid/ask_purchase_list"];
    this.purchase_supply_list();
    get_bid_purchase_info(this.bid_id).then(res => {
      this.formData = res.data.bid_info;
    }).catch(error => this.$message.error(error));
  },
  methods: {
    purchase_supply_list() {
      purchase_supply_list(this.bid_id)
        .then(res => {
          if (!res.data) {
            this.$message.warn("暂无供应商申请获取");
            return;
          }
          this.dataSource = res.data || [];
          this.supply_id = res.data[0].supply_id;
          purchase_supply_info(this.bid_code, res.data[0].supply_id)
            .then(res2 => {
              this.supply_info = res2.data.supply_info;
            })
            .catch(error => this.$message.error(error));
        })
        .catch(error => this.$message.error(error));
    },
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.rowIndex = index;
            this.supply_id = record.supply_id;
            purchase_supply_info(this.bid_code, this.supply_id)
              .then(res2 => {
                this.supply_info = res2.data.supply_info;
              })
              .catch(error => this.$message.error(error));
          }
        }
      };
    },
    rowClassName(record, index) {
      if (index == this.rowIndex) return "rowClass";
    },
    save() {
      if (this.radio == 2 && !this.auditInfo) {
        this.$message.warn("请输入审核意见");
        return;
      }
      let obj = {
        bid_code: this.bid_code,
        supply_id: this.supply_id,
        status: this.radio,
        remark: this.auditInfo
      };
      audit_purchase_supply(obj)
        .then(res => {
          this.$message.success(res.msg);
          this.purchase_supply_list();
        })
        .catch(error => this.$message.error(error));
    },
    sendFile() {
      send_purchase_file(this.bid_code)
        .then(res => {
          this.$message.success(res.msg);
          let time = setTimeout(() => {
            clearTimeout(time);
          }, 1000);
        })
        .catch(error => this.$message.error(error));
    },
    failure() {
      this.ModalVisible = true;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_code: this.bid_code,
            file_list: this.file_list
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
          this.file_list.push(img_obj);
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
        this.file_list.splice(index, 1);
      }
    },
    print_scrap(){
      var LODOP=getLodop();
      LODOP.PRINT_INIT();
      var strFormHtml = document.querySelector('#scrap-record').outerHTML;
      var value = document.getElementById('reason').value;
      strFormHtml = strFormHtml.replace(/<textarea.*>.*<\/textarea>/ig,`<span>${value}</span>`)
      strFormHtml = strFormHtml.replace(/流标原因/ig,`流标原因：`)
      var strBodyStyle=`
      <style>
      table,td,th { border: 1 solid #000000;border-collapse:collapse;text-align: center }
      ul{list-style: none;}
      .ant-row{margin-bottom:10px}
      .ant-col-5{text-align:right}
      .ant-col-6,.ant-col-offset-1{margin-left:10mm}
      textarea{border:0}
      textarea::-webkit-scrollbar{width:0px !important;}
      .ant-col-5,.ant-col-4,.ant-col-6,.ant-col-18{display:inline-block}
      </style>`;
      LODOP.ADD_PRINT_HTM('15mm','10mm',"RightMargin:9mm","BottomMargin:9mm",strFormHtml+strBodyStyle);
      LODOP.PREVIEW();
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#check_purchase_info {
  @include component;
}
</style>
<style lang="scss">
.content {
  .get-situation {
    .ant-table-scroll {
      .ant-table-header,
      .ant-table-body {
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    h3 {
      border-bottom: 2px solid #f1f1f1;
    }
    .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
    .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
    .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
    .rowClass {
      background-color: $primary2;
      color: $white;
    }
    .left {
      @extend .p-10;
      border-right: 2px solid #f1f1f1;
    }
    .right {
      @extend .p-10;
      h4 {
        border-left: 4px solid $primary2;
        @extend .pl-10;
        @extend .ml-10;
      }
      .img_point {
        width: 8px;
        height: 8px;
        margin-bottom: 3px;
      }
      .wenjian {
        width: 17px;
        height: 17px;
      }
    }
    td {
      word-break: break-all;
    }
  }
}
</style>
<style lang="scss">
.failure-modal {
  .btn{
    @extend .absolute;
    right: 50px;
  }
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