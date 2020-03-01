export default function ({ store, route, redirect }) {
    // if (process.server) {
        if (route.query.w === undefined || !route.query.w.length) {
            redirect('/');
        }
        // 全角スペースを半角スペースにする
        let searchWordFromUrl = route.query.w.replace(/　/g, ' ');
        if (searchWordFromUrl.match(/\S/g) === null) {
            redirect('/');
        }

        // スペース以外の文字列が存在すればそのまま渡す
        // スペース以外の文字列がなければredirectで/にする
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
            .replace(/ +/g, " ");

        store.commit('setSearchWord', searchWord)
}