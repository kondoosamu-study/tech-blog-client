<template>
  <b-card bg-variant="light" header-bg-variant="dark" :header="`タグ: ${searchTagName}`" header-text-variant="white" class="text-left mb-4">
    <b-card-text>
      検索結果: {{numberOfHitTagsArticles}}件
    </b-card-text>
  </b-card>
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
    ...mapGetters({ searchTagName: "getSearchTagName" }),
    ...mapGetters({ numberOfHitTagsArticles: "getNumberOfHitTagsArticles" }),
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