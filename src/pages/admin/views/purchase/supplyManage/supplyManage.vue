<template>
  <div id="supplyManage">
    <h5>
      <span>供应商审核</span>
    </h5>
    <section class="content">
      <a-row>
        <a-col :span="7">
          <span>时间：</span>
          <a-range-picker
            style="width: 70%"
            v-model="rangePicker"
            format="YYYY-MM-DD"
            @change="get_apply_list_method2"
          />
        </a-col>
        <a-col :span="5">
          <span>大类：</span>
          <a-tree-select
            style="width:70%;"
            @change="get_apply_list_method2"
            v-model="cat_id"
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="cat_list"
            placeholder="请选择大类"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
          />
        </a-col>
        <a-col :span="4">
          <span>状态：</span>
          <a-select
            allowClear
            v-model="status"
            dropdownMatchSelectWidth
            style="width: 70%"
            @change="get_apply_list_method2"
          >
            <a-select-option
              v-for="item of statusList"
              :value="item.value"
              :key="item.value"
            >{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input
            style="width: 65%"
            v-model="keyword"
            @keyup.13="get_apply_list_method2"
            placeholder="模糊搜索：机构名称"
          />
        </a-col>
        <a-col :span="2">
          <a-button @click="get_apply_list_method2" type="primary">搜索</a-button>
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
        <template slot="supply_name" slot-scope="value,record">
          <router-link v-if="record.type==0" :to="{path:'/manageChangeDetail',query:{supply_id:record.supply_id,code:record.code}}">{{value}}</router-link>
          <router-link v-if="record.type==1" :to="{path:'/manageDetail',query:{supply_id:record.supply_id,code:record.code}}">{{value}}</router-link>
        </template>
        <template slot="operation" slot-scope="text,record">
          <router-link v-if="priv.apply_list.audit&&record.status==1&&record.type==0" :to="{path:'/aduitManageChange',query:{supply_id:record.supply_id,code:record.code}}">审核</router-link>
          <router-link v-if="priv.apply_list.view&&record.status==2&&record.type==0" :to="{path:'/manageChangeDetail',query:{supply_id:record.supply_id,code:record.code}}">已驳回</router-link>
          <router-link v-if="priv.apply_list.view&&record.status==3&&record.type==0" :to="{path:'/manageChangeDetail',query:{supply_id:record.supply_id,code:record.code}}">供应商撤回申请</router-link>
          <router-link v-if="priv.apply_list.view&&record.status==4&&record.type==0" :to="{path:'/manageChangeDetail',query:{supply_id:record.supply_id,code:record.code}}">查看</router-link>
          <router-link v-if="priv.apply_list.audit&&record.status==1&&record.type==1" :to="{path:'/aduitManage',query:{supply_id:record.supply_id,code:record.code}}">审核</router-link>
          <router-link v-if="priv.apply_list.view&&record.status==2&&record.type==1" :to="{path:'/manageDetail',query:{supply_id:record.supply_id,code:record.code}}">已驳回</router-link>
          <router-link v-if="priv.apply_list.view&&record.status==3&&record.type==1" :to="{path:'/manageDetail',query:{supply_id:record.supply_id,code:record.code}}">供应商撤回申请</router-link>
          <router-link v-if="priv.apply_list.view&&record.status==4&&record.type==1" :to="{path:'/manageDetail',query:{supply_id:record.supply_id,code:record.code}}">查看</router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import { get_apply_list } from "@admin/api/supplyManage";
import { all_category } from "@common/js/apis.js";

export default {
  props: {
    father: {
      type: Object,
      required:true
    }
  },
  data() {
    return {
      priv:this.$store.getters.priv,
      keyword: "",
      status: "0",
      statusList: [
        { value: "0", label: "全部" },
        { value: "1", label: "待审核" },
        { value: "2", label: "已驳回" },
        { value: "3", label: "撤销申请" },
        { value: "4", label: "已审核" }
      ],
      cat_id: "",
      rangePicker: [],
      page: 1,
      total:100,
      cat_list: [],
      dataSource: [
        {
          id: "11",
          supply_id: "5393",
          remark: null,
          status: "1", //状态 1：刚添加，待审核 2：被驳回，3撤销申请 4：已审核，生效
          create_time: "2019-09-12",
          supply_name: "斗战胜佛", //供应商名称
          cat_names: "果蔬类" //大类名称
        }
      ],
      columns: [
        {
          title: "编号",
          dataIndex: "supply_code",
          width: "10%",
          scopedSlots: { customRender: "supply_id" }
        },
        {
          title: "机构名称",
          dataIndex: "supply_name",
          width: "10%",
          scopedSlots: { customRender: "supply_name" }
        },
        {
          title: "大类",
          dataIndex: "cat_names",
          width: "40%"
        },
        {
          title: "创建时间",
          dataIndex: "create_time",
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
          width: "10%"
        }
      ],
    };
  },
  filters: {
    status: key => {
      switch (key) {
        case "1":
          return "待审核";
          break;
        case "2":
          return "已驳回";
          break;
        case "3":
          return "撤销申请";
          break;
        case "4":
          return "已审核";
          break;
        default:
          return "未知状态";
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["/supply/get_apply_list"];
    all_category()
    .then(res => {
      this.cat_list = this.$common.treeSelectFormat(res.data);
    }).catch();
    this.status = this.$route.params.status || '0';
    this.get_apply_list_method();
  },
  methods: {
    get_apply_list_method2() {
      this.page = 1;
      this.get_apply_list_method();
    },
    get_apply_list_method() {
      var params = {};
      params.keyword = this.keyword;
      params.start_date = this.rangePicker[0]
        ? this.rangePicker[0].format("YYYY-MM-DD")
        : "";
      params.end_date = this.rangePicker[1]
        ? this.rangePicker[1].format("YYYY-MM-DD")
        : "";
      params.status = this.status;
      params.page = this.page;
      params.cat_id = this.cat_id;
      get_apply_list(params)
        .then(res => {
          this.dataSource = res.data.list || [];
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.get_apply_list_method();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
@import "~@admin/assets/scss/supplyManage/supplyManage";
#supplyManage {
  @include component;
}
</style>