<template>
  <b-card bg-variant="light" header-bg-variant="dark" :header="`検索ワード: ${searchWordForTitle}`" header-text-variant="white" class="text-left mb-4">
    <b-card-text>
      検索結果: {{numberOfHitArticles}}件
      <div v-if="!numberOfHitArticles">「{{searchWordForTitle}}」に一致する記事は見つかりませんでした。</div>
    </b-card-text>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  watch: {
    '$route'(to, from) {
      this.countNumberOfHitArticles();
    }
  },
  computed: {
    ...mapGetters({ searchWordForTitle: "getSearchWord" }),
    ...mapGetters({ numberOfHitArticles: "getNumberOfHitArticles" }),
  },
  methods: {
    ...mapActions(['countNumberOfHitArticles']),
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

/* SP用のCSS */
@media only screen and (max-device-width: 480px) {
   /* #__layout > div > div > div > div > div.col-md-4 > div {
    margin-left: 1.5rem !important;
  } */
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