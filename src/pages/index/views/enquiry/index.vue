<template>
  <div id="enquiry">
    <section class="enquiry">
      <h4>在线询价 / 最新询价</h4>
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
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="6" v-for="item of enquiryList.slice(0,4)" :key="item.id">
          <div class="gutter-box enquiry-item">
            <h4 class="status">{{item.status|status}}</h4>
            <h3>{{item.title}}</h3>
            <p class="time">
              结束询价倒计时：
              <span class="red">{{item.end_date}}</span>
            </p>
            <div class="line"></div>
            <div class="content">
              <p>发布时间：{{item.start_date}}</p>
              <p>采购类别：{{item.cat_name}}</p>
              <p>采购单位：{{item.com_name}}</p>
              <!-- <p>
                已报价
                <span class="red">{{item.supply_count}}</span>条
              </p> -->
            </div>
            <div class="line"></div>
            <div class="text-center">
              <router-link :to="{path:'/enquiryDetail',query:{inquiry_code:item.code}}">立即报价</router-link>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="6" v-for="item of enquiryList.slice(4,8)" :key="item.id">
          <div class="gutter-box enquiry-item">
            <h4 class="status">{{item.status|status}}</h4>
            <h3>{{item.title}}</h3>
            <p class="time">
              结束询价倒计时：
              <span class="red">{{item.end_date}}</span>
            </p>
            <div class="line"></div>
            <div class="content">
              <p>发布时间：{{item.start_date}}</p>
              <p>采购类别：{{item.cat_name}}</p>
              <p>采购单位：{{item.com_name}}</p>
              <!-- <p>
                已报价
                <span class="red">{{item.supply_count}}</span>条
              </p> -->
            </div>
            <div class="line"></div>
            <div class="text-center">
              <router-link :to="{path:'/enquiryDetail',query:{inquiry_code:item.code}}">立即报价</router-link>
            </div>
          </div>
        </a-col>
      </a-row>
      <div v-if="!enquiryList.length" class="cat-container text-center">
        暂无数据
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
import { get_inquiry_list } from "@indexApi/common";
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
      enquiryList: [],
      cat_list: [],
      endTimeCtrl:{
        '0':'endTime0',
        '1':'endTime1',
        '2':'endTime2',
        '3':'endTime3',
        '4':'endTime4',
        '5':'endTime5',
        '6':'endTime6',
        '7':'endTime7',
      },
    };
  },
  created() {
    all_category()
    .then(res => {
      this.cat_list = this.$common.treeSelectFormat(res.data);
    }).catch()
  },
  filters: {
    status: value => {
      switch (value) {
        case "3":
          return "报价中";
          break;
        default:
          return "已撤销";
          break;
      }
    },
  },
  mounted(){
    this.get_inquiry_list_method();
  },
  methods: {
    get_inquiry_list_method(){
      var params={
        page:this.page,
        page_size:8,
        cat_id:this.cat_id,
        keyword:this.father.keyword
      };
      get_inquiry_list(params).then(res=>{
        this.enquiryList = res.data.list || [];
        this.total = +res.data.total_count;
        this.enquiryList.forEach((elem,index)=>{
          elem.end_date = this.end_time(elem.end_date,index)
        })
      }).catch(error=>{
        this.$message.error(error)
      })
    },
    cat_change(value) {
      this.get_inquiry_list_method();
    },
    paginationChange(page) {
      for(var key in this.endTimeCtrl){
        clearInterval(this.endTimeCtrl[key])
      }
      this.page = page;
      this.get_inquiry_list_method();
      this.$forceUpdate();
    },
    end_time(end_date,index){
      var self,endTime,time,date,hour,minute,second;
      self = this;
      this.endTimeCtrl[index] = setInterval(() => {
        time = new Date(end_date).getTime()-new Date().getTime();
        if(time<1000){
          clearInterval(this.endTimeCtrl[index])
          this.enquiryList[index].end_date = '0天0时0分0秒';
          return;
        }
        date = parseInt(time/(3600*24*1000));
        hour = parseInt((time-date*(3600*24*1000))/(3600*1000));
        minute = parseInt((time-date*(3600*24*1000)-hour*(3600*1000))/(60*1000));
        second = parseInt((time-date*(3600*24*1000)-hour*(3600*1000)-minute*(60*1000))/1000);
        this.enquiryList[index].end_date = date+'天'+getZero(hour)+'时'+ getZero(minute) +'分'+getZero(second)+'秒'
      },1000);
      function getZero(value){
        return value<10?'0'+value:value
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#enquiry {
  width: 100%;
  height: 100%;
  .enquiry {
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
    .ant-row {
      margin-top: 10px;
    }
    .enquiry-item {
      background-color: $white;
      padding: 10px 16px;
      h3 {
        font-weight: bold;
      }
      .status {
        color: #f00;
        padding-left: 10px;
        width: 76px;
        height: 24px;
        line-height: 24px;
        background: rgba(254, 238, 231, 1);
        opacity: 1;
        border-radius: 0px 12px 12px 0px;
        position: relative;
        right: 16px;
      }
      .line {
        margin: 20px 0;
        border-top: 2px solid #e8e8e8;
      }
      .content {
        p {
          margin-bottom: 10px;
          span {
            margin: 0 5px;
          }
        }
      }
      .red {
        color: #f00;
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