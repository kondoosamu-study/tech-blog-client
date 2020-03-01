<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class to="/">tech blog</b-navbar-brand>
      <!-- 下記のform部分のみをcomponentにして組み込んだ方が良い -->
      <b-nav-form @submit="onSubmit" class="h-100">
        <b-form-input v-model="formSearchWord" required class="my-sm-0 w-75" size="lg" placeholder="キーワードを入力して下さい"></b-form-input>
        <b-button class="my-sm-0 w-25" size="lg" type="submit">
          <font-awesome-icon :icon="['fas', 'search']" />
        </b-button>
      </b-nav-form>
    </b-navbar>
    <nuxt />
    <footer>
      <div class="light copyright-box text-center py-3" style="background-color: #000;">
        &copy; 2020 Copyright:
        <nuxt-link to="/" style="color: white;">tech blog</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script>
// どうにもうまく動かない為、componentsに変更した方が良さそうかも
// /search/index.vue以外（/(index.vue)トップページとarticle/_id.vue）には検索ワードを表示させない
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      formSearchWord: "",
    }
  },
  async fetch({ store, route }) {
		await store.dispatch('setSearchWordFrom', { urlSearchWord: route.query.w });
  },
  computed: {
    ...mapGetters({ urlSearchWord: "getSearchWord" }),
  },
  async mounted() {
    if (this.urlSearchWord.length) {
      await this.mountSearchWordsOnFormParameter();
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // フローチャート
      // ・検索文字形成とsearch/index.jsに遷移させる
      // 1. formの値を取得する
      // 2. formの値を空白（全角、半角）を削除する（escapeSpecialCharsメソッド）
      // -> 先ず全角スペースを半角に変換する
      // -> 半角スペース毎にsplitする
      // 3. search/index.jsにURLパラメーターを持って遷移させる
      let searchWordFromUrl = this.escapeSpecialChars(this.formSearchWord);
      this.formSearchWord = searchWordFromUrl.replace(/　/g, ' ');
      searchWordFromUrl = this.formSearchWord.replace(/ +/g, " ");
      if (searchWordFromUrl.match(/\S/g) === null) {
            this.formSearchWord ='';
      } else {
        this.$router.push({ path: 'search', query: { w: searchWordFromUrl } });
      }
    },
    escapeSpecialChars(searchWord) {
      return searchWord
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
        // .replace(/\\[ntsS]/g, "");
    },
    mountSearchWordsOnFormParameter() {
      this.formSearchWord = this.urlSearchWord;
    },
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#__layout > div > nav {
  color: #fff;
  background-color: #000 !important;
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

div > footer {
  color: white !important;
  background-color: #000 !important;
}
</style>
