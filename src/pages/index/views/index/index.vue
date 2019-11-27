<template>
  <div id="index">
    <section class="third-row">
      <div class="left">
        <h2>后勤物资采购云平台</h2>
        <ul class="slogan">
          <li>公平</li>
          <li class="dot"></li>
          <li>公正</li>
          <li class="dot"></li>
          <li>公开</li>
        </ul>
      </div>
      <div class="announce">
        <h4>Hi, {{username}} ~</h4>
        <h4>欢迎来到采购云平台</h4>
        <router-link to="/login" class='show' v-if="!token">
          <a-button type="primary">用户登录</a-button>
        </router-link>
        <router-link to="/register/reg" class='show' v-if="!token">
          <a-button>商家入驻</a-button>
        </router-link>
      </div>
    </section>
    <section class="notice-new">
      <div class="notice-title">
        <h3>项目采购</h3>
        <ul class="notice-title-item" @click="change_item">
          <li :class="{'active':isActive==1}" data-isActive='1'>采购公告</li>
          <li :class="{'active':isActive==2}" data-isActive='2'>中标成交公告</li>
          <li :class="{'active':isActive==3}" data-isActive='3'>废标公告</li>
        </ul>
        <router-link :to="{path:'/notices'}">查看更多 ></router-link>
      </div>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="6" v-for="item of Pbid_notice_list" :key="item.id">
          <div class="gutter-box enquiry-item">
            <h3 :title="item.title">{{item.title}}</h3>
            <!-- <p class="time">
              剩余时间：
              <span class="red">{{item.end_time}}</span>
            </p> -->
            <div class="line"></div>
            <div class="content">
              <p :title="item.custom_code">项目编号：{{item.custom_code}}</p>
              <p :title="item.project_name">项目名称：{{item.project_name}}</p>
              <p :title="item.create_time">发布时间：{{item.create_time}}</p>
              <p :title="item.bid_type_name">采购方式：{{item.bid_type_name}}</p>
              <p :title="item.com_name">采购单位：{{item.com_name}}</p>
            </div>
            <div class="line"></div>
            <div class="text-center">
              <router-link :to="{path:'/enquiryDetail',query:{inquiry_code:item.code}}">查看详情</router-link>
            </div>
          </div>
        </a-col>
      </a-row>
    </section>
    <section class="enquiry-new">
      <div class="notice-title">
        <h3>在线询价</h3>
        <ul class="notice-title-item" @click="enquiry_change">
          <li :class="{'active':isActive2==1}" data-isActive='1'>最新询价</li>
          <li :class="{'active':isActive2==2}" data-isActive='2'>询价结果</li>
        </ul>
        <router-link v-show="isActive2==1" :to="{name:'notice',params:{noticeType:'1'}}">查看更多 ></router-link>
        <router-link v-show="isActive2==2" :to="{name:'notice',params:{noticeType:'2'}}">查看更多 ></router-link>
      </div>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="6" v-show="isActive2==1" v-for="item of enquiryList.slice(0,4)" :key="item.id">
          <div class="gutter-box enquiry-item">
            <h4 class="status">{{item.status|status}}</h4>
            <h3 :title="item.title">{{item.title}}</h3>
            <p class="time">
              结束询价倒计时：
              <span class="red">{{item.end_date}}</span>
            </p>
            <div class="line"></div>
            <div class="content">
              <p :title="item.start_date">发布时间：{{item.start_date}}</p>
              <p :title="item.cat_name">采购类别：{{item.cat_name}}</p>
              <p :title="item.com_name">采购方式：在线询价</p>
              <p :title="item.com_name">采购单位：{{item.com_name}}</p>
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
        <a-col class="gutter-row" :span="6" v-show="isActive2==2" v-for="item of noticeList.slice(0,4)" :key="item.id">
          <div class="gutter-box enquiry-item">
            <h4 class="status">{{item.status|status_notice}}</h4>
            <h3 :title="item.title">{{item.title}}</h3>
            <!-- <p class="time">
              询价结束时间：
              <span class="red">{{item.end_date}}</span>
            </p> -->
            <div class="line"></div>
            <div class="content">
              <p :title="item.start_date">发布时间：{{item.start_date}}</p>
              <p :title="item.cat_name">采购类别：{{item.cat_name}}</p>
              <p :title="item.com_name">采购方式：在线询价</p>
              <p :title="item.com_name">采购单位：{{item.com_name}}</p>
              <!-- <p>
                已报价
                <span class="red">{{item.supply_count}}</span>条
              </p> -->
            </div>
            <div class="line"></div>
            <div class="text-center">
              <router-link :to="{path:'/noticeDetail',query:{inquiry_code:item.code}}">查看详情</router-link>
            </div>
          </div>
        </a-col>
      </a-row>
    </section>
    <!-- <section class="enquiry">
      <h3>
        <span>最新询价</span>
        <span>
          <router-link :to="{path:'/enquiries'}">查看更多 ></router-link>
        </span>
      </h3>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="6" v-for="item of enquiryList.slice(0,4)" :key="item.id">
          <div class="gutter-box enquiry-item">
            <h4 class="status">{{item.status|status}}</h4>
            <h3 :title="item.title">{{item.title}}</h3>
            <p class="time">
              结束询价倒计时：
              <span class="red">{{item.end_date}}</span>
            </p>
            <div class="line"></div>
            <div class="content">
              <p :title="item.start_date">发布时间：{{item.start_date}}</p>
              <p :title="item.cat_name">采购类别：{{item.cat_name}}</p>
              <p :title="item.com_name">采购单位：{{item.com_name}}</p>
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
            <h3 :title="item.title">{{item.title}}</h3>
            <p class="time">
              结束询价倒计时：
              <span class="red">{{item.end_date}}</span>
            </p>
            <div class="line"></div>
            <div class="content">
              <p :title="item.start_date">发布时间：{{item.start_date}}</p>
              <p :title="item.cat_name">采购类别：{{item.cat_name}}</p>
              <p :title="item.com_name">采购单位：{{item.com_name}}</p>
            </div>
            <div class="line"></div>
            <div class="text-center">
              <router-link :to="{path:'/enquiryDetail',query:{inquiry_code:item.code}}">立即报价</router-link>
            </div>
          </div>
        </a-col>
      </a-row>
    </section>
    <section class="notice">
      <h3>
        <span>最新公告</span>
        <span>
          <router-link :to="{path:'/notice'}">查看更多 ></router-link>
        </span>
      </h3>
      <div class="notice-content">
        <a-table
          class="table"
          :dataSource="noticeList"
          :columns="columns"
          :pagination="false"
          rowKey="id"
        >
          <template slot="titleRender" slot-scope="value,record">
            <router-link :to="{path:'/noticeDetail',query:{inquiry_code:record.code}}">
              {{value}}{{record.status==8?'的在线询价成交公告':'的在线询价终止公告'}}
            </router-link>
          </template>
          <template slot="status" slot-scope="value">
            <span>{{value|status2}}</span>
          </template>
        </a-table>
      </div>
    </section> -->
  </div>
