<template>
  <div id="judge_group">
    <h5>
      招标管理 / 评审小组设置
      <a-button type="primary" v-if="status<14" @click="save">保存</a-button>
    </h5>
    <a-table
      class="content"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
      rowKey="id"
    >
      <template slot="operation" slot-scope="text,record">
        <a-checkbox :disabled='status>=14' v-model="record.is_join">参与</a-checkbox>
        <a-checkbox :disabled='status>=14' v-model="record.group_leader" @change="leader_change(record.id)">组长</a-checkbox>
      </template>
    </a-table>
  </div>
</template>

<script>
import {
  get_bid_judge_expert, // 获取参与评审专家列表
  set_bid_expert // 设置参与评审专家列表
} from "@admin/api/open_bid";

export default {
  props: {
    father: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      group_leader: false,
      priv: this.$store.getters.priv,
      status: this.$store.getters.judgeStatus,
      bid_code: "",
      dataSource: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "专家姓名",
          dataIndex: "username",
          width: "18%"
        },
        {
          title: "专家手机号",
          dataIndex: "mobile",
          width: "18%"
        },
        {
          title: "是否参与",
          dataIndex: "operation",
          width: "18%",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  created() {
    this.bid_code = this.$route.query.bid_code;
    this.father.selectedKeys = ["/Bid/open_bid_list"];
    this.get_bid_judge_expert();
  },
  methods: {
    get_bid_judge_expert() {
      get_bid_judge_expert(this.bid_code)
        .then(res => {
          let dataSource = res.data || [];
          dataSource.forEach(elem => {
            elem.is_join = !!+elem.is_join;
            elem.group_leader = !!+elem.group_leader;
          });
          this.dataSource = dataSource;
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    leader_change(id) {
      this.dataSource.forEach(elem => {
        elem.group_leader = elem.id == id;
      });
    },
    save() {
      var expert_list = JSON.parse(JSON.stringify(this.dataSource));
      var obj = {
        bid_code: this.bid_code,
        expert_list
      };
      obj.expert_list.forEach(elem=>{
        elem.is_join = +elem.is_join;
        elem.group_leader = +elem.group_leader;
      })
      if(obj.expert_list.every(elem=>elem.group_leader==0)){
        this.$message.info('请选择专家组长');
        return;
      }
      set_bid_expert(obj)
        .then(res => {
          let time = setTimeout(()=>{
            this.$router.go(-1);
            clearTimeout(time)
          },1500)
          this.$message.success(res.msg);
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#judge_group {
  @include component;
}
</style>