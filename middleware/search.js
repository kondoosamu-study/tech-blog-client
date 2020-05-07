export default function ({ store, route, redirect }) {
    if (route.query.w === undefined || !route.query.w.length) {
        redirect('/');
    }

    // 検索ワードが半角スペースのみの場合はトップ画面にリダイレクトする
    let searchWordFromUrl = route.query.w.replace(/　/g, ' ');
    if (searchWordFromUrl.match(/\S/g) === null) {
        redirect('/');
    }

    // 検索ワードをstoreに設定する
    // ここでsearch以外を入力してもNuxt Linkで遷移した時に反映されないので不要
    // if (route.path === '/search') {
        let regex1 = /(&){1}/gi;
        let regex2 = /("){1}/gi;
        let regex3 = /<[^\/]{1}.*?>/gi;
        let regex4 = /<(\/){1}.*?>/gi;
        let searchWord = searchWordFromUrl.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(regex1, '&amp;')
            .replace(regex2, '&quot;')
            .replace(regex3, '<strong>')
            .replace(regex4, '</strong>')
            .replace(/ +/g, " ")
            .trim();

        store.commit('setSearchWord', searchWord);
        store.dispatch('getArticlesBySearchWord', { searchWord: searchWord });
    // }
}