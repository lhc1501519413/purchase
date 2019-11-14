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
          <router-link v-if="record.status!=1" :to="{path:'/judge'}">评审</router-link>
          <a @click="sign(index)" v-if="record.status==1" href="javascript:;">签到</a>
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
      <h4>项目基本信息</h4>
      <a-row class="mb-10">
        <a-col :span="4">项目编号：</a-col>
        <a-col :span="7">{{judge_info.custom_code}}</a-col>
        <a-col :span="4">项目名称：</a-col>
        <a-col :span="7">{{judge_info.title}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="4">采购单位：</a-col>
        <a-col :span="7">{{judge_info.com_name}}</a-col>
        <a-col :span="4">采购方式：</a-col>
        <a-col :span="7">{{judge_info.bid_type_name}}</a-col>
      </a-row>
      <h4>专家基本信息</h4>
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="10" :offset="1">
            <a-form-item label="专家名称" v-bind="formItemLayout">
              <span>{{judge_info.name}}</span>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="单位" v-bind="formItemLayout">
              <a-input
                placeholder="请输入单位名称"
                v-decorator="[
                  'com',
                  { rules: [{ required: true, message: '请输入单位名称' }],initialValue:judge_info.com}
                ]"
              />
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
                  { rules: [{ required: true, message: '请输入联系人姓名' }],initialValue:judge_info.contact_name}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="联系电话" v-bind="formItemLayout">
              <a-input
                placeholder="请输入联系电话"
                v-decorator="[
                  'contact_phone',
                  { rules: [{ required: true, message: '请输入联系电话' }],initialValue:judge_info.contact_phone}
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
  </div>
</template>

<script>
import { bid_list, sign_judge, get_sign_info } from "@admin/api/judge";
import {
  get_bid_type // 采购方式
} from "@common/js/apis";
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
      status: "0",
      statusList: [
        { value: "0", label: "全部" },
        { value: "1", label: "待开标" },
        { value: "2", label: "待签到" },
        { value: "3", label: "待评审" },
        { value: "4", label: "已流标" },
        { value: "5", label: "评审结束" }
      ],
      bid_type: "",
      bid_type_list: [{ value: "0", title: "全部" }],
      page: "",
      dataSource: [
        {
          id: "2",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          bid_code: "190920182116941657", //单号
          com_code: "zdyszx",
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          status: "1", //status 1未签到2已签到
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          bid_status: "1", //状态 1 待提交（编辑）2待审核 3项目驳回 8(审核通过)采购文件待制作 9采购文件待审核 10采购文件已驳回 11采购公告已发布 15待开标 16评审中 17采购人确认中 18采购结果公告已发布
          cat_id: "36", //大类ID
          cat_name: '果蔬类', //大类名称
          open_time: "2019-11-110 :15:20:00" //实际开标时间
        },
        {
          id: "3",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          bid_code: "190920182116941657", //单号
          com_code: "zdyszx",
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          status: "2",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          bid_status: "1", //状态 1 待提交（编辑）2待审核 3项目驳回 8(审核通过)采购文件待制作 9采购文件待审核 10采购文件已驳回 11采购公告已发布 15待开标 16评审中 17采购人确认中 18采购结果公告已发布
          cat_id: "36", //大类ID
          cat_name: '鲜肉类', //大类名称
          open_time: "2019-11-110 :15:20:00" //实际开标时间
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
      judge_info:{},
      ModalVisible:false,
    };
  },
  filters: {
    status: key => {
      switch (key) {
        case "1":
          return "待开标";
          break;
        case "2":
          return "待签到";
          break;
        case "3":
          return "待评审";
          break;
        case "4":
          return "已流标";
          break;
        case "5":
          return "评审结束";
          break;
        default:
          return "未知状态";
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Judge/bid_list"];
    this.status = this.$route.params.status || "0";
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
          // this.dataSource = res.data.list||[];
          // this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
          };
        }
      });
    },
    paginationChange(page) {
      this.page = page;
      this.bid_list_method();
    },
    sign(index) {
      this.judge_info = this.dataSource[index];
      this.judge_info.name='lilith';
      this.judge_info.com='特斯拉是爱迪生坑毁了';
      this.judge_info.contact_name='adam';
      this.judge_info.contact_phone='13312345678';
      this.ModalVisible = true;
    }
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
</style>