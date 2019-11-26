<template>
  <div id="judge_report">
    <section class="content">
      <a-tabs
        tabPosition="top"
        :activeKey="activeKey"
        @prevClick="callback"
        @nextClick="callback"
        @tabClick="callback($event)"
        :tabBarGutter="10"
      >
        <a-tab-pane v-for="item of judge_report" :key="item.user_id">
          <h4>报价情况</h4>
          <div slot="tab">{{item.username}}</div>
          <a-table
            class="table"
            :dataSource="item.report_info"
            :columns="columns"
            rowKey="supply_id"
          >
            <template slot="status" slot-scope="text">
              {{text==1?'符合':'不符合'}}
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </section>
  </div>
</template>

<script>
import {
  get_judge_report // 获取报价评审
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
      bid_code: this.$route.query.bid_code,
      activeKey: "",
      judge_report: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "供应商名称",
          dataIndex: "supply_name",
          width: "10%"
        },
        {
          title: "最终报价（万元）",
          dataIndex: "report_money",
          width: "10%"
        },
        {
          title: "报价是否有效",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        }
      ]
    };
  },
  created() {
    this.father.current = 7;
    get_judge_report(this.bid_code)
      .then(res => {
        this.judge_report = res.data || [];
        this.activeKey = res.data[0].user_id;
      })
      .catch(error => this.$message.error(error));
  },
  methods: {
    next() {
      this.$router.push({
        path: "/Bid/judge_result",
        query: { bid_code: this.bid_code }
      });
    },
    callback(name) {
      this.activeKey = name;
    },
    handleChange() {}
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
#judge_report {
  @include content;
}
</style>