<template>
  <div id="spurchase_list">
    <h5>获取采购文件 / 采购文件管理</h5>
    <section class="content">
      <search-condition
        ref="condition"
        @change-data="spurchase_list_method2"
        :statusKey="status"
        :statusList="statusList"
        :bid_type_list="bid_type_list"
        :father="this"
      ></search-condition>
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        rowKey="id"
      >
        <template slot="status" slot-scope="value">
          <span>{{value|status}}</span>
        </template>
        <template slot="operation" slot-scope="text">
          <div v-if="text.status==1||text.status==3"><!-- 待获取，已驳回 -->
            <router-link :to="{path:'/sbidDetail',query:{id:text.bid_id}}">查看项目</router-link>
            <a @click="get_supply_purchase_info(text.bid_code)" href="javascript:;">获取</a>
          </div>
          <div v-if="text.status==2||text.status==4||text.status==20"><!-- 待审核，待采购方发送，已流标 -->
            <router-link :to="{path:'/sbidDetail',query:{id:text.bid_id}}">查看项目</router-link>
          </div>
          <div v-if="text.status==5"><!-- 已获取 -->
            <router-link :to="{path:'/sbidDetail',query:{id:text.bid_id}}">查看项目</router-link>
            <a @click="download(text.bid_id)" href="javascript:;">下载采购文件</a>
          </div>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
    <a-modal
      class="supply-purchase-info"
      width="60%"
      :destroyOnClose="false"
      :visible="ModalVisible"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      :footer="null"
      >
      <div slot="title" class="text-center">获取采购文件</div>
      <h4>项目基本信息</h4>
      <a-row class="mb-10">
        <a-col :span="4">项目编号：</a-col>
        <a-col :span="7">{{supply_purchase_info.base_info.custom_code}}</a-col>
        <a-col :span="4">项目名称：</a-col>
        <a-col :span="7">{{supply_purchase_info.base_info.title}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="4">获取截止时间：</a-col>
        <a-col :span="7">{{supply_purchase_info.base_info.end_time}}</a-col>
        <a-col :span="4">投标截止时间：</a-col>
        <a-col :span="7">{{supply_purchase_info.base_info.open_time}}</a-col>
      </a-row>
      <h4>供应商信息</h4>
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="单位名称" v-bind="formItemLayout">
              <span>{{supply_purchase_info.supply_info.supply_name}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="法定代表人" v-bind="formItemLayout">
              <span>{{supply_purchase_info.supply_info.legal_user_name}}</span>
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
              { rules: [{ required: true, message: '请输入证件编号' }],initialValue:supply_purchase_info.supply_info.contact_name}
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
              { rules: [{ required: true, message: '请输入手机号' }],initialValue:supply_purchase_info.supply_info.contact_phone}
            ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="邮箱" v-bind="formItemLayout">
              <a-input
                placeholder="请输入邮箱"
                v-decorator="[
              'email',
              { rules: [{ required: true, message: '请输入邮箱' }],initialValue:supply_purchase_info.supply_info.email}
            ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="地址" v-bind="formItemLayout">
              <a-input
                placeholder="请输入地址"
                v-decorator="[
              'address',
              { rules: [{ required: true, message: '请输入地址' }],initialValue:supply_purchase_info.supply_info.address}
            ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="传真" v-bind="formItemLayout">
              <a-input
                placeholder="请输入传真"
                v-decorator="[
                  'fax',
                  { initialValue:supply_purchase_info.supply_info.fax}
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="附件" v-bind="formItemLayout">
              <a-upload
                :showUploadList="false"
                :customRequest="customRequest"
                :beforeUpload="beforeUpload"
                v-decorator="[
                  'file_list',
                  { rules: [{ required: true, message: '请选择附件' }],initialValue:supply_purchase_info.supply_info.file_list }
                ]"
                >
                <a-button>
                  <a-icon type="upload" />上传
                </a-button>
                <ul>
                  <li
                    @click.stop="del"
                    v-for="(item,index) of supply_purchase_info.supply_info.file_list"
                    :key="index"
                    class="mt-10"
                    >
                    <svg-icon class="wenjian" icon-class="wenjian" />
                    <span>{{item.file_name}}</span>
                    <img :src="del_icon" alt="删除" class="wenjian" :data-key="index" />
                  </li>
                </ul>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <h4 v-if="supply_purchase_info.supply_info.log_list">流转日志</h4>
        <ul class="ml-30">
          <li class="mt-10" v-for="(item,index) of supply_purchase_info.supply_info.log_list" :key='index'>
            <p>操作人员：{{item.com_id!=0?item.com_name:item.supply_name}}</p>
            <p v-if="item.com_id!=0">审核时间：{{item.create_time}}</p>
            <p v-else>提交时间：{{item.create_time}}</p>
            <p v-if="item.com_id!=0">审核结果：{{item.desc}}</p>
            <p v-if="item.com_id!=0">审核意见：{{item.remark}}</p>
          </li>
        </ul>
        <a-form-item class="text-center" v-if="supply_purchase_info.supply_info.status!=3">
          <a-button class="mr-10" @click="ModalVisible = false">取消</a-button>
          <a-button class="ml-10" type="primary" html-type="submit">确定</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      class="supply-purchase-info"
      width="60%"
      :destroyOnClose="false"
      :visible="ModalVisibleFile"
      @ok="ModalVisibleFile = false"
      @cancel="ModalVisibleFile = false"
      :footer="null"
      >
      <div slot="title" class="text-center">下载采购文件</div>
      <a-table 
        bordered 
        :dataSource="fileList" 
        :columns="columnsFile" 
        rowKey='id' 
        :pagination="pagination"
        :scroll="{ y: 300 }"
        >
        <template slot="operation" slot-scope="text">
          <a href="javascript:;" @click="downloadFile(text.full_path)">下载源文件</a>
        </template>
      </a-table>
      <div class="text-right">
        <a-button class="mr-10" @click="ModalVisibleFile = false">取消</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  spurchase_list, // 采购文件列表
  get_supply_purchase_info, // 获取获取采购文件信息
  save_supply_purchase // 保存 获取采购文件信息
} from "@admin/api/bidsSupply";
import {
  get_bid_purchase_file // 获取附件列表
} from "@admin/api/bids";
import { POST } from "@common/js/apis";
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
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      del_icon: require("@static/icon/icon_close.png"),
      keyword: "",
      status: "0",
      statusList: [
        { value: "0", label: "全部" },
        { value: "1", label: "待获取" },
        { value: "2", label: "待审核" },
        { value: "3", label: "已驳回" },
        { value: "4", label: "待采购方发送" },
        { value: "5", label: "已获取" },
        { value: "20", label: "已流标" },
      ],
      bid_type: "",
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
          width: "15%"
        },
        {
          title: "采购类别",
          dataIndex: "cat_name",
          width: "15%"
        },
        {
          title: "开标时间",
          dataIndex: "open_time",
          width: "15%"
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
      supply_purchase_info: {
        base_info: {
          bid_code: "", //单号
          custom_code: "",
          code: "", //单号
          title: "", //项目标题
          end_time: "", //获取截止时间
          open_time: "", //投标截止时间
          shipping_days: "", //配送时间
          bid_type: "", //公开招标方式
          bid_type_name: "" //公开招标方式
        },
        supply_info: {
          supply_name: "", //供应商名称
          legal_user_name: "", //法定代表人姓名
          email: "", //邮箱
          contact_name: "", //采购人联系人
          contact_phone: "", //联系方式
          fax: "", //传真
          address: "", //地址
          fileList:[], // 附件列表
          log_list: [{ // 审核意见
              bid_code: "",
              desc: "",
              remark: "",
              supply_name: "",
              username: "",
              com_name: "",
              create_time: "",
          }],
        },
      },
      ModalVisibleFile:false,
      columnsFile:[
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "文件名称",
          dataIndex: "file_name",
          width: "70%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "20%"
        }
      ],
      fileList: [
        {
          id: "",
          file_name: "", //文件名称
          file_path: "", //半路径
          full_path: "" //全路径
        }
      ],
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          return `共${this.fileList.length}条数据`;
        }
      },
    };
  },
  filters: {
    status: key => {
      switch (key) {
        case "1":
          return "待获取";
          break;
        case "2":
          return "待审核";
          break;
        case "3":
          return "已驳回";
          break;
        case "4":
          return "待采购方发送";
          break;
        case "5":
          return "已获取";
          break;
        case "20":
          return "已流标";
          break;
        default:
          return "未知状态";
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Sbid/spurchase_list"];
    this.status = this.$route.params.status || "0";
    this.spurchase_list_method();
    this.get_tree_data();
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
    spurchase_list_method2() {
      this.page = 1;
      this.keyword = this.$refs.condition.keyword;
      this.status = this.$refs.condition.status;
      this.bid_type = this.$refs.condition.bid_type;
      this.spurchase_list_method();
    },
    spurchase_list_method() {
      var params = {};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      spurchase_list(params)
        .then(res => {
          this.dataSource = res.data.list||[];
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.spurchase_list_method();
    },
    get_supply_purchase_info(bid_code) {
      this.bid_code = bid_code;
      get_supply_purchase_info(bid_code)
        .then(res => {
          this.supply_purchase_info = res.data;
          this.supply_purchase_info.supply_info.file_list = res.data.supply_info.file_list||[];
          this.ModalVisible = true;
        })
        .catch(error => this.$message.error(error));
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_code: this.bid_code,
            file_list: this.supply_purchase_info.supply_info.file_list
          };
          save_supply_purchase(values)
            .then(res => {
              this.$message.success(res.msg);
              this.ModalVisible = false;
              this.spurchase_list_method();
            })
            .catch(error => {
              this.$message.error(error);
            });
        }
      });
    },
    download(bid_id) {
      get_bid_purchase_file(bid_id)
        .then(res => {
          this.fileList = res.data||[];
          this.ModalVisibleFile = true;
        })
        .catch(error => this.$message.error(error));
    },
    downloadFile(full_path){
      open(full_path)
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
    customRequest(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          let img_obj = {};
          img_obj.file_name = res.data.name;
          img_obj.file_path = res.data.savepath;
          this.supply_purchase_info.supply_info.file_list.push(img_obj)
          this.$forceUpdate();
        }).catch();
    },
    del(e) {
      let index = e.target.dataset.key;
      if (index !== undefined) {
        this.supply_purchase_info.supply_info.file_list.splice(index, 1);
        this.$forceUpdate();
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#spurchase_list {
  @include component;
}
</style>
<style lang="scss">
.supply-purchase-info {
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