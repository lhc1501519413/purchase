<template>
  <div id="reg-change">
    <h5>
      <span>注册变更记录</span>
    </h5>
    <section class="content">
      <a-table :dataSource="change_list" :columns="columns" :pagination="false">
        <template slot="code" slot-scope="text, record">
          <router-link v-if="record.type==1" :to='{path:"/changeDetail",query:{code:record.code}}'>
            {{text}}
          </router-link>
          <router-link v-else :to='{path:"/changeRecord",query:{code:record.code}}'>
            {{text}}
          </router-link>
        </template>
        <template slot="status" slot-scope="text">
          {{text|status}}
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" v-model='page' @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import {
  change_list
} from "@admin/api/changeRecord";
export default {
  data() {
    return {
      change_list: [],
      people_type_list: [],
      cert_type_list: [],
      total: null,
      page:1,
      columns: [
        {
          title: "注册单号",
          dataIndex: "code",
          width: "10%",
          scopedSlots: { customRender: "code" }
        },
        {
          title: "变动日期",
          dataIndex: "create_time",
          width: "13%"
        },
        {
          title: "机构名称",
          dataIndex: "supply_name",
          width: "13%"
        },
        {
          title: "操作人",
          dataIndex: "realname",
          width: "13%"
        },
        {
          title: "意见",
          dataIndex: "mobile",
          width: "13%"
        },
        {
          title: "状态",
          dataIndex: "status",
          width: "13%",
          scopedSlots: { customRender: "status" }
        }
      ]
    };
  },
  filters: {
    status(value) {
      switch (value) {
        case 0:
          return "待提交";
          break;
        case 1:
          return "待入库";
          break;
        case 4:
          return "已入库";
          break;
        case '0':
          return "待提交";
          break;
        case '1':
          return "待入库";
          break;
        case '4':
          return "已入库";
          break;
        default:
          return "未知状态";
          break;
      }
    }
  },
  props:{
    father:{
      type:Object
    }
  },
  created() {
    this.father.selectedKeys = ['registerChange'];
    this.get_change_list();
  },
  methods: {
    get_change_list(page) {
      var page = page || 1;
      change_list(page).then(res => {
        let result = res.data.list ||[];
        result.forEach((elem, index) => {
          elem.key = index;
        });
        this.total = +res.data.total_count;
        this.change_list = result;
      });
    },
    paginationChange(page) {
      this.page = page;
      this.get_change_list(page);
    },
  }
};
</script>
<style lang="scss" scoped>
  @import '~@admin/assets/scss/common';
  @import '~@admin/assets/scss/registrationChangeRecord/registrationChangeRecord';
  #reg-change{
    @include component;
  }
</style>