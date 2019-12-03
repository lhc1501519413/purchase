<template>
  <div class="judge_result">
    <section class="content">
      <h4>得分汇总列表</h4>
      <a-table class="table" :customRow="rowClick" :dataSource="judge_result" :columns="columns" rowKey="supply_id" :rowSelection="rowSelection"></a-table>
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
        <a-col :span="13">
          <a-textarea
            v-model="opinion"
            placeholder="请输入为什么选择这个供应商？"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import {
  get_judge_result, // 获取商务技术评分汇总
  save_judge_supply_elect // 标记推荐供应商
} from "@admin/api/judge";
export default {
  props: {
    father: {
      type: Object
    },
    status: {
      type: String
    }
  },
  data() {
    return {
      priv: this.$store.getters.priv,
      bid_code: this.$route.query.bid_code,
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
        onChange: selectedRowKeys => this.selectedRowKeys = selectedRowKeys
      }
    }
  },
  created() {
    this.father.current = 5;
    this.get_judge_result();
  },
  methods: {
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            if (this.selectedRowKeys.indexOf(record.supply_id) == -1) {
              this.selectedRowKeys.push(record.supply_id);
            } else {
              this.selectedRowKeys.remove(record.supply_id);
            }
          }
        }
      };
    },
    get_judge_result() {
      get_judge_result(this.bid_code)
        .then(res => {
          this.judge_result = res.data.supply_list||[];
          this.opinion_list = res.data.opinion_list||[];
          this.selectedRowKeys=[];
          this.judge_result.forEach(elem=>{
            if(elem.is_elect==1) this.selectedRowKeys.push(elem.supply_id)
          })
        })
        .catch(error => this.$message.error(error));
    },
    save(submit) {
      var self = this;
      var formData = {
        bid_code: this.bid_code,
        supply_ids: this.selectedRowKeys.join(','),
        opinion:this.opinion
      };
      self.$confirm({
        title: "温馨提示",
        content: "提交后不可修改，是否确认提交",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          save_fn();
        }
      });
      function save_fn() {
        save_judge_supply_elect(formData)
          .then(res => {
            self.$message.success('提交成功，即将跳转回项目评审列表');
            let time = setTimeout(()=>{
              self.$router.push({path:'/Judge/bid_list'});
              clearTimeout(time);
            },1500)
            self.$once("hook:beforeDestroy", () => {
              clearTimeout(time);
            });
          })
          .catch(error => self.$message.error(error));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.judge_result {
  @include content;
}
</style>