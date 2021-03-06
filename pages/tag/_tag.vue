<template>
  <div class="container py-5">
    <b-container fluid="sm md lg xl">
      <tagPageSubjectComponent/>
      <b-row no-gutters>
        <b-col md="8">
          <div v-for="(article, index) in articlesInSearchResults" :key="index">
            <nuxt-link :to="`/article/${article.id}`" class="article-link">
              <b-card no-body class="overflow-hidden w-100">
                <b-row no-gutters>
                  <b-col md="2">
                    <b-card-img :src="article.thumbnailUrl" class="rounded-0 thumbnail-image" alt="article-thumbnail"></b-card-img>
                  </b-col>
                  <b-col md="10">
                    <b-card-body :title="article.title" class="text-left">
                      <b-card-text class="article-context">
                        {{ article.contents.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').replace(/&/g, '').replace(/nbsp;/g, '').replace(/\=/g, '').replace(/gt;/g, '') }}
                      </b-card-text>
                    </b-card-body>
                    <small class="text-muted float-sm-right mx-2">カテゴリ: {{ article.category }} {{ article.updatedAt }}</small>
                  </b-col>
                </b-row>
              </b-card>
            </nuxt-link>
          </div>
        </b-col>
        <b-col md="4">
          <categoryRanking />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tagPageSubjectComponent from "@/components/tagPageSubjectComponent";
import categoryRanking from "@/components/categoryRanking";
export default {
  middleware: "getArticlesRelatedToTags",
  components: {
    tagPageSubjectComponent,
    categoryRanking
  },
  async fetch({ store, route }) {
    await store.dispatch("createCategoryRanking");
    let tag = encodeURIComponent(route.params.tag);
    await store.dispatch("getArticlesByTag", { tag: tag });
  },
  watch: {
    '$route'(to, from) {
      this.createCategoryRanking();
      this.getArticlesByTag({ tag: to.params.tag });
    }
  },
  computed: {
    ...mapGetters({ categoryRanking: "getCategoryRanking" }),
    ...mapGetters({ articlesInSearchResults: "getArticlesRelatedToTags" }),
  },
  async mounted() {
    await this.checkArticlesExists();
  },
  methods: {
    ...mapActions(["createCategoryRanking", "getArticlesByTag",]),
    checkArticlesExists() {
      if (!this.articlesInSearchResults.length) {
        this.$router.push('/');
      }
    },
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

.thumbnail-image {
  width: 100%;
  object-fit: cover;
  object-position: 0 0;
  height: auto;
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

.category-link {
  color: #2f3031 !important;
}

.category-link:hover {
  font-weight: bold;
  text-decoration: none;
}

/* #__layout > div > div > div > div > div.col-md-8 > div {
  height: 100px;
} */

@media only screen and (max-device-width: 480px) {
  /* コンテンツ */
  #__layout > div > div > div {
    margin-top: 8px;
  }

  /* サムネイル画像 */
  div > div > div > img {
    height: 180px !important;
    width: 100%;
  }

  /* カテゴリ */
  #__layout > div > div > div > div {
    margin-top: 8px;
    margin-left: 0;
    width: 100%;
  }
  .thumbnail-image {
    width: 100%;
    object-fit: cover;
    object-position: 0 0;
    height: auto;
    padding: 2%;
  }
}

@media only screen and (min-width:480px) and (max-width:1024px) {
  /* カテゴリ */
  #__layout > div > div > div > div {
    margin-top: 8px;
    margin-left: 0;
    width: 100%;
  }
}
</style>
