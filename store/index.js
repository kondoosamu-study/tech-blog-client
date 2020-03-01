import firebase from "~/plugins/firebase.js";

export const state = () => ({
  articles: [],
  categoryRanking: [],
  articlesInSearchResults: [],
  urlSearchWord: [],
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
  getSearchWord(state) {
    return state.urlSearchWord;
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
  setSearchWord(state, payload) {
    state.urlSearchWord = payload;
  },
}

export const actions = {
  // 将来的にはRedisに保存させて登録・取得を行う
  // https://www.npmjs.com/package/nuxt-ssr-cache
  async fetchAllArticles({ commit }) {
    let articles = await firebase.database().ref("articles").once("value")
      .then(snapshot => {
        let result = [];
        let articlesList = [];
        let listNumber = 0;
        let isFirst = true;
        let firebaseRecodes = snapshot.val();
        for (let recodeNumber in firebaseRecodes) {
          if (firebaseRecodes[recodeNumber].deletedAt) { continue; }
          if (isFirst) {
            result.push(firebaseRecodes[recodeNumber]);
            articlesList.push({ updatedAt: Date.parse(firebaseRecodes[recodeNumber].updatedAt) / 1000 })
            isFirst = false;
            continue;
          }
          listNumber = articlesList.findIndex((article) => article.updatedAt < Date.parse(firebaseRecodes[recodeNumber].updatedAt) / 1000);
          if (listNumber < 0) {
            result.push(firebaseRecodes[recodeNumber]);
            articlesList.push({ updatedAt: Date.parse(firebaseRecodes[recodeNumber].updatedAt) / 1000 })
          } else {
            result.splice(listNumber, 0, firebaseRecodes[recodeNumber]);
            articlesList.splice(listNumber, 0, { updatedAt: Date.parse(firebaseRecodes[recodeNumber].updatedAt) / 1000 });
          }
        }
        return result;
      })
      .catch(err => {
        console.log("firebase's err =====", err);
        return err;
      });
    commit('setAllArticles', articles);
  },
  createCategoryRanking({ commit, state }) {
    const articles = state.articles;
    let categoriesCount = [];
    let categoryNumber = [];
    let isFirst = true;
    for (let article of articles) {
      if (isFirst) {
        categoriesCount.push({ category: article.category, count: 1 })
        isFirst = false;
        continue;
      }
      categoryNumber = categoriesCount.findIndex(categoryCount => categoryCount.category.toLowerCase() === article.category.toLowerCase());
      if (categoryNumber < 0) {
        categoriesCount.push({ category: article.category, count: 1 })
      } else {
        categoriesCount[categoryNumber].count++;
      }
    }
    commit('setCategoryRanking', categoriesCount);
  },
  getArticlesBySearchWord({ commit, state }, { searchWord }) {
    // フローチャート
    // 1. 全記事取得
    // 2. 全記事から検索ワードを含む下記の要素をで取得する
    // ・category
    // ・contents
    // ・tags
    // ・title
    // 3. 検索ワード毎に2の条件に当てはまる記事をカウントする
    // 4. カウントが多い順、次に日付の順番で記事を並び替える
    console.log('searchWord in store', searchWord);
    

    // [変数定義]
    const articles = state.articles;
    // let searchWords = searchWord.split(/\s/);
    // URLで直接入力された時を考慮してHTML文字列の変換を行う
    // 下記は例
    // <script>alert('攻撃');</script>
    let regex1 = /(&){1}/gi;
    let chenge1 = searchWord.replace(regex1, '&amp;')
    let regex2 = /("){1}/gi;
    let chenge2 = chenge1.replace(regex2, '&quot;')
    let regex3 = /<[^\/]{1}.*?>/gi;
    let chenge3 = chenge2.replace(regex3, '<strong>')
    let regex4 = /<(\/){1}.*?>/gi;
    let chenge4 = chenge3.replace(regex4, '</strong>')
    let searchWords = chenge4.split(/\s/);
    console.log(searchWords);
    
    let searchResultsOfCategoies;
    // 検索対象記事のid, updatedAt, count情報を保持
    let matchArticles = [];
    let articleNumber = 0;
    let articlesInSearchResults = [];
    let isFirst = true;

    // [検索ワード毎にループを回す]
    for (let numberOfSearchWords = 0; numberOfSearchWords < searchWords.length; numberOfSearchWords++) {
      // 変数初期化
      // 前回の検索ワードの処理結果を残さない為に
      searchResultsOfCategoies = { category: "", contents: "", tags: "", title: "" };

      // 検索ワードに引っかかった全記事をsearchResultsの各プロパティに格納する
      // 見つかった場合は配列で返ってくる（対象記事が1つでも複数でも配列）
      searchResultsOfCategoies.category = articles.filter(function (article) {
        if (article.category.indexOf(searchWords[numberOfSearchWords]) >= 0) return true;
      })
      searchResultsOfCategoies.contents = articles.filter(function (article) {
        if (article.contents.indexOf(searchWords[numberOfSearchWords]) >= 0) return true;
      })
      searchResultsOfCategoies.tags = articles.filter(function (article) {
        if (article.tags.indexOf(searchWords[numberOfSearchWords]) >= 0) return true;
      })
      searchResultsOfCategoies.title = articles.filter(function (article) {
        if (article.title.indexOf(searchWords[numberOfSearchWords]) >= 0) return true;
      })

      // 検索対象（category等）毎にループを回す
      // searchResultsOfCategoiesオブジェクトの各プロパティに検索で引っかかった記事が全て格納されている
      // 各ワード・カテゴリ毎に1記事毎をカウントアップする
      for (let category of Object.keys(searchResultsOfCategoies)) {
        // 配列数1でも配列の為、添字を付ける必要がある
        if (searchResultsOfCategoies[category].length === 1) {
          let { id, updatedAt } = searchResultsOfCategoies[category][0];
          if (isFirst) {
            matchArticles.push({ id: id, updatedAt: updatedAt, count: 1 });
            isFirst = false;
            continue;
          }
          articleNumber = matchArticles.findIndex(matchArticle => matchArticle.id === id);
          if (articleNumber < 0) {
            matchArticles.push({ id: id, updatedAt: updatedAt, count: 1 });
          } else {
            matchArticles[articleNumber].count++;
          }
        } else if (1 < searchResultsOfCategoies[category].length) {
          for (let row of searchResultsOfCategoies[category]) {
            let { id, updatedAt } = row;
            if (isFirst) {
              matchArticles.push({ id: id, updatedAt: updatedAt, count: 1 });
              isFirst = false;
              continue;
            }
            articleNumber = matchArticles.findIndex(matchArticle => matchArticle.id === id);
            if (articleNumber < 0) {
              matchArticles.push({ id: id, updatedAt: updatedAt, count: 1 });
            } else {
              matchArticles[articleNumber].count++;
            }
          }
        }
      }
    }

    // [検索結果から記事の並び替え]
    matchArticles.sort(function (a, b) {
      if (a.count > b.count) {
        return -1;
      } else if (a.count === b.count) {
        if (Date.parse(a.updatedAt) / 1000 > Date.parse(b.updatedAt) / 1000) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    })

    for (let row of matchArticles) {
      articlesInSearchResults.push(articles.filter((article) => {
        if (article.id === row.id) return article;
      }));
    }
    // 配列で返ってくる為、ネストを削除する
    articlesInSearchResults = articlesInSearchResults.flat();

    commit('setArticlesInSearchResults', articlesInSearchResults);
  },
  setSearchWordFrom({ commit }, { urlSearchWord }) {
    console.log("urlSearchWord", urlSearchWord);
    
    commit('setSearchWord', urlSearchWord);
  }
}