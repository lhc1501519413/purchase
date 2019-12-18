<template>
  <div class="judge_elect">
    <section class="content">
      <a-table class="table" :dataSource="judge_elect" :columns="columns" rowKey="supply_id" :pagination='false'>
        <template slot="area_key" slot-scope="text,record">
            <!-- mode="multiple" -->
          <a-select style="width: 100px"
            @focus="select_change(record.supply_id)"
            :disabled="status>=16"
            v-model="record.area_key"
          >
            <a-select-option v-for="item of area_list" :disabled='item.disabled' :key='item.id' :value="item.area_key">{{item.area_name}}</a-select-option>
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
    this.refresh();
    this.get_area_list();
  },
  methods: {
    refresh() {
      this.father.get_judge_info();
      get_judge_elect_supply(this.bid_code)
      .then(res => {
        var judge_elect = res.data.supply_list||[];
        judge_elect.forEach(elem=>elem.area_key=elem.area_key||[]);
        this.judge_elect = judge_elect
      })
      .catch(error => this.$message.error(error));
    },
    get_area_list(){
      get_area_list({bid_code:this.bid_code}).then(res => this.area_list = res.data||[])
      .catch(error => this.$message.error(error));
    },
    select_change(supply_id){
      var selectedList = [];
      this.judge_elect.forEach(elem=>{
        if(elem.supply_id!=supply_id) selectedList = [...selectedList,...elem.area_key]
      })
      var area_list = [...this.area_list]
      area_list.forEach(elem=>elem.disabled = selectedList.indexOf(elem.area_key)!=-1);
      this.area_list = area_list;
    },
    submit(){ // 提交分配片区
      var formData = {
        bid_code:this.bid_code,
        supply_list:this.judge_elect
      }
      submit_supply_area(formData).then(res=> {
        this.$message.success(res.msg)
        let time = setTimeout(()=>{
          this.$router.push({path:'/Bid/open_bid',query:{bid_code:this.bid_code}})
          clearTimeout(time)
        },1500)
      })
      .catch(error => this.$message.error(error));
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