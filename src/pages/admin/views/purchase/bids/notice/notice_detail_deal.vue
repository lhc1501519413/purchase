<template>
  <div id="bid_notice_detail">
    <h5>
      招标管理 / 项目公告 / 中标成交公告
      <a-button @click="$router.go(-1)">返回</a-button>
    </h5>
    <section class="bid_notice_detail mt-20 content">
      <div class="bigcontent">
        <h2 class="text-center mb-10">{{formData.title}}</h2>
        <h4 class="text-center mb-10 no-border">
          <span>发布时间：{{formData.create_time}}</span>
          <span class="ml-10">浏览次数：{{formData.times}}</span>
        </h4>
        <h3>一、采购人名称：{{formData.com_name}}</h3>
        <h3>二、采购项目名称：{{formData.project_name}}</h3>
        <h3>三、项目编号：{{formData.custom_code}}</h3>
        <h3>四、采购组织类型：自行采购</h3>
        <h3>五、采购方式：{{formData.bid_type_name}}</h3>
        <h3>六、采购公告发布日期：{{formData.publish_time}}</h3>
        <h3>七、定标日期：{{formData.confirm_time}}</h3>
        <h3>八、中标单位：</h3>
        <a-table
          class="mb-10"
          rowKey="supply_id"
          :columns="columns"
          :dataSource="formData.supply_list"
          :pagination="pagination"
        >
          <template slot="project_name">{{formData.project_name}}</template>
        </a-table>
        <h3>九、其他事项</h3>
        <div class="text-indent-35 mb-10">
          自公告发出三个工作日内，商家可对中标结果以书面形式进行反映。
        </div>
        <div class="text-indent-35 mb-10">
          书面投诉递交地址：【{{formData.address}}】
        </div>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="6">联系人：{{formData.contact_name}}</a-col>
          <a-col :span="6" :offset="2">联系方式：{{formData.contact_number}}</a-col>
        </a-row>
        <div class="text-right mb-10">{{formData.com_name}}</div>
        <div class="text-right mb-10">{{formData.create_time}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { get_notice_info } from '@admin/api/open_bid';
export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      id: "",
      formData: {},
      expert_list:'',
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "14%",
          align: "center"
        },
        {
          title: "项目名称",
          dataIndex: "project_name",
          width: "14%",
          align: "center",
          scopedSlots:{customRender:'project_name'}
        },
        /* {
          title: "中标金额（元）",
          dataIndex: "report_money",
          width: "14%",
          align: "center"
        }, */
        {
          title: "中标供应商",
          dataIndex: "supply_name",
          width: "14%",
          align: "center"
        },
        /* {
          title: "中标供应商地址",
          dataIndex: "address",
          width: "14%",
          align: "center"
        } */
      ],
      pagination: {
        showQuickJumper: true,
        showTotal: () => {
          return `共${this.formData.supply_list.length}条数据`;
        }
      }
    };
  },
  created() {
    this.father.selectedKeys = ['/Bid/notice_list'];
    this.id = this.$route.query.id;
    this.get_notice_info_method();
  },
  filters: {
    is_exam(key) {
      switch (key) {
        case 1:
          return "是";
          break;
        case "1":
          return "是";
          break;
        default:
          return "否";
          break;
      }
    }
  },
  methods: {
    get_notice_info_method() {
      get_notice_info({ id: this.id })
        .then(res => {
          this.formData = res.data;
          this.expert_list = this.formData.expert_list.reduce((priv,elem)=>{
            return priv += `${elem.username}，`
          },'')
        })
        .catch(error => this.$message.error(error));
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#bid_notice_detail{
  @include component;
  .bid_notice_detail {
    width: 100%;
    padding: 0 17.5%;
    & > h4 {
      margin: 8px 0;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      opacity: 1;
    }
    .bigcontent {
      background-color: $white;
      padding: 30px;
      h3 {
        margin-bottom: 10px;
      }
      .text-indent-35 {
        text-indent: 35px;
      }
    }
  }
}
</style>