<template>
  <div id="judge">
    <h5>项目评审 / 招标项目评审</h5>
    <section class="content">
      <search-condition
        ref="condition"
        @change-data="bid_list_method2"
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
        <template slot="operation" slot-scope="text,record,index">
          <a v-if="record.bid_status==20||record.bid_status==21"
            @click="show_bid_fail(record.bid_code)">
            流标信息
          </a>
          <div v-else>
            <span v-if="record.status==0">待开标</span>
            <a @click="sign(index)" v-if="record.status==1" href="javascript:;">签到</a>
            <a @click="check_judge(record.bid_code)" v-if="record.status==2" href="javascript:;">评审</a>
            <router-link v-if="record.status==3" :to="{path:'/judge',query:{bid_code:record.bid_code}}">评审</router-link>
            <router-link v-if="record.status==14" :to="{path:'/judge',query:{bid_code:record.bid_code}}">评审完成</router-link>
          </div>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
    <a-modal
      class="judge-sign"
      width="60%"
      :destroyOnClose="false"
      :visible="ModalVisible"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      :footer="null"
    >
      <div slot="title" class="text-center">专家签到</div>
      <a-form :form="form" @submit="handleSubmit">
        <h4>项目基本信息</h4>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="项目编号" v-bind="formItemLayout">{{judge_info.custom_code}}</a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="项目名称" v-bind="formItemLayout">{{judge_info.title}}</a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="采购单位" v-bind="formItemLayout">{{judge_info.com_name}}</a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="采购方式" v-bind="formItemLayout">{{judge_info.bid_type_name}}</a-form-item>
          </a-col>
        </a-row>
        <h4>专家基本信息</h4>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="专家姓名" v-bind="formItemLayout">
              {{sign_info.realname}}
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="专家单位" v-bind="formItemLayout">
              <a-input
                placeholder="请输入专家单位"
                v-decorator="[
                  'org',
                  { rules: [{ required: true, message: '请输入专家单位' }],initialValue:sign_info.org}
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="专家职称" v-bind="formItemLayout">
              <a-input
                placeholder="请输入专家职称"
                v-decorator="[
                  'situation',
                  { rules: [{ required: true, message: '请输入专家职称' }],initialValue:sign_info.situation}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="联系电话" v-bind="formItemLayout">
              <a-input
                placeholder="请输入联系电话"
                v-decorator="[
                  'contact_number',
                  { rules: [{ required: true, message: '请输入联系电话' }],initialValue:sign_info.contact_number}
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item class="text-center">
          <a-button class="mr-10" @click="ModalVisible = false">取消</a-button>
          <a-button class="ml-10" type="primary" html-type="submit">确定</a-button>
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
        <a-button type='primary' class="btn" @click="print_scrap">打印流标信息</a-button>
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
          <a-form-item label="流标原因" v-bind="formItemLayout">
            <a-textarea
              readOnly
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
          <ul>
            <li
              class="file-list-item"
              v-for="(item,index) of formData.file_list"
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
  bid_list, // 招标列表
  sign_judge,  // 签到
  get_sign_info,  // 签到信息
  open_judge // 专家开启评审
} from "@admin/api/judge";
import {
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  get_bid_fail // 流标详情
} from "@admin/api/open_bid";
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
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      priv: this.$store.getters.priv,
      keyword: "",
      status: "",
      statusList: [
        { value: "", label: "全部" },
        { value: "0", label: "待开标" },
        { value: "1", label: "待签到" },
        { value: "2", label: "待评审" },
        { value: "3", label: "评标中" },
        { value: "20,21", label: "已流标" },
        { value: "14", label: "评审结束" }
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
          width: "10%"
        },
        {
          title: "评审时间",
          dataIndex: "open_time",
          width: "10%"
        },
        {
          title: "采购类别",
          dataIndex: "cat_name",
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
          width: "15%"
        }
      ],
      total: 10,
      judge_info: {},
      sign_info: {},
      ModalVisible: false,
      ModalVisibleFail:false,
      formData: {
        reason: "",
        file_list: []
      }
    };
  },
  filters: {
    status: key => {
      switch (key) {
        case "0":
          return "待开标";
        case "1":
          return "待签到";
        case "2":
          return "待评审";
        case "3":
          return "评标中";
        case "14":
          return "评审结束";
        case "20":
          return "已流标";
        case "21":
          return "已流标";
        default:
          return "未知状态";
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Judge/bid_list"];
    this.status = this.$route.params.status || "";
    this.bid_list_method();
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
    bid_list_method2() {
      this.page = 1;
      this.keyword = this.$refs.condition.keyword;
      this.status = this.$refs.condition.status;
      this.bid_type = this.$refs.condition.bid_type;
      this.bid_list_method();
    },
    bid_list_method() {
      var params = {};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      bid_list(params)
        .then(res => {
          this.dataSource = res.data.list || [];
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.bid_list_method();
    },
    sign(index) {
      this.judge_info = this.dataSource[index];
      get_sign_info(this.judge_info.bid_code).then(res=>{
        this.sign_info = res.data;
        this.ModalVisible = true;
      }).catch(error => this.$message.error(error));
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            bid_code:this.judge_info.bid_code
          };
          sign_judge(values).then(res=>{
            this.bid_list_method2();
            this.ModalVisible = false;
          }).catch(error => this.$message.error(error));
        }
      });
    },
    check_judge(bid_code){
      open_judge(bid_code).then(res=>{
        this.$router.push({path:'/judge',query:{bid_code}})
      }).catch(error => this.$message.warn(error));
    },
    show_bid_fail(bid_code){
      get_bid_fail({bid_code}).then(res=>{
        this.formData = res.data;
        this.ModalVisibleFail = true;
      }).catch(error=>this.$message.error(error))
    },
    print_scrap(){
      var LODOP=getLodop();
      if(!LODOP) return;
      LODOP.PRINT_INIT();
      var strFormHtml = document.querySelector('#scrap-record').outerHTML;
      var value = document.getElementById('reason').value;
      strFormHtml = strFormHtml.replace(/<textarea.*>.*<\/textarea>/ig,`<span class='textarea'>${value}</span>`)
      strFormHtml = strFormHtml.replace(/流标原因/ig,`流标原因：`)
      strFormHtml = strReplace(strFormHtml,'class',/.*ant-col-4.*>.*<\/div>/ig,'<br/>')
      function strReplace(str,key,reg,value){
        var arr = str.split(key);
        var arr2 = arr.map(elem=>{
          return elem = elem.replace(reg, function (e) {
            let index  = e.indexOf('</div></div>');
            if(index!=-1){
              let string1 = e.slice(0,index)
              let string2 = e.slice(index)
              return string1 + value + string2
            }else{
              return e + value
            }
          })
        })
        var str2 = arr2.join(key)
        return str2
      }
      var strBodyStyle=`
      <style>
      table,td,th { border: 1 solid #000000;border-collapse:collapse;text-align: center }
      ul{list-style: none;}
      .ant-col-5{text-align:right}
      .ant-col-6,.ant-col-offset-1{margin-left:10mm}
      .textarea{border:0;word-wrap:break-word;display:inline-block;overflow-wrap:break-word}
      .ant-form-item-label{white-space: nowrap;}
      .ant-form-item{display:flex;align-items:flex-start;justify-content: flex-start;}
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
#judge {
  @include component;
}
</style>
<style lang="scss">
.judge-sign {
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
}
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
    padding-left: 5px;
  }
  .file-list-item {
    height: 20px;
    margin-top: 5px;
  }
}
</style>
