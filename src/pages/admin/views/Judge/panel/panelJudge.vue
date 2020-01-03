<template>
  <div id="panelJudge">
    <div class="left mr-20">
      <h3>我的任务</h3>
      <section class="content">
        <h4>
          <svg-icon icon-class="icon_task_xjd" />招标项目评审
        </h4>
        <ul class="operate">
          <li>
            <p>待签到</p>
            <router-link
              :to="{name:'/Judge/bid_list',params:{status:'1'}}"
            >{{formData.bid_judge.pend_sign}}</router-link>
          </li>
          <li>
            <p>待评审</p>
            <router-link
              :to="{name:'/Judge/bid_list',params:{status:'2'}}"
            >{{formData.bid_judge.pend_judge}}</router-link>
          </li>
          <li></li>
        </ul>
      </section>
    </div>
    <div class="right">
      <h3 hidden>
        <span>消息公告提醒</span>
        <router-link to="messageJudge">所有消息>></router-link>
      </h3>
      <ul class="content notice" hidden>
        <li
          v-for="item of messageList"
          :key="item.id"
        >{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { panel, get_message_list } from "@admin/api/panel";
export default {
  props: {
    father: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      formData: {
        bid_judge: {
          pend_sign:0,//待签到
          pend_judge:0,//待评审
        },
      },
      // messageList: []
    };
  },
  created() {
    this.father.selectedKeys = ["panelJudge"];
    this.get_data_method();
    this.father.get_panel();
  },
  methods: {
    get_data_method() {
      panel()
        .then(res => this.formData = res.data)
        .catch(error => this.$message.error(error));
      // get_message_list()
      //   .then(res => this.messageList = res.data.list)
      //   .catch(error => this.$message.error(error));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#panelJudge {
  @include component;
  @include flex(space-between, flex-start);
  .left {
    flex: 1.3;
  }
  .right {
    flex: 1;
  }
  .content {
    margin: 0px;
    h4 {
      border: none !important;
      padding: 0;
    }
  }
  h3 {
    border-bottom: 2px solid rgba(232, 232, 232, 1) !important;
    margin: 0px;
  }
  .operate {
    width: 80%;
    @extend .text-center;
    @extend .mb-10;
    @include flex;
    li {
      flex: 1;
    }
    a {
      font-weight: bold;
      font-size: 23px;
    }
  }
  .notice li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
  }
  .notice li:first-child {
    padding-top: 0;
  }
}
</style>