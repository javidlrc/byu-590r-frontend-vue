<template>
	<div class="login-container">
		<div class="login-card">
			<h2 class="login-title">Login</h2>

			<v-form ref="loginForm" v-model="isFormValid">
				<v-text-field
					v-model="username"
					label="Username"
					:rules="usernameRules"
					hide-details="auto"
					required
				></v-text-field>
				<v-text-field
					v-model="password"
					label="Password"
					type="password"
					hide-details="auto"
					:rules="passwordRules"
					required
				></v-text-field>

				<v-alert v-if="errorMsg" :type="alertType" class="login-alert">
					{{ errorMsg }}
				</v-alert>

				<div class="login-actions">
					<v-btn
						class="login-button"
						:disabled="!isFormValid"
						v-if="!isAuthenticated"
						@click="submitLogin"
						:loading="isLoading"
					>
						Login
					</v-btn>
					<v-btn
						class="forgot-button"
						variant="outlined"
						@click="passwordResetDialog = true"
					>
						Forgot Password?
					</v-btn>
					<!-- Register Button -->
					<v-btn
						class="register-button"
						variant="outlined"
						@click="registerDialog = true"
					>
						Register
					</v-btn>
				</div>
			</v-form>
		</div>

		<!-- Reset Password Dialog -->
		<v-dialog v-model="passwordResetDialog">
			<div class="reset-card">
				<h3 class="reset-title">Reset Password</h3>
				<v-text-field
					v-model="resetEmail"
					label="Email"
					required
				></v-text-field>
				<div class="reset-actions">
					<v-btn @click="passwordResetDialog = false">Close</v-btn>
					<v-btn @click="submitPasswordReset">Submit</v-btn>
				</div>
			</div>
		</v-dialog>

		<!-- Register Dialog -->
		<v-dialog v-model="registerDialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="headline">Register</span>
				</v-card-title>
				<v-card-text>
					<v-form ref="registerForm" v-model="isRegisterFormValid">
						<v-text-field
							v-model="register.firstName"
							label="First Name"
							required
							:rules="nameRules"
						></v-text-field>
						<v-text-field
							v-model="register.lastName"
							label="Last Name"
							required
							:rules="nameRules"
						></v-text-field>
						<v-text-field
							v-model="register.email"
							label="Email"
							required
							:rules="emailRules"
						></v-text-field>
						<v-text-field
							v-model="register.password"
							label="Password"
							type="password"
							required
							:rules="passwordRules"
						></v-text-field>
						<v-text-field
							v-model="register.c_password"
							label="Confirm Password"
							type="password"
							required
							:rules="confirmPasswordRules"
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="registerDialog = false">Cancel</v-btn>
					<v-btn
						class="register-button"
						variant="outlined"
						@click="submitRegister"
						:disabled="!isRegisterFormValid"
						:loading="registerFormIsLoading"
					>
						Register
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script src="./LoginView.ts" />
<style src="./LoginView.scss" />
