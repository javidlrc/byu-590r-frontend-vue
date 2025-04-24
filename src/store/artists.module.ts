import axios from "axios"
import artistService from "../services/artists.service"
import API_URL from "../services/env"
import authHeader from "../services/auth-header"

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
		updateArtist({ commit, getters }, { artistId, artistData }) {
			return artistService
				.updateArtist({ artistId, artistData }) // 👈 artistData is a FormData
				.then((updatedArtist) => {
					updatedArtist.index = getters.getArtistStateIndexByID(
						updatedArtist.id
					)
					commit("setArtist", updatedArtist)
					return Promise.resolve(updatedArtist)
				})
		},
		deleteArtist({ commit, getters }, artist) {
			return artistService.deleteArtist(artist.id).then((response) => {
				artist.index = getters.getArtistStateIndexByID(artist.id)
				commit("removeArtist", artist)
				return Promise.resolve(response)
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
		},
		getGenres({ commit }) {
			return axios
				.get(API_URL + "genres", { headers: authHeader() })
				.then((res) => {
					commit("setGenres", res.data)
				})
		}
	},
	mutations: {
		setArtists(state, artists) {
			state.artistsList = artists.map((artist) => {
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
			state.artistsList.push(artist)
		},
		setArtist(state, artist) {
			state.artistsList[artist.index] = artist
		},
		removeArtist(state, artist) {
			if (!artist || typeof artist.id !== "number") return
			const index = state.artistsList.findIndex((a) => a.id === artist.id)
			if (index !== -1) {
				state.artistsList.splice(index, 1)
			}
		},
		updateArtistPicture(state, artist) {
			state.artistsList[artist.index].file = artist.file
		},
		setGenres(state, genres) {
			state.genres = genres
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
