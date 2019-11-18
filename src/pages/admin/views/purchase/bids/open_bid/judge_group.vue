<template>
  <div id="judge_group">
    <h5>
      招标管理 / 评审小组设置
      <a-button type="primary" @click="submit">提交</a-button>
    </h5>
    <a-table
      class="content"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
      rowKey="id"
    >
      <template slot="operation" slot-scope="text,record">
        <a-checkbox @change="onChange">参与</a-checkbox>
        <a-radio @change="onChange(record.id)">组长</a-radio>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    father: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataSource: [
        {
          id: "1",
          name: "jax",
          contact_number: "15012234567"
        },
        {
          id: "2",
          name: "jax",
          contact_number: "15012234567"
        },
        {
          id: "3",
          name: "jax",
          contact_number: "15012234567"
        },
        {
          id: "4",
          name: "jax",
          contact_number: "15012234567"
        }
      ],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "专家姓名",
          dataIndex: "name",
          width: "18%"
        },
        {
          title: "专家手机号",
          dataIndex: "contact_number",
          width: "18%"
        },
        {
          title: "是否参与",
          dataIndex: "operation",
          width: "18%",
          scopedSlots:{customRender:'operation'}
        }
      ]
    };
  },
  created() {
    this.father.selectedKeys = ["/Bid/open_bid_list"];
  },
  methods: {
    submit(){},
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#judge_group {
  @include component;
}
</style>