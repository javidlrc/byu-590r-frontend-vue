export default {
	name: "LoginView",
	emits: ["authenticate"],
	data() {
		return {
			// Declare variables for dialog and form
			registerDialog: false,
			isRegisterFormValid: false,
			registerFormIsLoading: false,
			isFormValid: false, // <-- Add this for login validation
			isLoading: false, // <-- Add this for login spinner
			username: "", // <-- Add this to capture the username field
			password: "", // <-- Add this to capture the password field
			errorMsg: "",
			// Validation rules
			nameRules: [(value) => !!value || "This field is required"],
			emailRules: [
				(value) => /.+@.+\..+/.test(value) || "Enter a valid email"
			],
			passwordRules: [(value) => !!value || "Password is required"],
			confirmPasswordRules: [
				(value) =>
					value === this.register.password || "Passwords do not match"
			],
			// Register form data
			register: {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				c_password: ""
			}
		}
	},
	methods: {
		submitLogin() {
			if (!this.isFormValid) {
				return
			}
			const user = {
				email: this.username,
				password: this.password
			}
			this.errorMsg = ""
			this.isLoading = true // Start the loading spinner
			this.$store.dispatch("auth/login", user).then(
				() => {
					setTimeout(() => {
						window.location.reload()
					}, 2000)
				},
				(error) => {
					this.isLoading = false // Stop the loading spinner
					this.errorMsg =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
		},

		submitRegister() {
			if (!this.isRegisterFormValid) {
				return
			}

			const register = {
				name: this.register.firstName + " " + this.register.lastName,
				email: this.register.email,
				password: this.register.password,
				c_password: this.register.c_password
			}

			this.registerFormIsLoading = true
			this.$store.dispatch("auth/register", register).then(
				() => {
					alert("Registration successful!")
					this.registerFormIsLoading = false
					this.registerDialog = false
				},
				(error) => {
					this.registerFormIsLoading = false
					alert("Registration failed!")
				}
			)
		}
	}
}
