<template>
  <div id="open_bid_list">
    <h5>招标管理 / 开标评标管理</h5>
    <section class="content">
      <a-row>
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input
            class="pl-10"
            style="width: 65%"
            v-model="keyword"
            @keyup.13="open_bid_list_method2"
            placeholder="模糊搜索：项目名称/项目编号"
          />
        </a-col>
        <a-col :span="5">
          <span>状态：</span>
          <a-select
            allowClear
            v-model="status"
            dropdownMatchSelectWidth
            style="width: 74%"
            @change="open_bid_list_method2"
          >
            <a-select-option
              v-for="item of statusList"
              :value="item.value"
              :key="item.value"
            >{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span>采购方式：</span>
          <a-select
            allowClear
            v-model="bid_type"
            dropdownMatchSelectWidth
            style="width: 65%"
            @change="open_bid_list_method2"
          >
            <a-select-option
              v-for="item of bid_type_list"
              :value="item.value"
              :key="item.value"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-button @click="open_bid_list_method2" class="ml-10" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        rowKey="id"
      >
        <template slot="status" slot-scope="value,record">
          <span>{{value|status(record)}}</span>
        </template>
        <template slot="operation" slot-scope="text,record">
          <a
            v-if="priv.open_sbid_list.decrypt&&record.status==9"
            href="javascript:;"
            @click="showModal(record.bid_code)"
          >解密</a>
          <router-link
            v-if="priv.open_sbid_list.view&&record.status==14&&record.is_elect==1&&(record.bid_status!=20||record.bid_status!=21)"
            :to="{path:'/Sbid/bid_result',query:{id:record.bid_id}}"
          >
            中标信息
          </router-link>
          <a v-if="priv.open_sbid_list.view&&(record.bid_status==20||record.bid_status==21)&&(record.status==8||record.status==12)"
            @click="show_bid_fail(record.bid_code)">
            流标信息
          </a>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
    <a-modal
      class="supply-purchase-info"
      width="60%"
      :afterClose="afterClose"
      :destroyOnClose="false"
      :visible="ModalVisible"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      :footer="null"
    >
      <h3 slot="title" class="text-center">解密</h3>
      <div class="decrypt_time text-right">
        解密倒计时：{{decrypt_time}}
      </div>
      <a-form :form="form" @submit="handleSubmit">
        <h4>项目基本信息</h4>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="项目编号" v-bind="formItemLayout">
              <span>{{decrypt_info.base_info.custom_code}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="项目名称" v-bind="formItemLayout">
              <span>{{decrypt_info.base_info.title}}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="10" :offset="1">
            <a-form-item label="采购单位" v-bind="formItemLayout">
              <span>{{decrypt_info.base_info.com_name}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="采购方式" v-bind="formItemLayout">
              <span>{{decrypt_info.base_info.bid_type_name}}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <h4>解密信息</h4>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="单位名称" v-bind="formItemLayout">
              <span>{{decrypt_info.supply_info.supply_name}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="法定代表人" v-bind="formItemLayout">
              <span>{{decrypt_info.supply_info.legal_user_name}}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="联系人姓名" v-bind="formItemLayout">
              <a-input
                placeholder="请输入联系人姓名"
                v-decorator="[
              'contact_name',
              { rules: [{ required: true, message: '请输入入联系人姓名' }],initialValue:decrypt_info.supply_info.contact_name}
            ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="手机号" v-bind="formItemLayout">
              <a-input
                placeholder="请输入手机号"
                v-decorator="[
              'contact_phone',
              { rules: [{ required: true, message: '请输入手机号' }],initialValue:decrypt_info.supply_info.contact_phone}
            ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item
              label="投标上传时间"
              v-bind="formItemLayout"
            >{{decrypt_info.supply_info.submit_file_time}}</a-form-item>
          </a-col>
          <!-- <a-col :span="11">
            <a-form-item label="CA序列表" v-bind="formItemLayout">
              {{decrypt_info.supply_info.email}}
            </a-form-item>
          </a-col>-->
        </a-row>
        <a-form-item class="text-center" v-if="decrypt_info.supply_info.status!=3">
          <a-button class="mr-10" @click="ModalVisible = false">取消</a-button>
          <a-button class="ml-10" :disabled='decrypt_btn_ctrl' type="primary" html-type="submit">解密</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      class="failure-modal"
      :destroyOnClose="true"
      style="top: 10%;"
      width="55%"
      :visible="ModalVisibleFail"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisibleFail = false"
      @cancel="ModalVisibleFail = false"
      >
      <h3 class="text-center" slot="title">流标</h3>
      <a-form :form="form" @submit="handleSubmit">
        <h4>项目基本信息</h4>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">项目编号：</a-col>
          <a-col :span="4">{{modalData.custom_code}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">项目名称：</a-col>
          <a-col :span="4">{{modalData.title}}</a-col>
        </a-row>
        <a-row class="mb-10">
          <a-col :span="5" class="text-right" :offset="1">采购单位：</a-col>
          <a-col :span="4">{{modalData.com_name}}</a-col>
          <a-col :span="5" class="text-right" :offset="1">采购方式：</a-col>
          <a-col :span="4">{{modalData.bid_type_name}}</a-col>
        </a-row>
        <a-form-item label="流标原因" v-bind="formItemLayout">
          <a-textarea
            readOnly
            style="width:65%"
            :rows="4"
            placeholder="请输入流标原因"
            v-decorator="[
              'reason',
              { rules: [{ required: true, message: '请输入流标原因' }],initialValue:modalData.reason}
            ]"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="附件" v-bind="formItemLayout">
          <ul>
            <li
              class="file-list-item"
              v-for="(item,index) of modalData.file_list"
              :key="index"
            >
              <svg-icon class="wenjian" icon-class="wenjian" />
              <span class="ml-10 mr-10">{{item.file_name}}</span>
              <a :href="item.full_path" target="_blank">预览文件</a>
            </li>
          </ul>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  open_bid_list, // 开标评标列表
  get_decrypt_file, // 获取待解密文件列表
  decrypt_bid, // 解密文件
  get_decrypt_info // 获取解密详情
} from "@admin/api/open_bid_supply";
import { encryption } from "@/common/js/ESign";
import {
  get_bid_fail // 流标详情
} from "@admin/api/open_bid";
export default {
  props: {
    father: {
      type: Object
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
      keyword: "",
      status: "",
      statusList: [
        { value: "0", label: "全部" },
        { value: "8", label: "待开标" },
        { value: "9", label: "待解密" },
        { value: "10", label: "未解密" },
        { value: "12", label: "评标中" },
        { value: "13", label: "待采购方确认" },
        { value: "14", label: "评标结束" },
      ],
      bid_type: "0",
      bid_type_list: [{ value: "0", title: "全部" }],
      page: "",
      dataSource: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "项目编号",
          dataIndex: "custom_code",
          width: "10%"
        },
        {
          title: "项目名称",
          dataIndex: "title",
          width: "10%"
        },
        {
          title: "采购单位",
          dataIndex: "com_name",
          width: "10%"
        },
        {
          title: "采购方式",
          dataIndex: "bid_type_name",
          width: "10%"
        },
        {
          title: "采购类别",
          dataIndex: "cat_name",
          width: "10%"
        },
        {
          title: "开标时间",
          dataIndex: "open_time",
          width: "10%"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "20%"
        }
      ],
      total: 0,
      ModalVisible: false,
      bid_code: "",
      decrypt_info: {
        base_info: {
          bid_code: "", //单号
          custom_code: "",
          code: "", //单号
          title: "", //项目标题
          end_time: "", //获取截止时间
          open_time: "", //投标截止时间
          com_name: "", //项目单位
          bid_type_name: "" //公开招标方式
        },
        supply_info: {
          supply_name: "", //供应商名称
          legal_user_name: "", //法定代表人姓名
          contact_name: "", //采购人联系人
          contact_phone: "", //联系方式
          submit_file_time: "", //投标时间
          start_decrypt_time: "" //开始解密时间
        }
      },
      decrypt_time:null,
      decrypt_time_interval:null,
      decrypt_btn_ctrl:false,
      decrypt_file: [],
      decrypted_file: [],
      webSocketUrl: this.global.webSocketUrl,
      ws: null,
      heart_beat_interval: null,
      ping: null,
      ModalVisibleFail:false,
      modalData: {
        reason: "",
        file_list: []
      }
    };
  },
  filters: {
    status: (key,record)=>{
      if(record.bid_status==20||record.bid_status==21) return '已流标'
      switch (key) {
        case "8":
          return "待开标";
        case "9":
          return "待解密";
        case "10":
          return "未解密";
        case "12":
          return "评标中";
        case "13":
          return "待采购方确认";
        case "14":
          return "评标结束";
        default:
          return "未知状态";
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Sbid/open_bid_list"];
    this.status = this.$route.params.status || "0";
    this.get_tree_data();
    this.open_bid_list_method();
  },
  methods: {
    get_tree_data() {
      get_bid_type()
        .then(res => {
          this.bid_type_list = [
            ...this.bid_type_list,
            ...this.$common.treeSelectFormat(res.data)
          ];
        })
        .catch();
    },
    open_bid_list_method2() {
      this.page = 1;
      this.open_bid_list_method();
    },
    open_bid_list_method() {
      var params = {};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      open_bid_list(params)
        .then(res => {
          this.dataSource = res.data.list || [];
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.open_bid_list_method();
    },
    showModal(bid_code) {
      this.bid_code = bid_code;
      get_decrypt_info(bid_code)
        .then(res => {
          this.decrypt_info = res.data;
          (() => {
            var now_start = new Date().getTime() - new Date(this.decrypt_info.supply_info.start_decrypt_time).getTime();
            var decrypt_time = 30*60*1000 - now_start;
            var minute = parseInt(decrypt_time/(60*1000));
            var second = parseInt((decrypt_time-minute*(60*1000))/1000);
            if(minute>0||second>0){
              this.decrypt_time = `${minute}分${second}秒`
            }else{
              this.decrypt_btn_ctrl = true;
              this.decrypt_time = `0分0秒`
              clearInterval(this.decrypt_time_interval)
            }
          })()
          this.decrypt_time_interval = setInterval(() => {
            var now_start = new Date().getTime() - new Date(this.decrypt_info.supply_info.start_decrypt_time).getTime();
            var decrypt_time = 30*60*1000 - now_start;
            var minute = parseInt(decrypt_time/(60*1000));
            var second = parseInt((decrypt_time-minute*(60*1000))/1000);
            if(minute>0||second>0){
              this.decrypt_time = `${minute}分${second}秒`
            }else{
              this.decrypt_btn_ctrl = true;
              this.decrypt_time = `0分0秒`
              clearInterval(this.decrypt_time_interval)
            }
          }, 1000);
          this.$once('hook:beforeDestroy',() => {
            clearInterval(this.decrypt_time_interval);
          })
        })
        .catch(error => this.$message.error(error));
      get_decrypt_file(bid_code)
        .then(res => {
          this.decrypt_file = res.data || [];
        })
        .catch(error => this.$message.error(error));
      this.ModalVisible = true;
    },
    handleSubmit(e) {
      var self = this;
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_code: this.bid_code
          };
          var formData = {
            serverName: "{0DADE507-64D6-4306-956A-2ED144FF0ED1}",
            funcName: "DecryptDigitalEnvelope",
            param: `{"digitalEnvelopeB64":"${self.decrypt_file[0].secret}"}`
          };
          encryption(formData)
            .then(res => {
              if (res.data.result != "") {
                self.$message.info("解密中，请勿操作",5000);
                let obj = {
                  id: self.decrypt_file[0].id,
                  secret_key: res.data.result
                };
                self.decrypted_file = [...self.decrypted_file, obj];
                if(self.decrypt_file.length==1){ // 如文件长度为1，直接进行前后端交互
                  decrypt_bid({
                    bid_code: self.bid_code,
                    file_list: self.decrypted_file
                  })
                    .then(res => {
                      self.$message.success(res.msg);
                      let time = setTimeout(() => {
                        self.ModalVisible = false;
                        self.open_bid_list_method2();
                      }, 1500);
                    })
                    .catch(error => self.$message.error(error));
                }else{
                  self.decrypt_file.forEach((elem, i, arr) => {
                    if (i > 0) {
                      let formData = {
                        serverName: "{0DADE507-64D6-4306-956A-2ED144FF0ED1}",
                        funcName: "DecryptDigitalEnvelope",
                        param: `{"digitalEnvelopeB64":"${elem.secret}"}`
                      };
                      encryption(formData)
                        .then(res => {
                          let obj = {
                            id: elem.id,
                            secret_key: res.data.result
                          };
                          self.decrypted_file = [...self.decrypted_file, obj];
                          if (self.decrypted_file.length == arr.length) {
                            decrypt_bid({
                              bid_code: self.bid_code,
                              file_list: self.decrypted_file
                            })
                              .then(res => {
                                self.$message.success(res.msg);
                                let time = setTimeout(() => {
                                  self.ModalVisible = false;
                                  self.open_bid_list_method2();
                                }, 1500);
                              })
                              .catch(error => self.$message.error(error));
                          }
                        })
                        .catch(error => self.$message.error(error));
                    }
                  });
                }
              } else {
                self.$message.error("请检查是否插入U盾");
              }
            })
            .catch(error => self.$message.error("请输入口令后再次执行解密"));
        }
      });
    },
    afterClose() {
      this.decrypt_btn_ctrl = false;
      this.decrypted_file = [];
      clearInterval(this.decrypt_time_interval);
    },
    show_bid_fail(bid_code){
      get_bid_fail({bid_code}).then(res=>{
        this.modalData = res.data;
        this.ModalVisibleFail = true;
      }).catch(error=>this.$message.error(error))
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#open_bid_list {
  @include component;
}
</style>
<style lang="scss">
.supply-purchase-info {
  .decrypt_time{
    color: $danger;
    font-size: 20px;
  }
  h4 {
    border-left: 4px solid $primary2;
    @extend .pl-10;
    @extend .ml-10;
    @extend .mb-10;
  }
  .ant-col-4 {
    @extend .text-right;
  }
  .ant-input {
    @extend .pl-10;
  }
  .wenjian {
    width: 17px;
    height: 17px;
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
    padding-left: 5px;
  }
  .file-list-item {
    height: 20px;
    margin-top: 5px;
  }
}
</style>
