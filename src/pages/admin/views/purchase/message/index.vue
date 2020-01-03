<template>
  <div id="message">
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
      <template v-if='modalInfo.type == 4'>
      <!-- 
        desc2[0][0]您参与的招标采购合同已签订完成，请及时查收。
        desc2[0][1]合同编号：
        desc2[1]201902132345
        desc2[2]合同标题：浙江大学关于肉类采购的合同 
      -->
        <div>{{modalInfo.desc2[0][0]}}</div>
        <div>
          {{modalInfo.desc2[0][1]}}
          <router-link :to="{path:'/contractDetail',query:{code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>，
          {{modalInfo.desc2[2]}}。
        </div>
      </template>
      <template v-if='modalInfo.type == 7'>
        <div>
          {{modalInfo.desc2[0]}}
          <router-link :to="{path:'/contractDetail',query:{code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>
          {{modalInfo.desc2[2]}}。
        </div>
      </template>
      <template v-if='modalInfo.type == 8'>
        {{modalInfo.desc2[0]}}
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
      <template v-if='modalInfo.type == 14'>
        <div>{{modalInfo.desc2[0][0]}}</div>
        <div>
          {{modalInfo.desc2[0][1]}}
          <router-link :to="{path:'/Contract/contract_detail',query:{code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>，{{modalInfo.desc2[2]}}。
        </div>
      </template>
      <template v-if='modalInfo.type == 34'>
        <div>
          {{modalInfo.desc2[0]}}
          <router-link :to="{path:'/win_detail',query:{id:modalInfo.ext}}">
            {{modalInfo.desc2[1]}}
          </router-link>
          {{modalInfo.desc2[2]}}。
        </div>
      </template>
      <template v-if='modalInfo.type == 37'>
        <div>
          {{modalInfo.desc2[0]}}
          <router-link :to="{path:'/Contract/contract_detail',query:{code:modalInfo.code}}">
            {{modalInfo.desc2[1]}}
          </router-link>
          {{modalInfo.desc2[2]}}。
        </div>
      </template>
      <template v-if='modalInfo.type == 38'>
        <div>
          {{modalInfo.desc2[0]}}
          <router-link 
            v-for="(item,index) of modalInfo.desc2.slice(1,-1)" 
            :key='index' 
            :to="{path:'/Contract/contract_detail',query:{code:item}}"
            >
            {{item}}
          </router-link>
          {{modalInfo.desc2[-1]}}。
        </div>
      </template>
      <div style="height:80px;width:100%"></div>
    </a-modal>
  </div>
</template>

<script>
import { get_message_list,mark_status,del } from "@admin/api/panel";
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
          width: "45%",
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
        case '4':
          return '询价合同退回通知'
        case '7':
          return '供应商回复送货消息通知'
        case '8':
          return '发起询价通知'
        case '10':
          return '采购量预警通知'
        case '14':
          return '招标合同退回通知'
        case '34':
          return '中标通知书确认完成通知'
        case '37':
          return '招标供应商回复送货消息通知'
        case '38':
          return '发起招标通知'
        default:
          return '未知状态'
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
      this.$router.push({path:'/contractDetail',query:{code:this.modalInfo.code}})
    },
    addEnquiry(e){
      this.$router.push({path:'/addEnquiry'})
    },
    paginationChange(page) {
      this.page = page;
      this.get_message_list_method();
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
#message {
  @include component;
}
</style>