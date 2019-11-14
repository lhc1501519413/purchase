<template>
  <div id="supplyManage">
    <h5>
      <span>供应商列表</span>
    </h5>
    <section class="content">
      <a-row>
        <a-col :span="7">
          <span>时间：</span>
          <a-range-picker
            style="width: 70%"
            v-model="rangePicker"
            format="YYYY-MM-DD"
            @change="get_supply_list_method2"
          />
        </a-col>
        <a-col :span="5">
          <span>大类：</span>
          <a-tree-select
            style="width:70%;"
            @change="get_supply_list_method2"
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
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input
            style="width: 65%"
            v-model="keyword"
            @keyup.13="get_supply_list_method2"
            placeholder="模糊搜索：机构名称"
          />
        </a-col>
        <a-col :span="2">
          <a-button @click="get_supply_list_method2" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        rowKey="id"
      >
        <template slot="supply_name" slot-scope="value,record">
          <router-link v-if="priv.supply_list.view" :to="{path:'/supplyDetail',query:{supply_id:record.supply_id}}">{{value}}</router-link>
          <span v-else>{{value}}</span>
        </template>
        <!-- <template slot="operation" slot-scope="text,record">
          <router-link v-show="record.status==1" :to="{path:'/aduitManage',query:{supply_id:text.supply_id}}">审核</router-link>
          <router-link v-show="record.status==2" :to="{path:'/manageDetail',query:{supply_id:text.supply_id}}">已驳回</router-link>
          <router-link v-show="record.status==3" :to="{path:'/manageDetail',query:{supply_id:text.supply_id}}">供应商撤回申请</router-link>
          <router-link v-show="record.status==4" :to="{path:'/manageDetail',query:{supply_id:text.supply_id}}">查看</router-link>
        </template> -->
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import { get_supply_list } from "@admin/api/supplyManage";
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
      cat_id: "",
      rangePicker: [],
      page: 1,
      total:100,
      cat_list: [],
      dataSource: [],
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
        }
      ],
    };
  },
  created() {
    this.father.selectedKeys = ["/Apply/get_supply_list"];
    all_category()
    .then(res => {
      this.cat_list = this.$common.treeSelectFormat(res.data);
    }).catch();
    this.get_supply_list_method();
  },
  methods: {
    get_supply_list_method2() {
      this.page = 1;
      this.get_supply_list_method();
    },
    get_supply_list_method() {
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
      get_supply_list(params)
        .then(res => {
          this.dataSource = res.data.list || [];
          this.total = +res.data.total_count;
        })
        .catch(error => this.$message.error(error));
    },
    paginationChange(page) {
      this.page = page;
      this.get_supply_list_method();
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