export default async function ({ store, route, redirect }) {
	if (route.params.id === undefined || !route.params.id.length) {
			redirect('/');
	}

	await store.dispatch("fetchTargetArticle", { id: route.params.id });
	
	if (!store.state.article) {
		await store.dispatch("fetchTargetArticle", { id: route.params.id });
	}

	if (!store.state.article) {
		redirect('/');
	}
}