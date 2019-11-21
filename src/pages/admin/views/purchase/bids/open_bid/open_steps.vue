<template>
  <div id="open_steps">
    <h5>
      招标管理 / 开标评标管理 / 评审小组设置
      <a-button type="primary" @click="next">下一步</a-button>
    </h5>
    <section class="content">
      <a-steps :current="current" labelPlacement="vertical">
        <a-step>
          <div slot="title">
            开标记录
            <br />
            <span>(资格商务审查)</span>
            <span class="open">开</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            资格审查
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            符合性评审
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            商务技术评分
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            商务技术评分汇总
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            商务技术结果公布
            <span class="open">开</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            开标记录
            <br />
            <span>(报价)</span>
            <span class="open">开</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            报价评审
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            得分汇总
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title">
            结果公布
            <span class="open">开</span>
          </div>
        </a-step>
      </a-steps>
    </section>
    <router-view :father="this" ref='child'></router-view>
  </div>
</template>

<script>
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      current: 0
    };
  },
  created() {
    this.father.selectedKeys = ["/Bid/open_bid_list"];
  },
  methods: {
    next() {
      this.$refs.child.next()
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#open_steps {
  @include component;
}
</style>
<style lang="scss">
@import '~@admin/assets/scss/steps';
#open_steps {
  @include steps;
}
</style>