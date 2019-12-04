<template>
  <div class="judge_elect">
    <section class="content">
      <a-table class="table" :dataSource="judge_elect" :columns="columns" rowKey="supply_id">
        <template slot-scope="text,record" slot="area_key">
          <a-select style="width: 100px"
            :disabled="bid_status==18||bid_status==20||bid_status==21"
            v-model="record.area_key"
          >
            <a-select-option v-for="item of area_list" :key='item.id' :value="item.area_key">{{item.area_name}}</a-select-option>
          </a-select>
        </template>
      </a-table>
    </section>
  </div>
</template>

<script>
import {
  get_judge_elect_supply, // 获取推荐供应商
  get_area_list, // 获取配送片区
  submit_supply_area // 分配供应商片区
} from "@admin/api/open_bid";
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      status:this.$store.getters.judgeStatus,
      bid_status:this.father.judge_info.bid_status,
      priv: this.$store.getters.priv,
      bid_code: this.$route.query.bid_code,
      judge_elect: [],
      columns: [
        {
          title:'序号',
          customRender: (text, record, index) => `${index + 1}`,
          width:'6%'
        },
        {
          title: "供应商名称",
          dataIndex:'supply_name',
          width: "20%",
        },
        {
          title: "最终报价（元）",
          dataIndex:'report_money',
          width: "15%",
        },
        {
          title: "报价得分",
          dataIndex:'report_score',
          width: "15%",
        },
        {
          title: "技术商务资质信得分",
          dataIndex:'business_skill_score',
          width: "15%",
        },
        {
          title: "总得分",
          dataIndex:'total_score',
          width: "15%",
        },
        {
          title: "排名",
          dataIndex:'rank',
          width: "10%",
        },
        {
          title: "选择配送区域",
          dataIndex:'area_key',
          width: "10%",
          scopedSlots:{ customRender:'area_key' }
        }
      ],
      area_list:[]
    };
  },
  created() {
    this.father.current = 9;
    this.get_judge_elect_supply();
    this.get_area_list();
  },
  methods: {
    get_area_list(){
      get_area_list({bid_code:this.bid_code}).then(res => {
          this.area_list = res.data||[
            {
              "id":'1',
              "area_key":'1',
              "area_name":'片区1',
            },
            {
              "id":'2',
              "area_key":'2',
              "area_name":'片区2',
            },
            {
              "id":'3',
              "area_key":'3',
              "area_name":'片区3',
            }
          ]
        })
        .catch(error => this.$message.error(error));
    },
    get_judge_elect_supply() {
      get_judge_elect_supply(this.bid_code)
        .then(res => {
          this.judge_elect = res.data.supply_list||[];
        })
        .catch(error => this.$message.error(error));
    },
    submit(){ // 提交分配片区
      submit_supply_area({
        bid_code:this.bid_code,
        supply_list:this.judge_elect
      }).then(res=> this.$message.success(res.msg))
      .catch(error => this.$message.error(error));
    },
    next(){
      this.$router.push({path:'/Bid/open_bid',query:{bid_code:this.bid_code}})
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.judge_elect {
  @include content;
}
</style>