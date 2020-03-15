<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class to="/">tech blog</b-navbar-brand>
      <searchForm/>
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
import searchForm from '@/components/searchForm';
export default {
  components: {
    searchForm
  },
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

.right {
    margin: 0 0 0 auto;
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
