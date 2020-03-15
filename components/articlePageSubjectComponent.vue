<template>
  <b-card img-alt="Thumbnai image" img-left class="mb-3">
    <b-row no-gutters>
    <b-col md="4">
      <b-card-img :src="article.thumbnailUrl" alt="Image" bottom></b-card-img>
    </b-col>
    <b-col md="8">
      <b-card-body :title="article.title" class="text-left py-2">
        <b-card-text class="article-context">
          <p><nuxt-link :to="`/category?name=${article.category}`" class="category-link">カテゴリ: {{ article.category }}</nuxt-link></p>
          <p>タグ: <span v-for="(tag, index) in article.tags" :key="index" class="mr-2">
            <nuxt-link :to="`/search?w=${tag}`" class="category-link">{{ tag }}</nuxt-link>
            </span></p>
          <p>{{ article.updatedAt }}</p>
        </b-card-text>
      </b-card-body>
    </b-col>
    </b-row>
  </b-card>
  <!-- <b-card bg-variant="light" header-bg-variant="dark" :header="`カテゴリ: ${searchCategoryName}`" header-text-variant="white" class="text-left mb-4">
    <b-card-text>
      検索結果: {{numberOfHitCategorizedArticles}}件
    </b-card-text>
  </b-card> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  watch: {
    '$route'(to, from) {
      this.countNumberOfHitCategoriesArticles();
    }
  },
  computed: {
    ...mapGetters({ article: "getArticle" }),
  },
  methods: {
    ...mapActions(['countNumberOfHitCategoriesArticles']),
  }
}
</script>

<style>
#__layout > div > nav {
  color: #fff;
  background-color: #000 !important;
}

#__layout > div > nav > li {
  margin: 0 0 0 auto;
}

form > input {
  height: 100%;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0.3rem;
}

form > input::placeholder {
  font-size: 0.6em;
}

/* SP用のCSS */
@media only screen and (max-device-width: 480px) {
  #__layout > div > nav > a {
    margin: 0 auto !important;
    font-family: Georgia,Times,serif; 
  }
  div > nav > li {
    width: 100% !important;
  }
  div > nav > li > form{
    margin: 0 auto !important;
    width: 100% !important;
  }
}

div > nav > li > form > button {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0px !important;
}
</style>