<template>
  <div class="judge_result">
    <section class="content">
      <h4>得分汇总列表</h4>
      <a-table class="table" :dataSource="judge_result" :columns="columns" rowKey="supply_id" :rowSelection="rowSelection">
        <template slot="is_agree_price" slot-scope="text,record">
          <a-radio-group 
            :disabled="bid_status==18||bid_status==20||bid_status==21"
            v-model="record.is_agree_price">
            <a-radio :style="radioStyle" :value="'1'">是</a-radio>
            <a-radio :style="radioStyle" :value="'2'">否</a-radio>
          </a-radio-group>
        </template>
      </a-table>
      <h4>评审意见</h4>
      <a-row v-for="item of opinion_list" :key='item.user_id' class="mb-10">
        <a-col :span="3" class="text-right">【{{item.realname}}】评审意见：</a-col>
        <a-col :span="13">
          {{item.opinion}}
        </a-col>
      </a-row>
      <h4>其他</h4>
      <a-row>
        <a-col :span="3" class="text-right">比较和评价：</a-col>
        <a-col :span="13">{{opinion}}</a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import {
  get_judge_result, // 获取商务技术评分汇总
  confirm_bid_judge, // 得分汇总下一步
  submit_supply_price_status // 提交供应商关于价格意见
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
      bid_status:this.father.judge_info.bid_status,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      judge_result: [],
      opinion:'',
      opinion_list:[],
      columns: [
        {
          title: "供应商名称",
          dataIndex:'supply_name',
          width: "20%",
        },
        {
          title: "最终报价（万元）",
          dataIndex:'report_money',
          width: "10%",
        },
        {
          title: "报价得分",
          dataIndex:'report_score',
          width: "10%",
        },
        {
          title: "技术商务资质信得分",
          dataIndex:'business_skill_score',
          width: "15%",
        },
        {
          title: "总得分",
          dataIndex:'total_score',
          width: "10%",
        },
        {
          title: "排名",
          dataIndex:'rank',
          width: "10%",
        },
        {
          title:'是否同意',
          dataIndex:'is_agree_price',
          width:'10%',
          scopedSlots:{ customRender:'is_agree_price' }
        }
      ],
      selectedRowKeys:[],
    };
  },
  computed:{
    rowSelection(){
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        columnTitle:'推荐中标',
        getCheckboxProps: record => ({
            props: {
              disabled: true,
            }
          }),
      }
    }
  },
  created() {
    this.father.current = 8;
    this.refresh();
  },
  methods: {
    refresh() {
      get_judge_result(this.bid_code)
        .then(res => {
          this.judge_result = res.data.supply_list||[];
          this.opinion_list = res.data.opinion_list||[];
          this.opinion = res.data.opinion||'';
          var supply_list = res.data.supply_list||[];
          supply_list.forEach(elem=>{
            if(elem.is_elect==1)this.selectedRowKeys.push(elem.supply_id)
          })
        })
        .catch(error => this.$message.error(error));
    },
    submit(){
      submit_supply_price_status({
        bid_code:this.bid_code,
        supply_list:this.judge_result
      }).then(res=> this.$message.success(res.msg))
      .catch(error => this.$message.error(error));
    },
    next() {
      if(this.status>=15){ // 得分汇总完成
        this.$router.push({path:'/Bid/judge_elect_supply',query:{bid_code:this.bid_code}})
      }else{
        confirm_bid_judge({bid_code:this.bid_code}).then(res => {
          this.$router.push({path:'/Bid/judge_elect_supply',query:{bid_code:this.bid_code}})
        }).catch(error => this.$message.error(error));
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.judge_result {
  @include content;
}
</style>