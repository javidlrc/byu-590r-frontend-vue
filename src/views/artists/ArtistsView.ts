import { mapState } from "vuex"
import { ref } from "vue"
import axios from "axios"

export default {
	name: "ArtistsView",
	data() {
		return {
			editDialog: false,
			deleteDialog: false,
			createDialog: false,
			ratingDialog: false,
			selectedArtist: null,
			artistRating: {},
			newArtist: {
				name: "",
				description: "",
				favoriteSong: "",
				favAlbum: "",
				country: "",
				genre_id: null,
				file: null
			}
		}
	},
	computed: {
		...mapState({
			artists: (state) => state.artists.artistsList,
			genres: (state) => state.artists.genres
		})
	},
	created() {
		this.getArtists(), this.$store.dispatch("artists/getGenres")
	},
	methods: {
		getArtists() {
			this.$store.dispatch("artists/getArtists")
		},

		openEditDialog(artist) {
			this.selectedArtist = { ...artist }
			this.editDialog = true
		},

		openDeleteDialog(artist) {
			this.selectedArtist = artist
			this.deleteDialog = true
		},

		openRatingDialog(artist) {
			axios.get(`/api/ratings/${artist.id}`).then((response) => {
				this.artistRating = response.data
				this.ratingDialog = true
			})
		},

		createArtist() {
			let formData = new FormData()
			formData.append("name", this.newArtist.name)
			formData.append("description", this.newArtist.description)
			formData.append("favoriteSong", this.newArtist.favoriteSong)
			formData.append("favAlbum", this.newArtist.favAlbum)
			formData.append("country", this.newArtist.country)
			formData.append("genre_id", this.newArtist.genre_id)
			if (this.newArtist.file) {
				formData.append("file", this.newArtist.file)
			}

			this.$store
				.dispatch("artists/createArtist", formData)
				.then(() => {
					this.getArtists()
					this.createDialog = false
					this.resetNewArtist()
				})
				.catch((error) => {
					console.error("Create artist error:", error)
				})
		},

		onNewArtistFileChange(event) {
			const file = event?.target?.files?.[0] || event
			if (file) {
				this.newArtist.file = file
			}
		},

		resetNewArtist() {
			this.newArtist = {
				name: "",
				description: "",
				favoriteSong: "",
				favAlbum: "",
				country: "",
				genre_id: null,
				file: null
			}
		},

		updateArtist() {
			this.artistIsUpdating = true

			let formData = new FormData()
			formData.append("name", this.selectedArtist.name)
			formData.append("description", this.selectedArtist.description)
			formData.append("favoriteSong", this.selectedArtist.favoriteSong)
			formData.append("favAlbum", this.selectedArtist.favAlbum)
			formData.append("country", this.selectedArtist.country)
			formData.append("genre_id", this.selectedArtist.genre_id)

			if (this.selectedArtist.file instanceof File) {
				formData.append("file", this.selectedArtist.file)
			}

			//console.log("🧪 FormData:", [...formData.entries()])

			this.$store
				.dispatch("artists/updateArtist", {
					artistId: this.selectedArtist.id,
					artistData: formData
				})
				.then(() => {
					this.editDialog = false
					this.artistIsUpdating = false
					this.$store.dispatch("artists/getArtists") // force refresh from backend
				})
				.catch((error) => {
					console.error("Update error:", error)
					this.artistIsUpdating = false
				})
		},
		deleteArtist() {
			if (confirm("Are you sure you want to delete this artist?")) {
				this.$store.dispatch(
					"artists/deleteArtist",
					this.selectedArtist
				)
				this.deleteDialog = false
			}
		},
		onEditArtistFileChange(event) {
			const file = event?.target?.files?.[0] || event
			if (file) {
				this.selectedArtist.file = file
			}
		}
	}
}
