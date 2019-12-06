<template>
  <div id="experts_draw_list">
    <h5>招标管理 / 专家抽取</h5>
    <section class="content">
      <a-row>
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input
            class="pl-10"
            style="width: 65%"
            v-model="keyword"
            @keyup.13="experts_draw_list_method2"
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
            @change="experts_draw_list_method2"
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
            @change="experts_draw_list_method2"
          >
            <a-select-option
              v-for="item of bid_type_list"
              :value="item.value"
              :key="item.value"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span>抽取类型：</span>
          <a-select
            allowClear
            v-model="draw_type"
            dropdownMatchSelectWidth
            style="width: 65%"
            @change="experts_draw_list_method2"
          >
            <a-select-option
              v-for="item of draw_type_list"
              :value="item.value"
              :key="item.value"
            >{{item.title}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-button @click="experts_draw_list_method2" class="ml-10" type="primary">搜索</a-button>
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
          <router-link v-if="text.status==2" :to="{path:'/Bid/experts_draw',query:{status:record.status,bid_code:record.bid_code}}">
            查看
          </router-link>
          <router-link v-else :to="{path:'/Bid/experts_draw',query:{status:record.status,bid_code:record.bid_code}}">
            抽取
          </router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import {
  get_bid_type, // 采购方式
  get_draw_type // 抽取类型
} from "@common/js/apis";
import {
  experts_draw_list // 招标列表
} from "@admin/api/expert";
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
        { value: "1", label: "待抽取" },
        { value: "2", label: "已抽取" }
      ],
      bid_type: "0",
      bid_type_list: [{ value: "0", title: "全部" }],
      draw_type: "0",
      draw_type_list: [{ value: "0", title: "全部" }],
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
          title: "抽取类型",
          dataIndex: "draw_type_name",
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
      total: 0
    };
  },
  filters: {
    status: key => {
      switch (key) {
        case "1":
          return "待抽取";
          break;
        case "2":
          return "已抽取";
          break;
        default:
          return "未知状态";
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/Bid/experts_draw_list"];
    this.status = this.$route.params.status || "0";
    this.get_tree_data();
    this.experts_draw_list_method();
  },
  methods: {
    get_tree_data() {
      get_bid_type().then(res => {
        this.bid_type_list = [
          ...this.bid_type_list,
          ...this.$common.treeSelectFormat(res.data)
        ];
      }).catch();
      get_draw_type().then(res => {
        this.draw_type_list = [
          ...this.draw_type_list,
          ...this.$common.treeSelectFormat(res.data)
        ];
      }).catch();
    },
    experts_draw_list_method2() {
      this.page = 1;
      this.experts_draw_list_method();
    },
    experts_draw_list_method() {
      var params = {};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      params.draw_type = this.draw_type;
      experts_draw_list(params)
        .then(res => {
          this.dataSource = res.data.list || [];
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.experts_draw_list_method();
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#experts_draw_list {
  @include component;
}
</style>