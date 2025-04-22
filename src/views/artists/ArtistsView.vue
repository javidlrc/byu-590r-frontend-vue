<template>
	<!-- Create New Artist Button -->
	<v-container class="mb-4">
		<v-btn color="primary" @click="createDialog = true">
			Create New Artist
		</v-btn>
	</v-container>

	<v-row>
		<v-col
			v-for="artist in artists"
			:key="artist.id"
			cols="12"
			sm="6"
			md="5"
			lg="4"
			xl="3"
			xxl="2"
		>
			<v-card :key="artist.id" class="artist-card">
				<!-- Display Image If Available -->
				<v-img
					:src="artist.file"
					height="200"
					cover
					v-if="artist.file"
					class="artist-image"
				></v-img>
				<v-card-title class="d-flex justify-space-between align-center">
					<span>{{ artist.name }}</span>
					<span>
						<v-btn
							icon
							color="orange"
							@click="openEditDialog(artist)"
							size="small"
						>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn
							icon
							color="red"
							@click="openDeleteDialog(artist)"
							size="small"
						>
							<v-icon>mdi-delete</v-icon>
						</v-btn>
					</span>
				</v-card-title>
				<v-card-subtitle>{{ artist.description }}</v-card-subtitle>
				<v-card-text>
					<p>
						<strong>Genre:</strong>
						{{ artist.genre?.name || "Unknown" }}
					</p>
					<p>
						<strong>Favorite Song:</strong>
						{{ artist.favoriteSong }}
					</p>
					<p>
						<strong>Favorite Album:</strong> {{ artist.favAlbum }}
					</p>
					<p><strong>Country:</strong> {{ artist.country }}</p>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>

	<!-- Edit Artist Dialog -->
	<v-dialog v-model="editDialog" max-width="500px">
		<v-card>
			<v-card-title>Edit Artist</v-card-title>
			<v-card-text>
				<v-text-field label="Name" v-model="selectedArtist.name" />
				<v-textarea
					label="Description"
					v-model="selectedArtist.description"
				/>
				<v-text-field
					label="Favorite Song"
					v-model="selectedArtist.favoriteSong"
				/>
				<v-text-field
					label="Favorite Album"
					v-model="selectedArtist.favAlbum"
				/>
				<v-text-field
					label="Country"
					v-model="selectedArtist.country"
				/>

				<!-- Genre Selector -->
				<v-select
					label="Select Genre"
					:items="genres"
					item-value="id"
					item-title="name"
					v-model="selectedArtist.genre_id"
				/>

				<!-- Image Uploader -->
				<v-file-input
					label="Upload New Artist Image"
					accept="image/*"
					@change="onEditArtistFileChange"
				/>
			</v-card-text>
			<v-card-actions>
				<v-btn color="primary" @click="updateArtist">Save</v-btn>
				<v-btn @click="editDialog = false">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<!-- Delete Confirmation Dialog -->
	<v-dialog v-model="deleteDialog" max-width="400px">
		<v-card>
			<v-card-title>Confirm Deletion</v-card-title>
			<v-card-text
				>Are you sure you want to delete
				{{ selectedArtist?.name }}?</v-card-text
			>
			<v-card-actions>
				<v-btn color="red" @click="deleteArtist">Delete</v-btn>

				<v-btn @click="deleteDialog = false">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<!-- Rating Dialog -->
	<v-dialog v-model="ratingDialog" max-width="500px">
		<v-card>
			<v-card-title>Artist Rating</v-card-title>
			<v-card-text>
				<p><strong>Lyrics:</strong> {{ artistRating.lyrics }}</p>
				<p><strong>Flow:</strong> {{ artistRating.flow }}</p>
				<p><strong>Impact:</strong> {{ artistRating.impact }}</p>
				<p>
					<strong>Production:</strong> {{ artistRating.production }}
				</p>
				<p>
					<strong>Creativity:</strong> {{ artistRating.creativity }}
				</p>
				<p><strong>Overall:</strong> {{ artistRating.overall }}</p>
			</v-card-text>
			<v-card-actions>
				<v-btn @click="ratingDialog = false">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<!-- Create Artist Dialog -->
	<v-dialog v-model="createDialog" max-width="500px">
		<v-card>
			<v-card-title>Create Artist</v-card-title>
			<v-card-text>
				<v-text-field
					label="Name"
					v-model="newArtist.name"
				></v-text-field>
				<v-textarea
					label="Description"
					v-model="newArtist.description"
				></v-textarea>
				<v-text-field
					label="Favorite Song"
					v-model="newArtist.favoriteSong"
				></v-text-field>
				<v-text-field
					label="Favorite Album"
					v-model="newArtist.favAlbum"
				></v-text-field>
				<v-text-field
					label="Country"
					v-model="newArtist.country"
				></v-text-field>
				<v-select
					label="Select Genre"
					:items="genres"
					item-value="id"
					item-title="name"
					v-model="newArtist.genre_id"
				/>
				<v-file-input
					label="Upload Artist Image"
					accept="image/*"
					@change="onNewArtistFileChange"
				></v-file-input>
			</v-card-text>
			<v-card-actions>
				<v-btn color="primary" @click="createArtist">Create</v-btn>
				<v-btn @click="createDialog = false">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script src="./ArtistsView.ts" />
<style src="./ArtistsView.scss" />
