import firebase from "~/plugins/firebase.js";
export default async function ({ store, route, redirect }) {
	if (route.params.id === undefined || !route.params.id.length) {
			redirect('/');
	}

	let article = await firebase.database().ref("articles/" + route.params.id)
		.once("value")
		.then(snapshot => {
			return snapshot.val();
		})
		.catch(err => {
			console.log("firebase's err =====", err);
			return err;
		});

	if (!article) {
		article = await firebase.database().ref("articles/" + route.params.id)
		.once("value")
		.then(snapshot => {
			return snapshot.val();
		})
		.catch(err => {
			console.log("firebase's err =====", err);
			return err;
		});
	}

	if (!article) {
		redirect('/');
	}

	store.commit('setArticle', article);
}