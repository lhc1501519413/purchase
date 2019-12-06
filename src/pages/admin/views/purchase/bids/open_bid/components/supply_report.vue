<template>
  <div class="supply_report">
    <section class="content">
      <a-table class="table" :dataSource="supply_report" :columns="columns" rowKey="supply_id">
        <template slot="report_money" slot-scope='text'>
          {{text}}万元
        </template>
      </a-table>
    </section>
  </div>
</template>

<script>
import {
  get_supply_report, // 获取商务技术评分汇总
  open_report_file, // 开启报价文件
  open_report_judge // 开启报价评审
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
      supply_report: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "供应商名称",
          dataIndex:'supply_name',
          width: "10%",
        },
        {
          title: "最终报价（元）",
          width: "10%",
          dataIndex:'report_money',
          scopedSlots:{ customRender:'report_money' }
        }
      ],
    };
  },
  created() {
    this.father.current = 6;
    this.get_supply_report();
  },
  methods: {
    get_supply_report() {
      get_supply_report(this.bid_code)
        .then(res => this.supply_report = res.data || [] )
        .catch(error => this.$message.error(error));
    },
    next() {
      if(this.$store.getters.judgeStatus>=12){ // 开启报价记录与开启报价文件完成
        this.$router.push({path:'/Bid/judge_report',query:{bid_code:this.bid_code}})
      }else{
        open_report_judge({bid_code:this.bid_code}).then(res => {
          this.$router.push({path:'/Bid/judge_report',query:{bid_code:this.bid_code}})
        }).catch(error => this.$message.error(error));
      }
    },
    open_report_file(){
      open_report_file({bid_code:this.bid_code}).then(res=>{
        this.$message.success('开启报价文件成功');
        this.get_supply_report();
      }).catch(error=>this.$message.error(error))
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.supply_report {
  @include content;
}
</style>