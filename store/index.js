import firebase from "~/plugins/firebase.js";
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
  // 将来的にはRedisに保存させて登録・取得を行う
  // https://www.npmjs.com/package/nuxt-ssr-cache
  // async fetchAllArticles({ commit }) {
  //   let articles = await firebase.database().ref("articles").once("value")
  //     .then(snapshot => {
  //       let result = [];
  //       let articlesList = [];
  //       let listNumber = 0;
  //       let isFirst = true;
  //       let firebaseRecodes = snapshot.val();
  //       for (let recodeNumber in firebaseRecodes) {
  //         if (firebaseRecodes[recodeNumber].deletedAt) { continue; }
  //         if (isFirst) {
  //           result.push(firebaseRecodes[recodeNumber]);
  //           articlesList.push({ updatedAt: Date.parse(firebaseRecodes[recodeNumber].updatedAt) / 1000 })
  //           isFirst = false;
  //           continue;
  //         }
  //         listNumber = articlesList.findIndex((article) => article.updatedAt < Date.parse(firebaseRecodes[recodeNumber].updatedAt) / 1000);
  //         if (listNumber < 0) {
  //           result.push(firebaseRecodes[recodeNumber]);
  //           articlesList.push({ updatedAt: Date.parse(firebaseRecodes[recodeNumber].updatedAt) / 1000 })
  //         } else {
  //           result.splice(listNumber, 0, firebaseRecodes[recodeNumber]);
  //           articlesList.splice(listNumber, 0, { updatedAt: Date.parse(firebaseRecodes[recodeNumber].updatedAt) / 1000 });
  //         }
  //       }
  //       return result;
  //     })
  //     .catch(err => {
  //       console.log("firebase's err =====", err);
  //       return err;
  //     });
  //   commit('setAllArticles', articles);
  // },

  async fetchTargetArticle({ commit }, { id }) {
    const { data } = await axios.get(`http://0.0.0.0:3000/api/article/${id}`);
    let tags = data[0].tags.split(',');
    data[0].tags = tags;
    commit('setArticle', data[0]);
  },

  async fetchAllArticles({ commit }) {
    const { data } = await axios.get(`http://0.0.0.0:3000/api/articles`);
    commit('setAllArticles', data);
  },

  async createCategoryRanking({ commit }) {
    const { data } = await axios.get('http://0.0.0.0:3000/api/category-ranking');
    commit('setCategoryRanking', data);
  },

  // getArticlesBySearchWord({ commit, state }, { searchWord }) {
  //   // フローチャート
  //   // 1. 全記事取得
  //   // 2. 全記事から検索ワードを含む下記の要素をで取得する
  //   // ・category
  //   // ・contents
  //   // ・tags
  //   // ・title
  //   // 3. 検索ワード毎に2の条件に当てはまる記事をカウントする
  //   // 4. カウントが多い順、次に日付の順番で記事を並び替える

  //   // [変数定義]
  //   const allArticles = state.articles;
  //   // 検索対象の要素を小文字に変換する為に使用する変数（article.tags.indexOfの時にtagsが配列でarticle.tags.toLowerCase.indexOfができない為）
  //   let articles = [];
  //   let tags = [];
  //   for (let row of state.articles) {
  //     tags = [];
  //     if (row.tags.length === 1) {
  //       tags.push(row.tags[0].toLowerCase());
  //     } else {
  //       for (let tag of tags) {
  //         tags.push(tag.toLowerCase());
  //       }
  //     }

  //     articles.push({
  //       category: row.category.toLowerCase(),
  //       contents: row.contents.toLowerCase(),
  //       createdAt: row.createdAt,
  //       deletedAt: row.deletedAt,
  //       id: row.id,
  //       tags: tags,
  //       thumbnailFullPath: row.thumbnailFullPath,
  //       thumbnailName: row.thumbnailName,
  //       thumbnailUrl: row.thumbnailUrl,
  //       title: row.title.toLowerCase(),
  //       updatedAt: row.updatedAt
  //     })
  //   }

  //   let regex1 = /(&){1}/gi;
  //   let change1 = searchWord.replace(regex1, '&amp;')
  //   let regex2 = /("){1}/gi;
  //   let change2 = change1.replace(regex2, '&quot;')
  //   let regex3 = /<[^\/]{1}.*?>/gi;
  //   let change3 = change2.replace(regex3, '<strong>')
  //   let regex4 = /<(\/){1}.*?>/gi;
  //   let change4 = change3.replace(regex4, '</strong>')
  //   let change5 = change4.toLowerCase();
  //   let searchWords = change5.split(/\s/);
    
  //   let searchResultsOfCategoies;
  //   // 検索対象記事のid, updatedAt, count情報を保持
  //   let matchArticles = [];
  //   let articleNumber = 0;
  //   let articlesInSearchResults = [];
  //   let isFirst = true;

  //   // [検索ワード毎にループを回す]
  //   for (let numberOfSearchWords = 0; numberOfSearchWords < searchWords.length; numberOfSearchWords++) {
  //     // 変数初期化
  //     // 前回の検索ワードの処理結果を残さない為に
  //     searchResultsOfCategoies = { category: "", contents: "", tags: "", title: "" };

  //     // 検索ワードに引っかかった全記事をsearchResultsの各プロパティに格納する
  //     // 見つかった場合は配列で返ってくる（対象記事が1つでも複数でも配列）
  //     searchResultsOfCategoies.category = articles.filter(function (article) {
  //       if (article.category.indexOf(searchWords[numberOfSearchWords]) >= 0) return true;
  //     })
  //     searchResultsOfCategoies.contents = articles.filter(function (article) {
  //       if (article.contents.indexOf(searchWords[numberOfSearchWords]) >= 0) return true;
  //     })
  //     // ※ 下記のtagsは配列の為、拾えきれないことがある。
  //     // よって、回収の余地あり
  //     searchResultsOfCategoies.tags = articles.filter(function (article) {
  //       if (article.tags.indexOf(searchWords[numberOfSearchWords]) >= 0) return true;
  //     })
  //     searchResultsOfCategoies.title = articles.filter(function (article) {
  //       if (article.title.indexOf(searchWords[numberOfSearchWords]) >= 0) return true;
  //     })

  //     // 検索対象（category等）毎にループを回す
  //     // searchResultsOfCategoiesオブジェクトの各プロパティに検索で引っかかった記事が全て格納されている
  //     // 各ワード・カテゴリ毎に1記事毎をカウントアップする
  //     for (let category of Object.keys(searchResultsOfCategoies)) {
  //       // 配列数1でも配列の為、添字を付ける必要がある
  //       if (searchResultsOfCategoies[category].length === 1) {
  //         let { id, updatedAt } = searchResultsOfCategoies[category][0];
  //         if (isFirst) {
  //           matchArticles.push({ id: id, updatedAt: updatedAt, count: 1 });
  //           isFirst = false;
  //           continue;
  //         }
  //         articleNumber = matchArticles.findIndex(matchArticle => matchArticle.id === id);
  //         if (articleNumber < 0) {
  //           matchArticles.push({ id: id, updatedAt: updatedAt, count: 1 });
  //         } else {
  //           matchArticles[articleNumber].count++;
  //         }
  //       } else if (1 < searchResultsOfCategoies[category].length) {
  //         for (let row of searchResultsOfCategoies[category]) {
  //           let { id, updatedAt } = row;
  //           if (isFirst) {
  //             matchArticles.push({ id: id, updatedAt: updatedAt, count: 1 });
  //             isFirst = false;
  //             continue;
  //           }
  //           articleNumber = matchArticles.findIndex(matchArticle => matchArticle.id === id);
  //           if (articleNumber < 0) {
  //             matchArticles.push({ id: id, updatedAt: updatedAt, count: 1 });
  //           } else {
  //             matchArticles[articleNumber].count++;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   // [検索結果から記事の並び替え]
  //   matchArticles.sort(function (a, b) {
  //     if (a.count > b.count) {
  //       return -1;
  //     } else if (a.count === b.count) {
  //       if (Date.parse(a.updatedAt) / 1000 > Date.parse(b.updatedAt) / 1000) {
  //         return -1;
  //       } else {
  //         return 1;
  //       }
  //     } else {
  //       return 1;
  //     }
  //   })

  //   // 検索結果の記事を articlesInSearchResults 変数に格納する
  //   for (let row of matchArticles) {
  //     articlesInSearchResults.push(allArticles.filter((article) => {
  //       if (article.id === row.id) return article;
  //     }));
  //   }
  //   // 配列で返ってくる為、ネストを削除する
  //   // articlesInSearchResults = articlesInSearchResults.flat();

  //   let flatResults = [];
  //   for (let i = 0; i < articlesInSearchResults.length; i++) {
  //     flatResults.push(articlesInSearchResults[i][0]);
  //   }
    

  //   // commit('setArticlesInSearchResults', articlesInSearchResults);
  //   // commit('setNumberOfHitArticles', articlesInSearchResults.length);
  //   commit('setArticlesInSearchResults', flatResults);
  //   commit('setNumberOfHitArticles', flatResults.length);
  // },


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
    
    let { data } = await axios.post('http://0.0.0.0:3000/api/search', {searchWords});
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

  // カテゴリを元に記事を取得するメソッドを定義する
  // getArticlesByCategory({ commit, state }, { category }) {    
  //   const allArticles = state.articles;
  //   let categoryArticles = [];

  //   categoryArticles = allArticles.filter(function (article) {
  //     if (article.category.indexOf(category) >= 0) return true;
  //   })
    
  //   // console.log('categoryArticles === ', categoryArticles);
    
  //   commit('setCategorizedArticles', categoryArticles);
  //   commit('setNumberOfHitCategorizedArticles', categoryArticles.length);
  //   commit('setSearchCategoryName', category);
  // },


  // カテゴリを元に記事を取得するメソッドを定義する
  async getArticlesByCategory({ commit }, { category }) {
    const { data } = await axios.get(`http://0.0.0.0:3000/api/category/${category}`);
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
    const { data } = await axios.get(`http://0.0.0.0:3000/api/tag/${tag}`);
    commit('setArticlesRelatedToTags', data);
    commit('setNumberOfHitTagsArticles', data.length);
    commit('setSearchTagName', tag);
  },
}