<template>
  <div id="judge_match">
    <section class="content">
      <a-tabs
        tabPosition="top"
        :activeKey="activeKey"
        @prevClick="callback"
        @nextClick="callback"
        @tabClick="callback($event)"
        :tabBarGutter="10"
      >
        <a-tab-pane v-for="item of judge_match" :key='item.user_id'>
          <h4>符合性评审</h4>
          <div slot="tab">{{item.username}}</div>
          <a-table class="table" :dataSource="item.match_info" :columns="columns" rowKey="supply_id">
            <template slot="status" slot-scope="text">
              <a-select :defaultValue="text" disabled style="width: 120px">
                <a-select-option value="1">符合</a-select-option>
                <a-select-option value="2">不符合</a-select-option>
              </a-select>
            </template>
            <template slot="desc" slot-scope="text">
              <a-input :value="text" disabled></a-input>
            </template>
          </a-table>
          <h4>评审意见</h4>
          <div class="ml-20">
            【{{item.username}}】评审意见：{{item.opinion}}
          </div>
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
    this.refresh();
  },
  methods: {
    refresh(){
      get_judge_match(this.bid_code)
      .then(res => {
        this.judge_match = res.data || [];
        this.activeKey = res.data[0].user_id;
      })
      .catch(error => this.$message.error(error));
    },
    next() {
      if(this.$store.getters.judgeStatus>=6){
        this.$router.push({ path: "/Bid/judge_quality_grade", query:{bid_code: this.bid_code }});
      }else{
        this.$message.info('尚未进行到此阶段')
      }
    },
    callback(name) {
      this.activeKey = name;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
#judge_match {
  @include content;
}
</style>