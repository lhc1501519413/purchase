<template>
  <div id="message">
    <a-button type="primary" @click="badge_all">全部标记为已读</a-button>
    <section class="content">
      <a-table :dataSource="messageList" :columns="columns" :pagination="false" rowKey="id">
        <template slot="titleRender" slot-scope="text">
          <a href="javascript:;" @click="show_detail(text)">
            {{text.title}}
          </a>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange"/>
    </section>
    <a-modal
      :destroyOnClose="true"
      style="top: 10%"
      width="50%"
      :visible="modalVisible"
      :footer="null"
      @ok="modalVisible = false"
      @cancel="modalVisible = false"
      >
      <template slot="title">
        <h3 align="center">{{modalInfo.type|type}}</h3>
      </template>
      <template v-if='modalInfo.type == 4'>
        <div>{{modalInfo.desc2[0][0]}}</div>
        <div>
          {{modalInfo.desc2[0][1]}}
          <router-link :to="{path:'/contractDetail',query:{code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>，
          {{modalInfo.desc2[2]}}
          <a href="javascript:;">{{modalInfo.desc2[3]}}</a>
        </div>
      </template>
      <template v-if='modalInfo.type == 7'>
        <div>
          {{modalInfo.desc2[0][0]}}
          <router-link :to="{path:'/contractDetail',query:{code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>
          {{modalInfo.desc2[2]}}。
        </div>
      </template>
      <template v-if='modalInfo.type == 8'>
        {{modalInfo.desc2[0][0]}}
        <router-link :to="{path:'/contractDetail',query:{code:modalInfo.code}}">
          {{modalInfo.desc2[1]}}
        </router-link>
        {{modalInfo.desc2[2]}}
          <router-link to="addEnquiry">
          {{modalInfo.desc2[3]}}
          </router-link>。
      </template>
      <template v-if='modalInfo.type == 10'>
        {{modalInfo.desc}}
      </template>
      <div style="height:80px;width:100%"></div>
    </a-modal>
  </div>
</template>

<script>
import { get_message_list,mark_status } from "@admin/api/panel";
export default {
  props: {
    father: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      messageList: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "20%",
          align: "center"
        },
        {
          title: "标题",
          width: "40%",
          scopedSlots: { customRender: "titleRender" }
        },
        {
          title: "通知时间",
          dataIndex: "create_time",
          width: "30%"
        }
      ],
      page:1,
      total:0,
      modalVisible: false,
      modalInfo: {}
    };
  },
  filters:{
    type(value){
      switch (value) {
        case '4':
          return '合同退回通知'
        case '7':
          return '供应商回复送货消息通知'
        case '8':
          return '发起询价通知'
        case '10':
          return '采购量预警通知'
        default:
          return '未知状态'
      }
    },
    type_code(value){
      switch (value) {
        case '4':
          return '合同编号：'
          break;
        case '7':
          return '合同编号：'
          break;
        case '8':
          return '合同编号：'
          break;
        default:
          return '注册单号：'
          break;
      }
    },
    type_title(value){
      switch (value) {
        case '4':
          return '合同名称：'
          break;
        case '7':
          return '合同名称：'
          break;
        case '8':
          return '合同名称：'
          break;
        default:
          return '注册单号：'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["message"];
    this.get_message_list_method();
  },
  mounted(){
    var e = this.$route.params.text;
    if(e!==void 0)this.show_detail(e);
  },
  methods: {
    get_message_list_method(){
      var page = this.page;
      get_message_list(page).then(res => {
        this.messageList = res.data.list;
        this.total = +res.data.total_count;
      });
    },
    show_detail(e) {
      mark_status(e.id).then(()=>{
        this.father.get_message();
        this.$route.params.text = void 0;
      }).catch(error=>{
        this.$message.error(error)
      })
      this.modalInfo = e;
      var info = e.desc;
      this.modalInfo.desc2 = e.desc.split('#');
      this.modalInfo.desc2[0] = this.modalInfo.desc2[0].split('<br>');
      this.modalVisible=true;
    },
    jump(e){
      this.$router.push({path:'/contractDetail',query:{code:this.modalInfo.code}})
    },
    addEnquiry(e){
      this.$router.push({path:'/addEnquiry'})
    },
    paginationChange(page) {
      this.page = page;
      this.get_message_list_method();
    },
    badge_all(){
      var list= this.messageList;
      var ids=[];
      list.forEach(elem=>{
        ids.push(elem.id)
      })
      mark_status(ids.join(',')).then(res=>{
        this.$message.success(res.msg);
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#message {
  @include component;
}
</style>