</template>

<script>
import { 
  get_inquiry_list, 
  get_notice_list, 
  get_inquiry_base_info,
  get_Pbid_notice_list, // 公告列表
} from "@indexApi/common";
export default {
  data() {
    return {
      logo: require("@static/images/logo.png"),
      /* searchValue: "",
      tab: true,
      current: ["enquiry"], */
      isActive:'1',
      isActive2:'1',
      enquiryList: [],
      noticeList:[],
      Pbid_notice_list:[],
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
      ]
    };
  },
  created(){
    this.get_list();
  },
  computed:{
    token(){
      return this.$store.getters.token
    },
    type(){
      return this.$store.getters.type
    },
    username(){
      return this.$store.getters.username;
    },
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
    status_notice:value=>{
      switch (value) {
        case '6':
          return '已撤销'
          break;
        case '8':
          return '已成交'
          break;
        case '9':
          return '重新询价'
          break;
        case '10':
          return '取消询价'
          break;
      
        default:
          break;
      }
    },
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
    get_list(){
      get_inquiry_list().then(res=>{
        this.enquiryList = res.data.list||[];
        this.enquiryList.forEach((elem,index)=>{
          elem.end_date = this.end_time(elem.end_date,index)
        })
      }).catch(error=>{
        this.$message.warn(error)
      })
      get_notice_list().then(res=>{
        this.noticeList = res.data.list||[];
      }).catch(error=>{
        this.$message.warn(error)
      })
      this.get_Pbid_notice_list(1);
    },
    end_time(end_date,index){
      var self,endTime,time,date,hour,minute,second;
      self = this;
      endTime = setInterval(() => {
        time = new Date(end_date).getTime()-new Date().getTime();
        if(time<1000){
          clearInterval(endTime)
        }
        date = parseInt(time/(3600*24*1000));
        hour = parseInt((time-date*(3600*24*1000))/(3600*1000));
        minute = parseInt((time-date*(3600*24*1000)-hour*(3600*1000))/(60*1000));
        second = parseInt((time-date*(3600*24*1000)-hour*(3600*1000)-minute*(60*1000))/1000);
        this.enquiryList[index].end_date = date+'天'+getZero(hour)+'时'+ getZero(minute) +'分'+getZero(second)+'秒'
      },1000);
      self.$once('hook:beforeDestroy',() => {
        clearInterval(endTime);
      })
      function getZero(value){
        return value<10?'0'+value:value
      }
    },
    end_time2(end_date,index){
      var self,endTime,time,date,hour,minute,second;
      self = this;
      endTime = setInterval(() => {
        time = new Date(end_date).getTime()-new Date().getTime();
        if(time<1000){
          clearInterval(endTime)
        }
        date = parseInt(time/(3600*24*1000));
        hour = parseInt((time-date*(3600*24*1000))/(3600*1000));
        minute = parseInt((time-date*(3600*24*1000)-hour*(3600*1000))/(60*1000));
        second = parseInt((time-date*(3600*24*1000)-hour*(3600*1000)-minute*(60*1000))/1000);
        this.Pbid_notice_list[index].end_time = date+'天'+getZero(hour)+'时'+ getZero(minute) +'分'+getZero(second)+'秒'
      },1000);
      self.$once('hook:beforeDestroy',() => {
        clearInterval(endTime);
      })
      function getZero(value){
        return value<10?'0'+value:value
      }
    },
    change_item(){
      this.isActive=event.target.dataset.isactive;
      this.get_Pbid_notice_list(event.target.dataset.isactive)
    },
    get_Pbid_notice_list(type){
      get_Pbid_notice_list({page_size:4,type}).then(res=>{
        this.Pbid_notice_list = res.data.list||[];
      }).catch(error=>{
        this.$message.warn(error)
      })
    },
    enquiry_change(){
      this.isActive2=event.target.dataset.isactive;
    },
  }
};
</script>
<style lang="scss" scoped>
#index {
  width: 100%;
  height: 100%;
  .third-row {
    @include box(100%, 230px);
    @include flex(space-between, flex-start);
    background: url("../../../../../static/images/bg2.png");
    padding: 0 17.5%;
    .announce {
      padding: 20px 0;
      position: absolute;
      right: 17.5%;
      width: 180px;
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
      background-color: $white;
      @extend .text-center;
      .ant-btn {
        border-radius: 20px;
        @extend .mt-10;
      }
      h3 {
        margin: 30px 0 10px;
        padding-left: 10px;
        text-align: left;
        span {
          padding-bottom: 2px;
          font-size: 14px;
          border-bottom: 2px solid $primary2;
        }
      }
    }
    .left {
      flex: 3;
      height: 100%;
      position: relative;
      h2 {
        position: absolute;
        top: 20%;
        left: 10%;
        color: $white;
        font-size: 35px;
        letter-spacing: 7px;
      }
      .slogan {
        position: absolute;
        top: 43%;
        font-size: 68px;
        left: 10%;
        color: $white;
        @include flex(30%);
        .dot {
          width: 17px;
          height: 17px;
          margin: 0 15px;
          background: rgba(255, 255, 255, 1);
          border-radius: 50%;
          opacity: 0.64;
        }
      }
    }
  }
  .enquiry,
  .notice,.notice-new,.enquiry-new {
    width: 100%;
    padding: 0 17.5%;
    margin-top: 45px;
    .notice-title{
      @extend .relative;
      @include flex(flex-start);
      h3{
        @extend .pl-10;
        border-left: 4px solid $primary2;
        color: $primary2;
      }
      .notice-title-item{
        @extend .relative;
        left: 50px;
        @include flex(flex-start);
        li{
          padding: 0 15px 5px;
          @extend .ml-10;
          @extend .mr-10;
          @extend .pointer;
        }
        li.active{
          border-bottom: 2px solid $primary2;
        }
      }
      a{
        @extend .absolute;
        right: 5px;
        font-size: 1.17em;
      }
    }
    >h3 {
      @include flex(space-between);
      margin: 8px 0;
    }
    .ant-row {
      margin-top: 10px;
    }
    .enquiry-item {
      background-color: $white;
      padding: 10px 16px;
      border-radius: 2px;
      h3 {
        margin: 5px 0;
        font-weight: bold;
        width: 100%;
        height: 44px;
        @extend .mult-line-ellipsis;
        -webkit-line-clamp: 2;
      }
      .status {
        @extend .text-center;
        color: #f00;
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
          @extend .ellipsis;
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
    .notice-content {
      background-color: $white;
      padding: 20px;
    }
  }
  .enquiry-new {
    margin-bottom: 100px;
  }
}
</style>
<style lang="scss">
#index {
  .ant-input-search {
    width: 75%;
    .ant-input {
      border-radius: 0;
    }
    .ant-btn {
      border: none;
      border-radius: 0;
      height: 31px;
    }
  }
}
</style>