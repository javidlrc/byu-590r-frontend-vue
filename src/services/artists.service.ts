import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"

class ArtistsService {
	getArtists() {
		return axios
			.get(API_URL + "artists", { headers: authHeader() })
			.then((response) => response.data.data) // returns the list of artists
	}

	createArtist(artistData: FormData) {
		return axios
			.post(API_URL + "artists", artistData, {
				headers: authHeader("multipart")
			})
			.then((response) => response.data.data) // returns { artist: ... }
	}

	updateArtist({ artistId, artistData }) {
		return axios
			.put(`${API_URL}artists/${artistId}`, artistData, {
				headers: authHeader("multipart")
			})
			.then((response) => response.data.data.artist) // adjust depending on your backend return
	}

	deleteArtist(artistId: number) {
		return axios
			.delete(`${API_URL}artists/${artistId}`, {
				headers: authHeader()
			})
			.then((response) => response.data.data) // returns { artist: ... }
	}

	updateArtistPicture(artist: { id: number; data: FormData }) {
		return axios
			.put(`${API_URL}artists/${artist.id}/picture`, artist.data, {
				headers: authHeader()
			})
			.then((response) => response.data.data) // returns { artist: ... }
	}
}

const artistsService = new ArtistsService()
export default artistsService
