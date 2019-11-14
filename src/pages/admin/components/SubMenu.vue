<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <svg-icon v-if="props.menuInfo.key==='//online_inquiry'" icon-class="icon_sidenav_Inquiry_h" />
      <svg-icon v-if="props.menuInfo.key==='//bid_mangge'" icon-class="icon_sidenav_Entering_h" />
      <svg-icon v-if="props.menuInfo.key==='//project_eval'" icon-class="icon_sidenav_Entering_h" />
      <span v-show="!props.collapsed">{{props.menuInfo.title}}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.key">
        <span>{{item.title}}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ['menuInfo','collapsed'],
};
</script>
