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
        <template slot="status" slot-scope="value">
          <span>{{value|status}}</span>
        </template>
        <template slot="operation" slot-scope="text,record">
          <!-- <div v-if="$moment()>$moment(record.open_time)"> -->
            <router-link
              v-if="priv.open_bid_list.open&&record.status==17"
              :to="{path:'/Bid/open_bid',query:{bid_code:record.code}}"
            >确认</router-link>
            <router-link
              v-if="priv.open_bid_list.open&&(record.status==15||record.status==16)"
              :to="{path:'/Bid/open_bid',query:{bid_code:record.code}}"
            >开标评标</router-link>
            <router-link
              v-if="priv.open_bid_list.view&&(record.status==18||record.status==20||record.status==21)"
              :to="{path:'/Bid/open_bid',query:{bid_code:record.code}}"
            >查看</router-link>
            <router-link
              v-if="priv.open_bid_list.view&&record.status==18"
              :to="{path:'/Bid/bid_result',query:{id:record.id}}"
            >中标信息</router-link>
            <a v-if="priv.open_bid_list.view&&record.status==20"
              @click="show_bid_fail(record.code)">
              流标信息
            </a>
            <a v-if="priv.open_bid_list.view&&record.status==21"
              @click="show_bid_fail(record.code)">
            流标信息</a>
            <router-link
              v-if="priv.open_bid_list.view&&record.status==21"
              :to="{path:'/Bid/scrap',query:{bid_code:record.code}}"
            >废标信息</router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
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
        <!-- <a-form-item class="text-center">
          <a-button class="mr-10" @click="ModalVisible = false">取消</a-button>
          <a-button class="ml-10" type="primary" html-type="submit">确定</a-button>
        </a-form-item> -->
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
      keyword: "",
      status: "",
      statusList: [
        { value: "0", label: "全部" },
        { value: "15", label: "待开标" },
        { value: "16", label: "评标中" },
        { value: "17", label: "待确认" },
        { value: "18", label: "已确认" },
        { value: "20,21", label: "已流标" }
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
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      ModalVisible:false,
      formData: {
        reason: "",
        file_list: []
      }
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
        case "17":
          return "待确认";
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
    show_bid_fail(bid_code){
      get_bid_fail({bid_code}).then(res=>{
        this.formData = res.data;
        this.ModalVisible = true;
      }).catch(error=>this.$message.error(error))
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
    }
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
