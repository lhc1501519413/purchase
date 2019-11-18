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
          <router-link
            v-if="priv.open_bid_list.open&&(text.status==15||text.status==16)"
            :to="{path:'/Bid/open_bid',query:{status:record.status,bid_code:record.bid_code}}"
          >开标评标</router-link>
          <router-link
            v-if="priv.open_bid_list.view&&(text.status==18||text.status==20||text.status==21)"
            :to="{path:'/Bid/experts_draw',query:{status:record.status,bid_code:record.bid_code}}"
          >查看</router-link>
          <router-link
            v-if="priv.open_bid_list.view&&text.status==20"
            :to="{path:'/Bid/experts_draw',query:{status:record.status,bid_code:record.bid_code}}"
          >流标信息</router-link>
          <router-link
            v-if="priv.open_bid_list.view&&text.status==21"
            :to="{path:'/Bid/experts_draw',query:{status:record.status,bid_code:record.bid_code}}"
          >开标中流标信息</router-link>
          <router-link
            v-if="priv.open_bid_list.view&&text.status==21"
            :to="{path:'/Bid/experts_draw',query:{status:record.status,bid_code:record.bid_code}}"
          >开标中废标信息</router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import {
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  open_bid_list // 开标评标列表
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
        { value: "18", label: "已确认" },
        { value: "20,21", label: "已流标" }
      ],
      bid_type: "0",
      bid_type_list: [{ value: "0", title: "全部" }],
      page: "",
      dataSource: [
        {
          id: "2",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          code: "190920182116941657", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "15", //状态 8(待制作)采购文件待制作 9(待审核)采购文件待审核 10驳回 11【（>=11已审核）11采购公告已发布 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标】
          cat_id: "36", //大类ID
          cat_name: '果蔬类', //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "3",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          code: "190920182116941657", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "16", //状态 8(待制作)采购文件待制作 9(待审核)采购文件待审核 10驳回 11【（>=11已审核）11采购公告已发布 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标】
          cat_id: "36", //大类ID
          cat_name: '果蔬类', //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "4",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          code: "190920182116941657", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "18", //状态 8(待制作)采购文件待制作 9(待审核)采购文件待审核 10驳回 11【（>=11已审核）11采购公告已发布 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标】
          cat_id: "36", //大类ID
          cat_name: '果蔬类', //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "5",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          code: "190920182116941657", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "20", //状态 8(待制作)采购文件待制作 9(待审核)采购文件待审核 10驳回 11【（>=11已审核）11采购公告已发布 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标】
          cat_id: "36", //大类ID
          cat_name: '果蔬类', //大类名称
          open_time: "2019-11-11" //开标时间
        },
        {
          id: "6",
          title: "require", //标题
          custom_code: "用户自定义单号", //
          code: "190920182116941657", //单号
          com_name: "浙大饮食中心", //采购单位名称
          com_id: "1",
          bid_type: "1", //采购方式类型
          bid_type_name: "公开招标", //采购方式类型
          status: "21", //状态 8(待制作)采购文件待制作 9(待审核)采购文件待审核 10驳回 11【（>=11已审核）11采购公告已发布 15待开标 16评审中 17采购人确认中 18采购结果公告已发布 20流标】
          cat_id: "36", //大类ID
          cat_name: '果蔬类', //大类名称
          open_time: "2019-11-11" //开标时间
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
          width: "15%"
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
      total: 0
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
    this.status = this.$route.params.status || "0";
    this.get_tree_data();
    // this.open_bid_list_method();
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