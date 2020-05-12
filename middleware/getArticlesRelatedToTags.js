export default async function ({ store, route, redirect }) {
    if (route.params.tag === undefined || !route.params.tag.length) {
        redirect('/');
    }
    let tag = encodeURIComponent(route.params.tag);

    await store.dispatch("getArticlesByTag", { tag: tag });
}