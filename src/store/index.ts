import { createStore } from "vuex"
import { auth } from "./auth.module"
import { user } from "./user.module"
import { artists } from "./artists.module"
const store = createStore({
	modules: {
		auth,
		user,
		artists
	}
})

export default store
