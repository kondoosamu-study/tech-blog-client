import axios from 'axios';

export const state = () => ({
  articles: [],
  categoryRanking: [],
  articlesInSearchResults: [],
  numberOfHitArticles: 0,
  urlSearchWord: [],
  categorizedArticles: [],
  numberOfHitCategorizedArticles: 0,
  searchCategoryName: '',
  article: [],
  articlesRelatedToTags: [],
  numberOfHitTagsArticles: 0,
  searchTagName: '',
})

export const getters = {
  getArticles(state) {
    return state.articles;
  },
  getCategoryRanking(state) {
    return state.categoryRanking;
  },
  getSearchResultArticles(state) {
    return state.articlesInSearchResults;
  },
  getNumberOfHitArticles(state) {
    return state.numberOfHitArticles;
  },
  getSearchWord(state) {
    return state.urlSearchWord;
  },
  getCategorizedArticles(state) {
    return state.categorizedArticles;
  },
  getNumberOfHitCategorizedArticles(state) {
    return state.numberOfHitCategorizedArticles;
  },
  getSearchCategoryName(state) {
    return state.searchCategoryName;
  },
  getArticle(state) {
    return state.article;
  },
  getArticlesRelatedToTags(state) {
    return state.articlesRelatedToTags;
  },
  getNumberOfHitTagsArticles(state) {
    return state.numberOfHitTagsArticles;
  },
  getSearchTagName(state) {
    return state.searchTagName;
  },
}

export const mutations = {
  setAllArticles(state, payload) {
    state.articles = payload;
  },
  setCategoryRanking(state, payload) {
    state.categoryRanking = payload;
  },
  setArticlesInSearchResults(state, payload) {
    state.articlesInSearchResults = [];
    state.articlesInSearchResults = payload;
  },
  setNumberOfHitArticles(state, payload) {
    state.numberOfHitArticles = payload;
  },
  setSearchWord(state, payload) {
    state.urlSearchWord = payload;
  },
  setCategorizedArticles(state, payload) {
    state.categorizedArticles = payload;
  },
  setNumberOfHitCategorizedArticles(state, payload) {
    state.numberOfHitCategorizedArticles = payload;
  },
  setSearchCategoryName(state, payload) {
    state.searchCategoryName = payload;
  },
  setArticle(state, payload) {
    state.article = payload;
  },
  setArticlesRelatedToTags(state, payload) {
    state.articlesRelatedToTags = payload;
  },
  setNumberOfHitTagsArticles(state, payload) {
    state.numberOfHitTagsArticles = payload;
  },
  setSearchTagName(state, payload) {
    state.searchTagName = payload;
  },
}

export const actions = {
  async fetchTargetArticle({ commit }, { id }) {
    const { data } = await axios.get(`https://ok-engineering.net/api/article/${id}`);
    let tags = data[0].tags.split(',');
    data[0].tags = tags;
    commit('setArticle', data[0]);
  },

  async fetchAllArticles({ commit }) {
    const { data } = await axios.get(`https://ok-engineering.net/api/articles`);
    commit('setAllArticles', data);
  },

  async createCategoryRanking({ commit }) {
    const { data } = await axios.get('https://ok-engineering.net/api/category-ranking');
    commit('setCategoryRanking', data);
  },

  async getArticlesBySearchWord({ commit }, { searchWord }) {
    let regex1 = /(&){1}/gi;
    let change1 = searchWord.replace(regex1, '&amp;')
    let regex2 = /("){1}/gi;
    let change2 = change1.replace(regex2, '&quot;')
    let regex3 = /<[^\/]{1}.*?>/gi;
    let change3 = change2.replace(regex3, '<strong>')
    let regex4 = /<(\/){1}.*?>/gi;
    let change4 = change3.replace(regex4, '</strong>')
    let change5 = change4.toLowerCase();
    let searchWords = change5.split(/\s/);
    
    let { data } = await axios.post('https://ok-engineering.net/api/search', {searchWords});
    commit('setArticlesInSearchResults', data);
    commit('setNumberOfHitArticles', data.length);
  },

  countNumberOfHitArticles({ commit, state }) {
    let numberOfHitArticles = state.articlesInSearchResults.length;
    commit('setNumberOfHitArticles', numberOfHitArticles);
  },

  setSearchWordFrom({ commit }, { urlSearchWord }) {
    commit('setSearchWord', urlSearchWord);
  },

  async getArticlesByCategory({ commit }, { category }) {
    const { data } = await axios.get(`https://ok-engineering.net/api/category/${category}`);
    // tagsを配列に変更する必要がある
    let numberOfLoops = 0;
    for (let row of data) {
      let tags = data[numberOfLoops].tags.split(',');
      data[numberOfLoops].tags = tags;
      numberOfLoops++;
    }
    commit('setCategorizedArticles', data);
    commit('setNumberOfHitCategorizedArticles', data.length);
    commit('setSearchCategoryName', category);
  },

  countNumberOfHitCategoriesArticles({ commit, state }) {
    let numberOfHitArticles = state.categorizedArticles.length;
    commit('setNumberOfHitCategorizedArticles', numberOfHitArticles);
  },

  async getArticlesByTag({ commit }, { tag }) {
    const { data } = await axios.get(`https://ok-engineering.net/api/tag/${tag}`);
    commit('setArticlesRelatedToTags', data);
    commit('setNumberOfHitTagsArticles', data.length);
    commit('setSearchTagName', tag);
  },
}