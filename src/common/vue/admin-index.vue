<template>
  <div id="baseInfoManage">
    <div class="panel-content">
      <div class="header-status">
        <h3 class="header-status-title">基本信息</h3>
        <button @click="back_to_front1">window.open("/index.html");</button>
        <button @click="back_to_front2">window.open("/index.html#/login");</button>
        <button @click="back_to_front3">window.open(this.global.host + "/index.html");</button>
        <button @click="back_to_front4">window.open(this.global.host + "/index.html#/login");</button>
        <button @click="back_to_front5">location.href = "/index.html";</button>
        <button @click="back_to_front6">location.href = "/index.html#/login";</button>
        <button @click="back_to_front7">location.href = this.global.host + "/index.html";</button>
        <button @click="back_to_front8">location.href = this.global.host + "/index.html#/login";</button>
        <div class="header-status-time">
          <span>
            <svg-icon icon-class="login_icode" />
            创建人：{{createPerson}}
          </span>
          <span style="margin-left:24px;">
            <svg-icon icon-class="login_icode" />
            创建时间：{{createTime}}
          </span>
          <div class="header-status-bar">
            <div class="status-bar">
              <svg-icon icon-class="login_icode" />
              <span>状态：{{status}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="header-bar"></div>
      <div class="header-time-line">
        <h4>流转日志</h4>
        <div class="header-time-line-item">
          <svg-icon class="icon" icon-class="login_icode" />
          <div>日志数据为空~</div>
          <button class="custom-button">查看全部</button>
        </div>
      </div>
    </div>
    <div class="tabulation">
      <h3 class="tabulation-header">入驻</h3>
      <a-table
        class="table"
        :dataSource="dataSource"
        :columns="columns"
        rowKey="id"
        :pagination="pagination"
      >
        <template slot="status" slot-scope="text, record">
          <svg-icon icon-class="login_icode" />
          <span>{{record.status}}</span>
        </template>
        <template slot="operation" slot-scope="text,record,index">
          <button class="edit" @click="handleEdit(index)">详情</button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createPerson: "王雯雯",
      createTime: new Date().Format("YYYY-MM-DD hh:mm:ss"),
      status: "待提交",
      dataSource: [
        {
          id: "0",
          division: "浙江省杭州市西湖区",
          proposer: "王雯雯",
          organization: "中华审核",
          status: "未完善",
          time: new Date().Format("YYYY-MM-DD hh:mm:ss")
        },
        {
          id: "1",
          division: "浙江省杭州市西湖区",
          proposer: "王雯雯",
          organization: "中华审核",
          status: "未完善",
          time: new Date().Format("YYYY-MM-DD hh:mm:ss")
        },
        {
          id: "2",
          division: "浙江省杭州市西湖区",
          proposer: "王雯雯",
          organization: "中华审核",
          status: "未完善",
          time: new Date().Format("YYYY-MM-DD hh:mm:ss")
        }
      ],
      columns: [
        {
          title: "入驻区划",
          dataIndex: "division",
          width: "30%"
        },
        {
          title: "申请人",
          dataIndex: "proposer",
          width: "10%"
        },
        {
          title: "审核机构",
          dataIndex: "organization",
          width: "20%"
        },
        {
          title: "审核状态",
          dataIndex: "status",
          width: "10%"
        },
        {
          title: "入驻时间",
          dataIndex: "time",
          width: "20%"
        },
        {
          width: "10%",
          title: "操作",
          scopedSlots: { customRender: "operation" }
        }
      ],
      totals: 100,
      pagination: {
        showQuickJumper: true,
        showTotal: () => `共${this.totals}条`
      }
    };
  },
  beforeCreate() {},
  mounted() {},
  methods: {
    handleEdit(index) {
      let division = this.dataSource[index].division;
      this.$router.push({ name: "basic_info", params: { division } });
    },
    back_to_front1() {
      window.open("/index.html");
    },
    back_to_front2() {
      window.open("/index.html#/login");
    },
    back_to_front3() {
      window.open(this.global.host + "/index.html");
    },
    back_to_front4() {
      window.open(this.global.host + "/index.html#/login");
    },
    back_to_front5() {
      location.href = "/index.html";
    },
    back_to_front6() {
      location.href = "/index.html#/login";
    },
    back_to_front7() {
      location.href = this.global.host + "/index.html";
    },
    back_to_front8() {
      location.href = this.global.host + "/index.html#/login";
    },
    
  }
};
</script>
<style lang="scss" scoped>
#baseInfoManage {
  width: calc(100% - 220px);
  .panel-content {
    @include horizontalCenter(100%);
    @extend .radius;
    padding: 20px;
    background-color: #fff;
    overflow: hidden;
    .header-status {
      position: relative;
      .header-status-time {
        margin-top: 12px;
      }
      .header-status-bar {
        position: absolute;
        right: 0px;
        font-size: 16px;
        top: 8px;
        .status-bar {
          box-sizing: border-box;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          background: rgba(255, 120, 15, 0.2);
          font-size: 16px;
          white-space: nowrap;
          color: #ff780f;
          padding-right: 10px;
          border-right: 1px dashed #ff780f;
          &:before {
            display: inline-block;
            vertical-align: middle;
            content: "";
            border-left: 10px solid #fff;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
            border-right: 10px solid transparent;
          }
        }
      }
    }
    .header-bar {
      border-bottom: 1px dashed #e5e5e5;
      margin: 24px 0;
      margin-left: -20px;
      width: 110%;
      box-sizing: border-box;
    }
    .header-time-line {
      border: 1px solid #e5e5e5;
      @extend .radius;
      position: relative;
      padding: 26px 100px 26px 111px;
      line-height: 20px;
      h4 {
        position: absolute;
        top: -11px;
        left: 20px;
        background: #fff;
        padding: 0 10px;
        font-size: 14px;
        color: #202020;
      }
      .custom-button {
        position: absolute;
        top: 26px;
        right: 27px;
        padding: 0;
        border: none;
      }
      .icon {
        position: absolute;
        left: 27px;
        top: 26px;
      }
    }
  }
  .tabulation {
    @include horizontalCenter(100%);
    margin-top: 15px;
    padding: 10px;
    background-color: #fff;
    @extend .radius;
    .tabulation-header {
      border-bottom: 1px solid #e1e1e1;
      padding: 10px 0;
      margin-bottom: 10px;
      padding-left: 20px;
    }
    .edit {
      border: none;
      color: $primary1;
    }
  }
}
</style>
<style lang="scss">
.table {
  .ant-table-thead,
  .ant-table-tbody {
    th,
    td {
      padding: 9px 8px;
    }
  }
}
</style>