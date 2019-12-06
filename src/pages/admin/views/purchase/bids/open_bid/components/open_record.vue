<template>
  <div id="open_record">
    <section class="content">
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        rowKey="supply_id"
      >
        <template slot="operation">
          <a-select defaultValue="1" disabled style="width: 120px">
            <a-select-option value="1">符合</a-select-option>
            <a-select-option value="2">不符合</a-select-option>
          </a-select>
        </template>
      </a-table>
    </section>
  </div>
</template>

<script>
import {
  get_judge_supply_list, // 获取参与评审供应商
  start_judge // 开启评审
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
      bid_code:this.$route.query.bid_code,
      dataSource: [],
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
          title: "开标情况",
          scopedSlots: { customRender: "operation" },
          width: "20%"
        }
      ],
    };
  },
  created() {
    this.father.current = 0;
    get_judge_supply_list(this.bid_code)
      .then(res => this.dataSource = res.data.list || [])
      .catch(error => this.$message.error(error));
  },
  methods: {
    next(){
      if(this.$store.getters.judgeStatus>=4){
        this.$router.push({path:'/Bid/judge_quality',query:{bid_code:this.bid_code}})
      }else{
        start_judge(this.bid_code).then(res => {
          this.$router.push({path:'/Bid/judge_quality',query:{bid_code:this.bid_code}})
        }).catch(error => this.$message.error(error));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
#open_record {
  @include content;
}
</style>