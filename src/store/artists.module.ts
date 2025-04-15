import artistService from "../services/artists.service"

const initialState = {
	artistsList: [],
	genres: []
}

export const artists = {
	namespaced: true,
	state: initialState,
	actions: {
		getArtists({ commit }) {
			return artistService.getArtists().then((artists) => {
				commit("setArtists", artists)
				return Promise.resolve(artists)
			})
		},
		createArtist({ commit }, artist) {
			return artistService.createArtist(artist).then((response) => {
				commit("addArtist", response.artist)
				return Promise.resolve(response.artist)
			})
		},
		updateArtist({ commit, getters }, artist) {
			return artistService.updateArtist(artist).then((response) => {
				response.artist.index = getters.getArtistStateIndexByID(
					response.artist.id
				)
				commit("setArtist", response.artist)
				return Promise.resolve(response.artist)
			})
		},
		deleteArtist({ commit, getters }, artist) {
			return artistService.deleteArtist(artist).then((response) => {
				response.artist.index = getters.getArtistStateIndexByID(
					response.artist.id
				)
				commit("removeArtist", response.artist)
				return Promise.resolve(response.artist)
			})
		},
		updateArtistPicture({ commit, getters }, artist) {
			return artistService
				.updateArtistPicture(artist)
				.then((response) => {
					response.artist.index = getters.getArtistStateIndexByID(
						response.artist.id
					)
					commit("updateArtistPicture", response.artist)
					return Promise.resolve(response.artist)
				})
		}
	},
	mutations: {
		setArtists(state, artists) {
			state.artistsList = artists.map((artist) => {
				artist.available_qty =
					artist.inventory_total_qty - artist.checked_qty
				return artist
			})
			state.genres = []

			const genreMap = new Map()

			for (const artist of artists) {
				if (artist.genre && !genreMap.has(artist.genre.id)) {
					genreMap.set(artist.genre.id, {
						id: artist.genre.id,
						name: artist.genre.name
					})
				}
			}

			state.genres = Array.from(genreMap.values())
		},
		addArtist(state, artist) {
			artist.available_qty =
				artist.inventory_total_qty - artist.checked_qty
			state.artistsList.push(artist)
		},
		setArtist(state, artist) {
			state.artistsList[artist.index] = artist
		},
		removeArtist(state, artist) {
			state.artistsList.splice(artist.index + 1, 1)
		},
		updateArtistPicture(state, artist) {
			state.artistsList[artist.index].file = artist.file
		}
	},
	getters: {
		getArtistStateIndexByID: (state) => (artistID) => {
			return state.artistsList.findIndex(
				(artist) => artist.id === artistID
			)
		}
	}
}
