<template>
  <div id="messageSupply">
    <h5>我的消息</h5>
    <section class="content">
      <a-tabs 
        :activeKey="activeKey"
        @change="callback" 
        :tabBarGutter="15"
        >
        <a-tab-pane key="0,1">
          <div slot="tab">
            全部
          </div>
        </a-tab-pane>
        <a-tab-pane key="0" forceRender>
          <div slot="tab">
            未读
          </div>
        </a-tab-pane>
        <a-tab-pane key="1" forceRender>
          <div slot="tab">
            已读
          </div>
        </a-tab-pane>
      </a-tabs>
      <a-button type="primary" @click="del_all">批量删除</a-button>
      <a-button type="primary" @click="badge_all">批量标为已读</a-button>
      <a-table
        class="mt-10"
        :dataSource="messageList" 
        :columns="columns" 
        :pagination="false" 
        :rowSelection="rowSelection"
        :customRow="rowClick"
        rowKey="id"
        >
        <template slot="titleRender" slot-scope="text">
          <a href="javascript:;" @click.stop="show_detail(text)">
            {{text.title}}
          </a>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="messageList.length" @change="paginationChange"/>
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
          {{modalInfo.desc2[2]}}。
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
          {{modalInfo.desc2[2]}}。
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
          {{modalInfo.desc2[2]}}。
        </div>
        <div style="height:100px;width:100%"></div>
      </template>
      <template v-if='modalInfo.type == 5'>
        <div>{{modalInfo.desc2[0]}}</div>
        <div style="height:100px;width:100%"></div>
      </template>
      <template v-if='modalInfo.type == 6'>
        <div>
          {{modalInfo.desc2[0]}}
          <router-link :to="{path:'/supplyContractDetail',query:{code:modalInfo.code}}">
          {{modalInfo.desc2[1]}}
          </router-link>
          {{modalInfo.desc2[2]}}。
        </div>
        <div style="height:100px;width:100%" class="text-center">
          <a-button type="primary" class="mt-20 mb-10" @click="confirm(modalInfo.id)">确认</a-button><br/>
          提示：若送货消息通知已接收并确认，请点击确认按钮，便于采购单位接收通知。
        </div>
      </template>
      <template v-if='modalInfo.type == 22||modalInfo.type == 24||modalInfo.type == 26'>
        {{modalInfo.desc2[0]}}
        <router-link :to="{path:'/Sbid/spurchase_list',query:{code:modalInfo.code}}">
          {{modalInfo.desc2[1]}}
        </router-link>
        {{modalInfo.desc2[2]}}。
      </template>
      <template v-if='modalInfo.type == 30'>
        {{modalInfo.desc2[0]}}
        <a :href="global.host+'/index.html#/bid_notice_detail_deal?id='+modalInfo.ext" target="_blank">
          {{modalInfo.desc2[1]}}
        </a>
        {{modalInfo.desc2[2]}}。
      </template>
      <template v-if='modalInfo.type == 36'>
        {{modalInfo.desc2[0]}}
        <router-link :to="{path:'/Scontract/contract_detail',query:{code:modalInfo.code}}">
          {{modalInfo.desc2[1]}}
        </router-link>
        {{modalInfo.desc2[2]}}。
      </template>
      <template v-if='modalInfo.type == 40'>
        {{modalInfo.desc2[0]}}
        <router-link :to="{path:'/nature_info'}">
          {{modalInfo.desc2[1]}}
        </router-link>
        {{modalInfo.desc2[2]}}。
      </template>
      <template v-if='modalInfo.type == 41'>
        {{modalInfo.desc2[0]}}
        <router-link :to="{path:'/special_nature_info'}">
          {{modalInfo.desc2[1]}}
        </router-link>
        {{modalInfo.desc2[2]}}。
      </template>
    </a-modal>
  </div>
</template>

<script>
import { get_message_list,mark_status,confirm,del } from "@admin/api/panel";
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
      messageList2: [],
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
      activeKey:'0,1',
      selectedRowKeys:[],
      modalVisible: false,
      modalInfo: {}
    };
  },
  computed:{
    rowSelection(){
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: (selectedRowKeys)=>{
          this.selectedRowKeys = selectedRowKeys;
        }
      }
    }
  },
  filters:{
    type(value){
      switch (value) {
        case '1':
          return '询价结果通知'
        case '2':
          return '询价撤回通知'
        case '3':
          return '询价合同签订完成通知'
        case '5':
          return '资料审核完成通知'
        case '6':
          return '送货消息提醒'
        case '22':
          return '获取采购文件审核通过通知'
        case '24':
          return '获取采购文件审核驳回通知'
        case '26':
          return '采购文件发送通知'
        case '30':
          return '中标结果通知'
        case '36':
          return '招标送货消息通知'
        case '40':
          return '基本资质证件到期提醒'
        case '41':
          return '特殊资质证件到期提醒'
        default:
          return '送货消息提醒'
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
    callback(key) {
      this.activeKey = key;
      this.selectedRowKeys = [];
      if(key.length>1)this.messageList = this.messageList2;
      else this.messageList = this.messageList2.filter(elem=>elem.status==key)
    },
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            if (this.selectedRowKeys.indexOf(record.id) == -1) {
              this.selectedRowKeys.push(record.id);
            } else {
              this.selectedRowKeys.remove(record.id);
            }
          }
        }
      };
    },
    onSelectChange(selectedRowKeys,selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
    },
    get_message_list_method(){
      var page = this.page;
      get_message_list(page).then(res => {
        this.messageList = res.data.list||[];
        this.messageList2 = res.data.list||[];
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error));
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
    del_all(){
      var ids=this.selectedRowKeys.join(',');
      del(ids).then(res=>{
        this.$message.success(res.msg);
        this.messageList = this.messageList.filter(elem=>this.selectedRowKeys.indexOf(elem.id)==-1)
        this.messageList2 = this.messageList2.filter(elem=>this.selectedRowKeys.indexOf(elem.id)==-1)
        this.selectedRowKeys = [];
      }).catch(error=>this.$message.error(error));
    },
    badge_all(){
      var ids=this.selectedRowKeys.join(',');
      mark_status(ids).then(res=>{
        this.$message.success(res.msg);
        this.messageList = this.messageList.filter(elem=>this.selectedRowKeys.indexOf(elem.id)==-1)
        this.messageList2 = this.messageList2.filter(elem=>this.selectedRowKeys.indexOf(elem.id)==-1)
        this.selectedRowKeys = [];
      }).catch(error=>this.$message.error(error));
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
