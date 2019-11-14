<template>
  <div id>
    <a-menu
      class="nav"
      :class="{width:!collapsed}"
      :defaultOpenKeys="defaultOpenKeys"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
      @click="changeMenuItem"
      :selectedKeys="selectedKeys"
    >
      <a-menu-item key="bids">
        <svg-icon icon-class="icon_sidenav_home_h" />
        <span v-show="!collapsed">招投标管理</span>
      </a-menu-item>
      <a-menu-item v-if="type==1" key="panel">
        <svg-icon icon-class="icon_sidenav_home_h" />
        <span v-show="!collapsed">我的面板</span>
      </a-menu-item>
      <a-menu-item v-if="type==0" key="panelSupply">
        <svg-icon icon-class="icon_sidenav_home_h" />
        <span v-show="!collapsed">我的面板</span>
      </a-menu-item>
      <a-menu-item v-if="type==1" key="message">
        <svg-icon icon-class="icon_sidenav_mes_h" />
        <span v-show="!collapsed">我的消息</span>
      </a-menu-item>
      <a-menu-item v-if="type==0" key="messageSupply">
        <svg-icon icon-class="icon_sidenav_mes_h" />
        <span v-show="!collapsed">我的消息</span>
      </a-menu-item>
      <!-- --------------------------- 采购方 --------------------------------- -->
      <a-menu-item v-if="com_info" key="supplyManage">
        <svg-icon icon-class="icon_sidenav_supplier_h" />
        <span v-show="!collapsed">供应商审核</span>
      </a-menu-item>
      <a-menu-item v-if="com_info" key="supplyInfo">
        <svg-icon icon-class="icon_sidenav_list_h" />
        <span v-show="!collapsed">供应商列表</span>
      </a-menu-item>
      <a-sub-menu v-if="com_info" key="sub2">
        <span slot="title">
          <svg-icon icon-class="icon_sidenav_Inquiry_h" />
          <span v-show="!collapsed">在线询价</span>
        </span>
        <a-menu-item key="enquiry">询价单管理</a-menu-item>
        <a-menu-item key="noticeList">公告管理</a-menu-item>
        <a-menu-item key="contract">合同管理</a-menu-item>
      </a-sub-menu>
      <!-- --------------------------- 供应商 --------------------------------- -->
      <a-sub-menu v-if="type==0" key="sub1">
        <span slot="title">
          <svg-icon icon-class="icon_sidenav_Entering_h" />
          <span v-show="!collapsed">入驻信息管理</span>
        </span>
        <!-- --------------------------- 供应商未审核完成 --------------------------------- -->
        <a-menu-item v-if="supply_info.is_audit==0" key="registerDataComplete">供应商入驻</a-menu-item>
        <a-menu-item key="basic_info">基本信息管理</a-menu-item>
        <a-menu-item key="registerChange">注册变更记录</a-menu-item>
      </a-sub-menu>
      <!-- --------------------------- 供应商审核完成 --------------------------------- -->
      <a-sub-menu v-if="type==0 && supply_info.is_audit==1" key="sub2">
        <span slot="title">
          <svg-icon icon-class="icon_sidenav_Inquiry_h" />
          <span v-show="!collapsed">在线询价</span>
        </span>
        <a-menu-item key="enquirySupply">报价单管理</a-menu-item>
        <a-menu-item key="noticeListSupply">公告管理</a-menu-item>
        <a-menu-item key="contractSupply">合同管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>