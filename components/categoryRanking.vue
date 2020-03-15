<template>
  <b-card border-variant="light" header-bg-variant="dark" header-text-variant="white"  header="カテゴリ一覧" class="text-center category-card">
    <b-list-group v-for="(category, index) in categoryRanking" :key="index" flush>
      <nuxt-link :to="`/category?name=${category.category}`" class="category-link">
        <b-list-group-item class="text-left p-2 text-truncate">
          {{ index+1 }}. {{ category.category }}<small class="float-sm-right text-sm-right pt-1">{{ category.count }}posts</small>
        </b-list-group-item>
      </nuxt-link>
    </b-list-group>
    </b-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  async fetch({ store, route }) {
      await store.dispatch("createCategoryRanking");
  },
  computed: {
    ...mapGetters({ categoryRanking: "getCategoryRanking" }),
  },
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

/* カテゴリランキングのヘッダー部分 */
div > div.bg-dark {
  background-color: #000 !important;
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

  /* カテゴリランキングコンポーネント */
  .category-card {
    margin: 25px auto 0 auto!important;
  }

  /* カテゴリランキングのpost数 */
  #__layout > div > div > div > div.row.no-gutters > div.col-md-4 > div > div.card-body > div > a > div > small{
    float: right !important;
  }
}

div > nav > li > form > button {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0px !important;
}

/* SP用のCSS */
@media only screen and (max-device-width: 480px) {
   /* #__layout > div > div > div > div > div.col-md-4 > div { */
  
}

@media only screen and (min-width:480px) and (max-width:767px) {
  /* カテゴリ */
  #__layout > div > div > div > div {
    margin-top: 8px;
    margin-left: 0 !important;;
    width: 100%;
  }
  #__layout > div > div > div > div > div.col-md-4 > div {
    margin-left: 1.5rem !important;
  }
}

@media only screen and (min-width:767px) {
  /* カテゴリ */
  /* #__layout > div > div > div > div {
    margin-top: 8px;
    margin-left: 0 !important;;
    width: 100%;
  } */
  #__layout > div > div > div > div > div.col-md-4 > div {
    margin-left: 1.5rem !important;
  }
}
</style>