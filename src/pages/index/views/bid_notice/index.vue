<template>
  <div id="notice">
    <section class="notice">
      <h4>项目公告 / 采购公告</h4>
      <div class="cat-container">
        <span>采购类别：</span>
        <a-tree-select
          style="width:200px;"
          @change="get_notice_list_method2"
          v-model="cat_id"
          showSearch
          allowClear
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="cat_list"
          placeholder="请选择类别"
          treeNodeFilterProp="title"
          dropdownMatchSelectWidth
        />
        <span class="ml-10">公告类型：</span>
        <a-select v-model="noticeType" style="width: 180px" @change="get_notice_list_method2">
          <a-select-option value="1">采购公告</a-select-option>
          <a-select-option value="2">中标成交公告</a-select-option>
          <a-select-option value="3">废标公告</a-select-option>
        </a-select>
      </div>
      <div class="notice-content">
        <ul>
          <li class="pointer" v-for="item of notice_list" :key='item.id' @click="to_detail(item.id)">
            <span>
              {{item.title}}
            </span>
            <span>
              <svg-icon class="svg" icon-class="time" />
              {{item.create_time}}
            </span>
          </li>
        </ul>
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
import { 
  get_Pbid_notice_list, // 公告列表
} from "@indexApi/common";
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
      total:0,
      notice_list:[],
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
  methods: {
    get_notice_list_method(){
      var params={
        page:this.page,
        cat_id:this.cat_id,
        keyword:this.father.keyword,
        type:this.noticeType
      };
      get_Pbid_notice_list(params).then(res=>{
        this.notice_list = res.data.list || [];
        this.total = +res.data.total_count;
      }).catch(error=>{
        this.$message.error(error)
      })
    },
    get_notice_list_method2(){
      this.page = 1;
      this.get_notice_list_method();
    },
    paginationChange(page) {
      this.page = page;
      this.get_notice_list_method();
    },
    to_detail(id){
      switch (this.noticeType) {
        case '1':
          this.$router.push({path:'/bid_notice_detail',query:{id}})
          break;
        case '2':
          this.$router.push({path:'/bid_notice_detail_deal',query:{id}})
          break;
        case '3':
          this.$router.push({path:'/bid_notice_detail_fail',query:{id}})
          break;
        default:
          break;
      }
    }
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