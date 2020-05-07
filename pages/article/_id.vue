<template>
  <div class="container py-5">
    <b-container fluid="sm md lg xl">
      <b-row no-gutters>
        <b-col md="8">
          <articlPageSubject/>
          <div id="contents" class="text-left p-4"></div>
        </b-col>
        <b-col md="4">
          <categoryRanking/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase.js";
import articlPageSubject from '@/components/articlePageSubjectComponent';
import categoryRanking from '@/components/categoryRanking';
import { mapGetters, mapActions } from "vuex";
export default {
  middleware: "getArticle",
  components: {
    articlPageSubject,
    categoryRanking,
  },
  async fetch({ store, route }) {
    await store.dispatch("fetchTargetArticle", { id: route.params.id });
    await store.dispatch("createCategoryRanking");
  },
  computed: {
    ...mapGetters({ article: "getArticle" }),
  },
  async mounted() {
    let id =  this.$route.params.id;
    await this.$nextTick(() => {
      const divContexts = document.getElementById("contents");
      if (!divContexts) {
        this.$router.push({ path: `/article/${id}` });
      } else {
        divContexts.innerHTML = this.article.contents;
      }
    })
  },
};
</script>

<style>
  #contents {
    background-color: #fcfcfc;
  }

  /* 下記はサイトの */
  div#contents > h1 {
		margin:1em 0;  /* 外余白 */
		padding:5px 5px 5px 10px;  /* 内余白 */
		border:6px double #fff;  /* 枠線 */
		color:#fff;  /* 文字色 */
		background:transparent url(/content/img/bg_stripe_dark.png) repeat top left;  /* 背景 */
		font-size:17px;  /* 文字サイズ */
		font-weight:bold;  /* 太字 */
	}
  
  div#contents > h2 {
    border-bottom: solid 1px;
    padding-top: 3%;
    padding-bottom: 2%;
    margin-bottom: 3%;
  }

	pre.ql-syntax {
		margin:1em 0; padding:10px 10px 10px 20px;
		border:1px solid #ccc;
		/* background:#efefef repeat-y top left; */
    background:#222932 repeat-y top left;
    color: white;
		overflow:auto;
	}

	pre.ql-syntax {
		font-family:"ＭＳ ゴシック", "Osaka-等幅", monospace;
		margin:0;
		white-space:pre;
	}
</style>