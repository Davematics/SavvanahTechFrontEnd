<template>
  <div class="">
    <div class="flex justify-between px-4 mt-4 sm:px-8">
    <h2 class="text-gray-900">
      <span class="text-xl"
        ><b>{{ loggedUser.name }}</b></span
      >
      Welcome to your dashboard
    </h2>

    <div class="flex items-center space-x-1 text-xs">
      <a href="#" class="font-bold text-indigo-700">Home</a>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-gray-600">Dashboard</span>
    </div>
  </div>
    <div class="flex justify-between px-4 mt-4 sm:px-8">
    <div class="container ml-auto mr-auto flex flex-wrap items-start">
    <div class="w-full pl-5 lg:pl-2 mb-4 mt-4">
      <h1 class="text-3xl lg:text-4xl text-gray-700 font-extrabold">
        Books
      </h1>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2" v-for="book in books">
      <router-link :to="{ name: 'bookDetails' , params: { id: book.id }}" class="py-2 flex items-center">
      <div class="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
        <figure class="mb-2">
          <img :src="url+book.cover_photo" alt="" class="h-64 ml-auto mr-auto" />
        </figure>
        <div class="rounded-lg p-4 bg-purple-700 flex flex-col">
          <div>
            <h5 class="text-white text-2xl font-bold leading-none">
            {{book.title}}
            </h5>
            <span class="text-xs text-gray-400 leading-none" > 
              
               {{ (book.description).substring(0,100)+".." }}
              </span>
             
          </div>
          <div class="flex items-center">
            <div class="text-lg text-white font-light">
              $ {{(book.price).toLocaleString()}}
            </div>
            <button href="javascript:;" class="shadow text-sm p-3 bg-purple-900 text-white hover:bg-white hover:text-purple-900 hover:shadow-xl focus:outline-none  flex ml-auto transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current m-auto">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>Add To Cart
            </button>
          </div>
        </div>
      </div>
      </router-link>
    </div>
    
  </div>
  </div>
</div>
 
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import topAuthors from '@/data/home/topAuthors.json'
import recentSales from '@/data/home/recentSales.json'
import Auth from '../../Auth.js'
import Swal from 'sweetalert2'

export default {
  components: {
    apexchart: VueApexCharts,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  mounted() {
    this.getBooks()
  },
  methods: {
    toggleModal() {
      document.getElementById('modal').classList.toggle('hidden')
    },
    toggleModal2(id) {
      document.getElementById(id).classList.toggle('hidden')
    },
    showMessage(icon, message, title) {
      Swal.fire({
        icon: icon,
        title: title,
        text: message,
      })
    },
    
  

   
    getBooks() {
      // POST request using fetch with error handling
      let url = import.meta.env.VITE_API_BASE_URL + 'books'
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Auth.token,
        },
      }
      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json()
          // check for error response
          if (!response.ok) {
            console.log(data.errors)
            this.errors = data.errors
            // get error message from body or default to response status
            const error = (data && data.message) || response.status
            return Promise.reject(error)
          }

          this.books = data.data
        })
        .catch((error) => {
          this.errorMessage = error
          console.log(error)
        })
    },
   
  },

  data: () => ({
    errors: [],
    loggedUser: Auth.user,
    loginFailed: false,
    // admission_number: "",
    btnText: 'Submit',
    email: '',
    name: '',
    country: '',
    books: [],
    url: import.meta.env.VITE_FILE_BASE_URL,
  }),
  setup() {
    const pageViewOptions = {
      chart: {
        id: 'pageview-chart',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7'],
      },
    }

    const pageViewSeries = [
      {
        name: 'Page view',
        data: [3087, 4403, 3456, 2864, 4956, 6023, 7063],
      },
    ]

    const sessionsOptions = {
      chart: {
        id: 'sessions-chart',
      },
      labels: ['Desktop', 'Mobile', 'Tablet'],
      legend: {
        position: 'bottom',
      },
    }

    const sessionsSeries = [70.9, 27.2, 1.9]

    return {
      pageViewOptions,
      pageViewSeries,
      sessionsOptions,
      sessionsSeries,
      topAuthors,
      recentSales,
    }
  },
}
</script>
