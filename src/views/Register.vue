<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full">
      <h2 class="ext-center text-xl font-bold text-gray-800 mb-6">Practical Assessment | SavannahTech</h2>
      <h2 class="text-center text- font-bold text-gray-800 mb-6">Create an Account</h2>

      <div></div>

      <form class="space-y-4" @submit.prevent="register">
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            id="name"
            name="name"
            type="text"
            autocomplete="current-password"
            required=""
            class="
              w-full
              py-4
              text-sm text-gray-900
              rounded-md
              pl-10
              border border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
            "
            placeholder="Full Name"
            v-bind:class="{ 'border-red-700': errors.name }"
            v-model="name"
          />
        
        </div>
        <span v-if="errors.name" class="block text-sm text-red-700 -mt-2 mb-4">{{ errors.name[0] }}</span>
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            class="
              w-full
              py-4
              text-sm text-gray-900
              rounded-md
              pl-10
              border border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
            "
            placeholder="Email address"
            required=""
            v-bind:class="{ 'border-red-700': errors.email }"
            v-model="email"
          />
        
        </div>
        <span v-if="errors.email" class="block text-sm text-red-700 mt-2">{{ errors.email[0] }}</span>
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="
              w-full
              py-4
              text-sm text-gray-900
              rounded-md
              pl-10
              border border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
            "
            placeholder="Password"
            v-bind:class="{ 'border-red-700': errors.password }"
            v-model="password"
          />
       
        </div>
        <span v-if="errors.password" class="block text-sm text-red-700 -mt-2 mb-4">{{ errors.password[0] }}</span>
        <div class="relative text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required=""
            class="
              w-full
              py-4
              text-sm text-gray-900
              rounded-md
              pl-10
              border border-gray-300
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
            "
            placeholder="Confirm Password"
            v-bind:class="{ 'border-red-700': errors.password_confirmation }"
            v-model="password_confirmation"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-0 border-gray-300 rounded cursor-pointer"
            />

            <label for="remember-me" class="ml-2 block text-sm text-gray-900 cursor-pointer"> Remember me </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-4
              px-6
              border border-transparent
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            "
          >
            {{ btnText }}
          </button>
        </div>
      </form>

      <div class="mt-2 text-sm text-gray-600">
        Not registered yet?
        <a @click="$router.push({ name: 'login' })" class="font-medium text-indigo-600 hover:text-indigo-500">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../Auth.js'

export default defineComponent({
  name: 'HomePage',
  components: {},
  setup() {
    const router = useRouter()
    return { router }
  },
  data: () => ({
    errors: [],
    disableButton: false,
    loginFailed: false,
    // admission_number: "",
    btnText: 'Submit',
    email: '',
    password: '',
    name: '',
    password_confirmation: '',
  }),
  created() {
    this.checkIfAuth()
  },

  methods: {
    checkIfAuth() {
      if (Auth.token) {
        this.$router.push('/home')
      }
    },

    register() {
      // POST request using fetch with error handling
      let url = import.meta.env.VITE_API_BASE_URL + 'register'
      // alert(import.meta.env.VITE_API_BASE_URL)
      this.disableButton = true
      this.btnText = 'Please wait...'
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          name: this.name,
          country: this.country,
          phone_number: this.phone_number,
          password_confirmation: this.password_confirmation,
        }),
      }
      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json()
          this.disableButton = false
          this.btnText = 'Submit'
          // check for error response
          if (!response.ok) {
            this.btnText = 'Submit'
            console.log(data.errors)
            if( data.errors ){
                this.errors = data.errors;
               }
            // get error message from body or default to response status
            const error = (data && data.message) || response.status
            return Promise.reject(error)
          }

          this.loginFailed = false
          alert('registration successful')
          this.$router.push('/login')
        })
        .catch((error) => {
          //alert(process.env.VUE_APP_API_BASE_URL);
          this.btnText = 'Submit'
          this.loginFailed = true
          // this.presentAlert(error);
          alert(error)
          this.errorMessage = error
          console.log(error)
        })
    },
  },
})
</script>
