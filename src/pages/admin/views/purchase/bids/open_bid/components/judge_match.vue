<template>
  <div id="judge_match">
    <section class="content">
      <h4>符合性评审</h4>
      <a-tabs
        tabPosition="top"
        :activeKey="activeKey"
        @prevClick="callback"
        @nextClick="callback"
        @tabClick="callback($event)"
        :tabBarGutter="10"
      >
        <a-tab-pane v-for="item of judge_match" :key='item.user_id'>
          <div slot="tab">{{item.username}}</div>
          <a-table class="table" :dataSource="item.match_info" :columns="columns" rowKey="supply_id">
            <template slot="status" slot-scope="text">
              <a-select :defaultValue="text" disabled style="width: 120px" @change="handleChange">
                <a-select-option value="1">符合</a-select-option>
                <a-select-option value="2">不符合</a-select-option>
              </a-select>
            </template>
            <template slot="desc" slot-scope="text">
              <a-input :value="text" disabled></a-input>
            </template>
          </a-table>
          <h4>评审意见</h4>
          <a-row>
            <a-col :span="3" class="text-right" >【{{item.username}}】评审意见：</a-col>
            <a-col :span="13">
              {{item.opinion}}
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </section>
  </div>
</template>

<script>
import {
  get_judge_match // 获取参与评审供应商
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
      activeKey: "1",
      judge_match: [],
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
          title: "符合性评审",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        },
        {
          title: "说明",
          dataIndex: "desc",
          scopedSlots: { customRender: "desc" },
          width: "20%"
        }
      ]
    };
  },
  created() {
    this.father.current = 2;
    get_judge_match(this.bid_code)
      .then(res => {
        this.judge_match = res.data || [];
        this.activeKey = res.data[0].user_id;
      })
      .catch(error => this.$message.error(error));
  },
  methods: {
    next() {
      this.$router.push({ path: "/Bid/judge_quality_grade", query:{bid_code: this.bid_code }});
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
#judge_match {
  @include content;
}
</style>