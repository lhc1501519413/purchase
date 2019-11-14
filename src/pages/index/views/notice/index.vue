<template>
  <div id="notice">
    <section class="notice">
      <h4>在线询价 / 询价结果</h4>
      <div class="cat-container">
        <span>采购类别：</span>
        <a-tree-select
          style="width:200px;"
          @change="cat_change"
          v-model="cat_id"
          showSearch
          allowClear
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="cat_list"
          placeholder="请选择询价大类"
          treeNodeFilterProp="title"
          dropdownMatchSelectWidth
        />
      </div>
      <div class="notice-content">
        <a-table class="table" :dataSource="noticeList" :columns="columns" :pagination="false" rowKey="id">
          <template slot="titleRender" slot-scope="value,record">
            <router-link :to="{path:'/noticeDetail',query:{inquiry_code:record.code}}">
              {{value}}{{record.status==8?'的在线询价成交公告':'的在线询价终止公告'}}
            </router-link>
          </template>
          <template slot="status" slot-scope="value">
            <span>
              {{value|status2}}
            </span>
          </template>
        </a-table>
      </div>
    <a-pagination 
        showQuickJumper 
        :total="total" 
        v-model="page" 
        @change="paginationChange"
        :showTotal="total => `共${total}条`"
    />
    </section>
  </div>
</template>

<script>
import { get_notice_list } from "@indexApi/common";
import { all_category } from "@common/js/apis.js";
export default {
  props:{
    father:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
      cat_id: "",
      page:1,
      total:100,
      noticeList: [],
      columns: [
        {
          title: "公告标题",
          dataIndex: "title",
          scopedSlots: { customRender: "titleRender" },
          width: "35%"
        },
        {
          title: "报价开始时间",
          dataIndex: "start_date",
          width: "20%"
        },
        {
          title: "报价结束时间",
          dataIndex: "end_date",
          width: "20%"
        },
        {
          title: "当前状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "25%"
        }
      ],
      cat_list: [],
    };
  },
  created() {
    all_category()
    .then(res => {
      this.cat_list = this.$common.treeSelectFormat(res.data);
    }).catch()
  },
  mounted(){
    this.get_notice_list_method();
  },
  filters: {
    status2: value => {
      switch (value) {
        case "8":
          return "询价完成";
          break;
        case "9":
          return "重新询价";
          break;
        case "10":
          return "取消询价";
          break;
        default:
          return "未知";
          break;
      }
    }
  },
  methods: {
    get_notice_list_method(){
      var params={
        page:this.page,
        cat_id:this.cat_id,
        keyword:this.father.keyword
      };
      get_notice_list(params).then(res=>{
        this.noticeList = res.data.list || [];
        this.total = +res.data.total_count;
      }).catch(error=>{
        console.log(error)
      })
    },
    cat_change(value) {
      this.get_notice_list_method();
    },
    paginationChange(page) {
      this.page = page;
      this.get_notice_list_method();
    },
  }
};
</script>
<style lang="scss" scoped>
#notice {
  width: 100%;
  height: 100%;
  .notice {
    width: 100%;
    padding: 0 17.5%;
    margin-bottom: 100px;
    h4 {
      @include flex(space-between);
      margin: 8px 0;
      height:19px;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      line-height:22px;
      color:rgba(0,0,0,0.45);
      opacity:1;
    }
    .notice-content{
      background-color: $white;
      padding: 20px;
    }
  }
  .ant-pagination{
    @extend .text-right;
    @extend .mt-10;
  }
  .cat-container{
    background-color: $white;
    padding: 15px;
  }
}
</style>