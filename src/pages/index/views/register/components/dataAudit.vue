<template>
  <div id="audit">
    <header>
      <span>申请审核</span>
      <button @click="cancel" v-show="aduitStatus==1">撤回申请</button>
    </header>
    <section class="audit">
      <span class="dot" :class="aduitStatus==1?'gray':'blue'"></span>
      <div v-if="aduitStatus==1">
        <p class="audit-status">审核状态：<span style="color:#108ee9;">{{aduitStatus|status}}</span></p>
        <p class="aduit-stage">审核阶段：待审核</p>
        <!-- <span class="aduit-concatway">联系电话：<span>{{concatWay}}</span></p> -->
      </div>
      <div v-else>
        <p>
          待初核：<span>{{aduitStatus|status}}</span>
          <router-link  v-if="aduitStatus==2" :to="{path:'/register/dataComplete'}">
            修改申请
          </router-link>
        </p>
        <p v-if="aduitStatus==2">驳回原因：<span>{{failReason}}</span></p>
        <!-- <span>联系电话：<span>{{concatWay}}</span></p> -->
        <p>审核时间：<span>{{aduitTime}}</span></p>
      </div>
    </section>
  </div>
</template>

<script>
import { apply_info,re_back } from "@indexApi/user";
export default {
  data(){
    return{
      aduitStatus:'',
      concatWay:'',
      failReason:'',// 失败原因
      aduitTime:'' // 审核时间
    }
  },
  props:['father'],
  created(){
    this.father.current = 3;
    this.apply()
  },
  filters:{
    status(value){
      switch (value) {
        case "1":
          return '待审核'
          break;
        case "2":
          return '被驳回'
          break;
        case "3":
          return '撤销申请'
          break;
        case "4":
          return '已确认，生效'
          break;
        default:
          return '禁用'
          break;
      }
    }
  },
  methods: {
    apply(){
      apply_info().then(res=>{
        this.aduitStatus = res.data.status;
        this.failReason=res.data.remark;// 失败原因
        this.aduitTime = res.data.audit_time; // 审核时间
      })
    },
    cancel(){
      re_back().then(res=>{
        this.$message.success('撤回申请成功')
        let time = setTimeout(()=>{
          this.$router.push({path:'/register/dataComplete'})
          clearTimeout(time)
        },1000)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#audit{
  width: 100%;
  margin: 0 auto;
  header{
    @include flex(space-between);
    background-color: rgba(0, 0, 0, 0.1);
    padding: 15px;
    padding-left: 25px;
    font-size: 17px;
    button{
      @extend .pointer;
      background: none;
      color: $info;
    }
  }
  .audit{
    @include horizontalCenter(70%);
    margin: 5% auto 0;
    padding-bottom: 3%;
    position: relative;
    .dot{
      position: absolute;
      left: -5%;
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
    .audit-status{
      margin-bottom: 1rem;
    }
    .blue{
      background-color: $primary2;
    }
    .gray{
      background-color: #939393;
    }
    .edit{
      border: none;
      padding: 0;
      color: skyblue;
      margin-left: 5%;
    }
  }
}
</style>