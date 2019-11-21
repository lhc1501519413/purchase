<template>
  <div id="judge">
    <h5>
      项目评审 / 招标项目评审
      <div class="btn-container">
        <a-button @click="download_tender_file">下载投标文件</a-button>
        <a-button @click="download_bid_file">下载采购文件</a-button>
        <a-button type="primary" @click="online_judge">在线资格评审</a-button>
        <a-button @click="failure">废标</a-button>
        <a-button @click="save">保存</a-button>
        <a-button type="primary" @click="submit">提交</a-button>
        <a-button type="primary" @click="next">下一步</a-button>
      </div>
    </h5>
    <section class="content">
      <a-steps :current="current" labelPlacement="vertical">
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
        <!-- <a-step>
          <div slot="title">
            商务技术评分汇总
            <span class="judge">评</span>
          </div>
        </a-step>-->
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
      </a-steps>
    </section>
    <router-view :father="this"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    download_tender_file() {},
    download_bid_file() {},
    online_judge() {},
    failure() {},
    save() {},
    submit() {},
    next() {
      console.log("下一步");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#judge {
  @include component;
}
</style>
<style lang="scss">
@import '~@admin/assets/scss/steps';
#judge {
  @include steps;
}
</style>