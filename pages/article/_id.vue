<template>
  <div>
    <!-- カテゴリやタグを押下した際に、それを元にSearch/index.jpに遷移する機能を付ける。 -->
  </div>
</template>

<script>
import firebase from "~/plugins/firebase.js";
import { mapGetters, mapActions } from "vuex";
export default {
  // URLパラメータに存在する値のみ取得する
  // ※ 同一ページに遷移する方法はないので、middlewareは実装不要
  async asyncData({ route }) {
    const result = await firebase.database()
      .ref("articles/" + route.params.id)
      .once("value")
      .then(snapshot => {
        return snapshot.val();
        // return result;
      })
      .catch(err => {
        console.log("firebase's err =====", err);
        return err;
      });
    return { article: result };
  },
  mounted() {
    // 【本文をHTML要素に追加】
    // 記事本文をHTML要素に追加する際にはHTML文字は変換されるので良い
    //   const divContexts = document.getElementById("contexts");
    //   divContexts.innerHTML = this.articles[0].contents;
    // 使わないかも -> 【HTML文字を変換】
    // for (let article = 0; article < this.articles.length; article++) {
    // this.articles[article].contents = this.articles[article].contents.replace(/&nbsp;/g, ' ');
    //   console.log('run at mounted', this.articles[article].contents.replace(/&nbsp;/g, ' '));
    // }
  }
};
</script>

<style>
</style>