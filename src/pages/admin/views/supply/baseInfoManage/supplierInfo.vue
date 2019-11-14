<template>
  <div id="manage">
    <h5>{{BreadcrumbOne}} / {{BreadcrumbTwo}}
      <a-button v-if="status!='1' && changeBtn" type='primary' @click="submit_change">提交变更审核</a-button>
      <a-button v-if="status=='1'" type='primary' @click="reback">撤回申请</a-button>
    </h5>
    <a-alert type="info">
      <div class="alertSlot" slot="description">
        <svg-icon class="svg" icon-class="help" />
        <p>基本信息、资质信息的必填项修改后均需点击【提交变更审核】按钮重新提交审核。</p>
        <!-- <p>2.审核机构</p>
        <p style="padding-left:10px;">
          邮寄地址：该地址由采购机构配置。
          <a-tooltip placement="top">
            <template slot="title">
              <span>联系人：{{concat}}</span>
              <br />
              <span>地址：{{address}}</span>
              <br />
              <span>电话：{{phone}}</span>
              <br />
              <span>邮编：{{postcode}}</span>
              <br />
            </template>
            <span style="color:#3177fd;" class="pointer">查看邮寄地址</span>
          </a-tooltip>
        </p> -->
      </div>
    </a-alert>
    <div class="tabs">
      <a-tabs
        defaultActiveKey="baseInfo"
        :activeKey="activeKey"
        :tabPosition="mode"
        @prevClick="callback"
        @nextClick="callback"
        @tabClick="callback($event)"
        :tabBarGutter="10"
      >
        <a-tab-pane 
          :key="item.path" 
          v-for="item of main_list" 
          >
          <div class="tabslot" slot="tab">
            <span v-show="item.type" class="necessary">*</span>
            {{item.name}}
            <img
              :src="item.status==0?require('@admin/assets/images/check.png'):require('@admin/assets/images/check_done.png')"
              alt="审核状态"
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <router-view :father="this" :grand='father'/>
  </div>
</template>

<script>
import { get_main_base_list } from "@admin/api/baseInfo";
import { apply,apply_info,re_back } from "@indexApi/user";
export default {
  name: "manage",
  data() {
    return {
      BreadcrumbOne: "基本信息管理",
      BreadcrumbTwo: "",
      concat: "莉莉丝",
      address: "杭州市西湖区网络信访办公室",
      phone: "13112345678",
      postcode: "321000",
      mode: "top",
      key: true,
      activeKey: "baseInfo",
      main_list:[],
      changeBtn:false,
      status:'1'
    };
  },
  props: ['father'],
  created() {
    this.main_base_list();
    this.apply_info2();
  },
  methods: {
    apply_info2(){
      apply_info().then(res=>{
        if(res.data.is_need_apply==1){
          this.changeBtn = true;
        }else{
          this.changeBtn = false;
        }
        this.status = res.data.status;
      })
    },
    main_base_list() {
      get_main_base_list()
        .then(res => {
          let result=res.data;
          let main_list=[];
          for(let key in result){
            let obj = {};
            obj.path = key;
            obj.status = result[key].status;
            obj.type = result[key].type;
            obj.name = switch_name(key);
            if(obj.path!='financial_info') main_list.push(obj);
          }
          this.main_list = main_list;
        }).catch();
      function switch_name(key){ 
        switch (key) {
          case 'basic_info':
            return '基本信息'
            break;
          case 'nature_info':
            return '基本资质'
            break;
          case 'credit_info':
            return '信用信息'
            break;
          case 'investment_info':
            return '出资信息'
            break;
          case 'financial_info':
            return '财务信息'
            break;
          case 'people_info':
            return '人员信息'
            break;
          default:
            return '特殊资质'
            break;
        }
      }
    },
    callback(name) {
      this.$router.push({ name });
    },
    submit_change(){
      apply().then(res=>{
        this.$message.success(res.msg)
        this.apply_info2();
      }).catch(error=>{
        this.$message.warn(error)
      })
    },
    reback(){
      var self = this;
      this.$confirm({
        title: '确认撤回申请吗?',
        onOk() {
          re_back().then(res=>{
            self.apply_info2();
            self.$message.success(res.msg)
          }).catch(error=>{
            self.$message.warn(error)
          })
        },
        onCancel() {},
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#manage {
  width: calc(100% - 220px);
  .ant-alert {
    padding: 8px 15px 8px 37px;
    margin: 10px 0;
  }
  h5{
    position: relative;
    button{
      position: absolute;
      right: 15px;
      top: -9px;
    }
  }
  .alertSlot {
    position: relative;
    .svg {
      position: absolute;
      left: -25px;
    }
    button {
      height: 20px;
      padding: 0;
      border: none;
      &:hover,
      &:active,
      &:focus {
        background: none;
      }
    }
  }
  .tabs {
    background-color: #fff;
    padding: 20px;
    @extend .radius;
    font-size: 1.1rem;
    .tabslot {
      .necessary {
        color: red;
        padding-right: 10px;
      }
      img {
        width: 17px;
        height: 17px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>