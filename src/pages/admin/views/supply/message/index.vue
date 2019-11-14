<template>
  <div id="messageSupply">
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
      <template v-if='modalInfo.type == 1'>
        <div>{{modalInfo.desc2[0][0]}}</div>
        <div>
          {{modalInfo.desc2[0][1]}}
          <router-link :to="{path:'/noticeSupplyDetail',query:{inquiry_code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>，
          {{modalInfo.desc2[2]}}
          <a href="javascript:;">{{modalInfo.desc2[3]}}</a>
        </div>
        <div style="height:100px;width:100%"></div>
      </template>
      <template v-if='modalInfo.type == 2'>
        <div>{{modalInfo.desc2[0][0]}}</div>
        <div>
          {{modalInfo.desc2[0][1]}}
          <router-link :to="{path:'/offerInfoReback',query:{inquiry_code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>，
          {{modalInfo.desc2[2]}}
          <a href="javascript:;">{{modalInfo.desc2[3]}}</a>
        </div>
        <div style="height:100px;width:100%"></div>
      </template>
      <template v-if='modalInfo.type == 3'>
        <div>{{modalInfo.desc2[0][0]}}</div>
        <div>
          {{modalInfo.desc2[0][1]}}
          <router-link :to="{path:'/supplyContractDetail',query:{code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>，
          {{modalInfo.desc2[2]}}
          <a href="javascript:;">{{modalInfo.desc2[3]}}</a>
        </div>
        <div style="height:100px;width:100%"></div>
      </template>
      <template v-if='modalInfo.type == 5'>
        <div>您的注册资料已审核完成，您已入驻成功。</div>
        <div>您的变更资料已审核完成。</div>
        <div style="height:100px;width:100%"></div>
      </template>
      <template v-if='modalInfo.type == 6'>
        <div>
          {{modalInfo.desc2[0]}}
          {{modalInfo.desc2[1]}}
          {{modalInfo.desc2[2]}}
          <router-link :to="{path:'/supplyContractDetail',query:{code:modalInfo.code}}">
            {{modalInfo.desc2[3]}}
          </router-link>
          {{modalInfo.desc2[4]}}
        </div>
        <div style="height:100px;width:100%" class="text-center">
          <a-button type="primary" class="mt-20 mb-10" @click="confirm(modalInfo.id)">确认</a-button><br/>
          提示：若送货消息通知已接收并确认，请点击确认按钮，便于采购单位接收通知。
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { get_message_list,mark_status,confirm } from "@admin/api/panel";
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
        case '1':
          return '询价结果通知'
          break;
        case '2':
          return '询价撤回通知'
          break;
        case '3':
          return '合同签订完成通知'
          break;
        case '5':
          return '资料审核完成通知'
          break;
        case '6':
          return '送货消息提醒'
          break;
        default:
          return '送货消息提醒'
          break;
      }
    },
    type_code(value){
      switch (value) {
        case '1':
          return '询价单编号：'
          break;
        case '2':
          return '询价单编号：'
          break;
        case '3':
          return '合同编号：'
          break;
        case '5':
          return '注册单号：'
          break;
        case '6':
          return '注册单号：'
          break;
        default:
          return '注册单号：'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ['messageSupply'];
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
      if(this.modalInfo.desc2[0].indexOf('<br>')!=-1){
        this.modalInfo.desc2[0] = this.modalInfo.desc2[0].split('<br>');
      }
      this.modalVisible=true;
    },
    jump(e){
      this.$router.push({path:'/contractDetail',query:{code:modalInfo.code}})
    },
    paginationChange(page) {
      this.page = page;
      this.get_message_list_method();
    },
    confirm(id){
      confirm(id).then(res=>{
        this.$message.success(res.msg);
        this.modalVisible=false;
      }).catch(error=>{
        this.$message.error(error)
      })
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
#messageSupply {
  @include component;
}
</style>
