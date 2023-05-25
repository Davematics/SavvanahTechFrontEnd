<template>
  <aside class="hidden w-64 bg-gray-800 sm:block" id="sideMenu">
    <div class="py-3 text-xl  text-center tracking-widest bg-gray-900 border-b-2 border-gray-800 mb-8">
      <router-link to="/" class="text-white">SavannahTech</router-link>
    </div>

    <nav class="text-sm text-gray-300">
      <ul class="flex flex-col">
        <li class="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold">Section</li>

        <router-link v-slot="{ isExactActive, href, navigate }" to="/" custom>
          <li class="px-4 cursor-pointer" :class="[isExactActive ? 'bg-gray-500 text-gray-800' : 'hover:bg-gray-700']">
            <a class="py-3 flex items-center" :href="href" @click="navigate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </a>
          </li>
        </router-link>

        <li class="px-4 cursor-pointer hover:bg-gray-700">
          <router-link :to="{ name: 'mybooks' }" class="py-2 flex items-center">
            <svg class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
                fill="currentColor"
              />
              <path
                d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
                fill="currentColor"
              />
              <path
                d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
                fill="currentColor"
              />
              <path
                d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
                fill="currentColor"
              />
            </svg>
           My Books
          </router-link>
        </li>
        <li class="px-4 cursor-pointer hover:bg-gray-700">
          <router-link :to="{ name: 'profile' }" class="py-2 flex items-center">
            <svg class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
                fill="currentColor"
              />
              <path
                d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
                fill="currentColor"
              />
              <path
                d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
                fill="currentColor"
              />
              <path
                d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
                fill="currentColor"
              />
            </svg>
            Profile
          </router-link>
        </li>
        

        <li class="px-4 cursor-pointer hover:bg-gray-700">
          <span  class="py-2 flex items-center" @click="logout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            Logout
          </span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import Auth from '../../Auth.js'

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  methods: {
  logout() {
    let url = import.meta.env.VITE_API_BASE_URL + 'logout'
     this.disableButton = true;
     this.LogoutText = "Please wait...";
     const requestOptions = {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         Authorization: "Bearer " + Auth.token,
       },
       body: JSON.stringify({
         email: this.loggedUser.email,
       }),
     };
     fetch(url, requestOptions)
       .then(async (response) => {
         const data = await response.json();
         this.disableButton = false;
         this.LogoutText = "Logout";
         // check for error response
         if (!response.ok) {
           this.LogoutText = "Logout";
           console.log(data.errors);
           this.errors = data.errors;
           // get error message from body or default to response status
           const error = (data && data.message) || response.status;
           return Promise.reject(error);
         }

         this.loginFailed = false;

         Auth.logout(data.data.access_token, data.data);
       //  alert("Logout  successful");
         window.location.href="/login";
       })
       .catch((error) => {
         //alert(process.env.VUE_APP_API_BASE_URL);
         this.LogoutText = "Logout";
         this.loginFailed = true;
         alert(error);
         this.errorMessage = error;
         console.log(error);
       });
   },
  },
  setup() {
    const route = useRoute()

    const isUserManagementActive = computed(() => {
      const names = ['user-list', 'user-detail', 'roles', 'permissions']

      return names.includes(route.name)
    })

    const isUserActive = computed(() => {
      const names = ['user-list', 'user-detail']

      return names.includes(route.name)
    })

    return {
      route,
      isUserManagementActive,
      isUserActive,
    }
  },
  data: () => ({
    errors: [],
    loggedUser: Auth.user,
    loginFailed: false,

  }),
}
</script>
