<template>
  <div class="container py-5 ">
    <b-container fluid="sm md lg xl">
      <!-- start row and col -->  
      <b-row no-gutters>
        <b-col md="8">
          <!-- 記事が存在しなかった場合の表示を追加する -->
        <!-- end row and col -->  
          <div v-for="(article, index) in articlesInSearchResults" :key="index">
            <!-- 【下記はカード毎にmt-2を追加する】 -->
            <b-card no-body class="overflow-hidden w-100">
              <b-row no-gutters>
                <b-col md="2">
                  <b-card-img :src="article.thumbnailUrl" class="rounded-0 thumbnai-image"></b-card-img>
                </b-col>
                <b-col md="10">
                  <b-card-body :title="article.title" class="text-left">
                    <b-card-text class="article-context">{{ article.contents.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/&/g, '').replace(/nbsp;/g, '').replace(/\=/g, '').replace(/gt;/g, '') }}</b-card-text>
                  </b-card-body>
                  <small class="text-muted float-sm-right mx-2">カテゴリ: {{ article.category }} {{ article.updatedAt }}</small>
                </b-col>
              </b-row>
            </b-card>
          </div>
          <div id="contexts"></div>
          <!-- {{items[0].contents}} -->
          <!-- {{ categoryRanking }} -->
          <!-- {{setCategoryRanking}} -->
        <!-- start card section -->
        </b-col>
        <b-col md="4">
					<!-- カテゴリとSearch/index.vueでは最新の投稿を表示させる -->
          <!-- 【下記のml-4はSP画面時にはなくす設定にしたい】 -->
          <!-- img-top設定も可能 -->
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            tag="article"
            class="ml-4"
          >
            <b-card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- end card section -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  middleware: "search",
  async fetch({ store, route }) {
    await store.dispatch('fetchAllArticles');
    await store.dispatch('createCategoryRanking');
    // 【要変更】
    // /searchのみを叩かれた時にroute.query.wの値が存在しない事からエラーが画面が出力されてしまうのでその時の対応をする
		await store.dispatch('getArticlesBySearchWord', { searchWord: route.query.w });
  },
  watch: {
      '$route'(to, from){
          this.fetchAllArticles();
          this.createCategoryRanking();
					this.getArticlesBySearchWord({ searchWord: to.query.w });
      }
  },
  computed: {
    ...mapGetters({ articles: "getArticles" }),
		...mapGetters({ categoryRanking: "getCategoryRanking" }),
		...mapGetters({ articlesInSearchResults: "getSearchResultArticles" }),
  },
  methods: {
    ...mapActions(['fetchAllArticles', 'createCategoryRanking', 'getArticlesBySearchWord'])
  }
};
</script>

<style>
body {
  background-color: #f4f4f4;
  /* #eeeより柔らかい印象 */
}
.container {
  margin: 0 auto;
  /* 下記をやるとspサイズ時に全体の幅をはみ出る */
  /* margin: 0 2%; */
  min-height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
  /* background-color: #f5f5f5; */
  position: relative;
}

.thumbnai-image {
  width: 100%;
  height: 100%;
}

.article-context {
  overflow: hidden;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* 1番目の記事以外にmargin topをつける */
#__layout > div > div > div > div > div.col-md-8 > div:not(:first-child) {
  margin-top: 8px;
}

/* #__layout > div > div > div > div > div.col-md-8 > div {
  height: 100px;
} */

@media only screen and (max-device-width: 480px) {
  #__layout > div > div > div {
    margin-top: 8px;
  }
  div > div > div > img {
    height: 180px !important;
    width: 100%;
  }

  #__layout > div > div > div > div {
    margin-top: 8px;
    margin-left: 0;
    width: 100%;
  }
}
</style>
