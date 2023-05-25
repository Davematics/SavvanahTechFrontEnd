<template>
  <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-2xl text-gray-600">Profile</h2>
    <div class="flex items-center space-x-1 text-xs">
      <router-link to="/" class="font-bold text-indigo-700">Home</router-link>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Profile</span>
    </div>
  </div>
  
     <form  @submit.prevent="update('update')" id="update">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label> Name</label>
        <input type="text" class="w-full bg-gray-100 p-2 mt-2 mb-3"  v-bind:class="{ 'border-red-700': errors.name }"
            v-model="name" name="name" />
            <span
                    v-if="errors.name"
                    class="block text-sm text-red-700 -mt-2 mb-4"
                    >{{ errors.name[0] }}</span
                  >
        <label> Email</label>
        <input type="email" class="w-full bg-gray-100 p-2 mt-2 mb-3"  v-bind:class="{ 'border-red-700': errors.email }"
            v-model="email"  name="email" readonly/>
            <span
                    v-if="errors.email"
                    class="block text-sm text-red-700 -mt-2 mb-4"
                    >{{ errors.email[0] }}</span
                  >
                  
      </div>
      <!-- <div class="bg-gray-200 px-4 py-3 text-right">
        <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" @click="toggleModal()"><i class="fas fa-times"></i> Cancel</button>
        <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"><i class="fas fa-plus"></i> 
          {{ btnText }}
        </button>
      </div> -->
    </form>
  
       
</template>

<script>
import Auth from '../Auth.js'
import Swal from 'sweetalert2'

export default {
  components: {
   
  },
  data: () => ({
    errors: [],
    loggedUser: Auth.user,
    loginFailed: false,
    // admission_number: "",
    btnText: 'Submit',
    email: Auth.user.email,
    name: Auth.user.name,
    country: Auth.user.country,
    phone_number: Auth.user.phone_number,
    companies:[]
  }),
  methods: {
  showMessage(icon,message,title){
  Swal.fire({
  icon: icon,
  title: title,
  text: message,
})
},
  update(formId) {
   
      let url = import.meta.env.VITE_API_BASE_URL + 'profile/update'
     
      let myForm = document.getElementById(formId); 
         let formData = new FormData(myForm);
      this.disableButton = true
      this.btnText = 'Please wait...'
      const requestOptions = {
        method: 'POST',
        headers: {
      
          Accept: 'application/json',
          Authorization: "Bearer " + Auth.token,
        },
        body:formData
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
            this.errors = data.errors
            // get error message from body or default to response status
            const error = (data && data.message) || response.status
            return Promise.reject(error)
          }

          this.loginFailed = false
          console.log(data.data)
          window.localStorage.setItem('user', JSON.stringify(data.data));
          this.showMessage('success','Profile updated','success')
          setTimeout(function(){
            window.location.href="/profile";
            }, 3000);
        
        })
        .catch((error) => {
          
          this.btnText = 'Submit'
          this.loginFailed = true
         
          this.showMessage('error',error,'sorry')
          this.errorMessage = error
          console.log(error)
        })
    },
  }
}
</script>
