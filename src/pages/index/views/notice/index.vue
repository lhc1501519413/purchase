<template>
  <div id="notice">
    <section class="notice">
      <h4>在线询价 / 询价结果</h4>
      <div class="cat-container">
        <span>采购类别：</span>
        <a-tree-select
          style="width:200px;"
          @change="paginationChange"
          v-model="cat_id"
          showSearch
          allowClear
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="cat_list"
          placeholder="请选择询价大类"
          treeNodeFilterProp="title"
          dropdownMatchSelectWidth
        />
        <span class="ml-10">公告类型：</span>
        <a-select v-model="noticeType" style="width: 120px" @change="paginationChange">
          <a-select-option value="1">在线询价</a-select-option>
          <a-select-option value="2">询价结果</a-select-option>
        </a-select>
      </div>
      <div class="notice-content">
        <ul v-show="noticeType==1">
          <li v-for="item of inquiry_list" :key='item.id' @click="$router.push({path:'/enquiryDetail',query:{inquiry_code:item.code}})">
            <span>
              {{item.title}}
            </span>
            <span>
              <svg-icon class="svg" icon-class="time" />
              {{item.start_date}}
            </span>
          </li>
        </ul>
        <ul v-show="noticeType==2">
          <li v-for="item of noticeList" :key='item.id' @click="$router.push({path:'/noticeDetail',query:{inquiry_code:item.code}})">
            <span>
              {{item.title}}{{item.status==8?'的在线询价成交公告':'的在线询价终止公告'}}
            </span>
            <span>
              {{item.start_date}}
            </span>
          </li>
        </ul>
        <!-- <a-table class="table" :dataSource="noticeList" :columns="columns" :pagination="false" rowKey="id">
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
        </a-table> -->
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
import { get_inquiry_list, get_notice_list } from "@indexApi/common";
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
      noticeType:'1',
      page:1,
      total:100,
      noticeList: [],
      inquiry_list:[],
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
    this.noticeType = this.$route.params.noticeType||'1';
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
      if(this.noticeType==1){
        get_inquiry_list(params).then(res=>{
          this.inquiry_list = res.data.list || [];
          this.total = +res.data.total_count;
        }).catch(error=>{
          this.$message.error(error)
        })
      }else{
        get_notice_list(params).then(res=>{
          this.noticeList = res.data.list || [];
          this.total = +res.data.total_count;
        }).catch(error=>{
          this.$message.error(error)
        })
      }
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
      ul{
        li{
          @include flex(space-between);
          padding:15px;
          border-bottom: 1px solid #F1F1F1;
          .svg{
            @extend .relative;
            top: 1px;
            right: 3px;
          }
        }
      }
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