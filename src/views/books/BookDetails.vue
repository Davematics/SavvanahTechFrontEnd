<template>
  <div class="">
    <div class="antialiased">
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div x-data="{ image: 1 }" x-cloak>
                <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                  <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    <img :src="url + book.cover_photo" alt="" class="ml-auto mr-auto h-64" />
                  </div>
                </div>

                <div class="flex -mx-2 mb-4">
                  <template x-for="i in 4">
                    <div class="flex-1 px-2">
                      <button
                        x-on:click="image = i"
                        :class="{ 'ring-2 ring-indigo-300 ring-inset': image === i }"
                        class="
                          focus:outline-none
                          w-full
                          rounded-lg
                          h-24
                          md:h-32
                          bg-gray-100
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <span x-text="i" class="text-2xl"></span>
                      </button>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="md:flex-1 px-4">
              <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {{ book.title }}
              </h2>
              <p class="text-gray-500 text-sm">
                By <a href="#" class="text-indigo-600 hover:underline">{{ book.author ?  book.author.name:''  }}</a>
              </p>

              <div class="flex items-center space-x-4 my-4">
                <div>
                  <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span class="text-indigo-400 mr-1 mt-1">$</span>
                    <span class="font-bold text-indigo-600 text-3xl">{{ book.price }}</span>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-green-500 text-xl font-semibold">Save 12%</p>
                  <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                </div>
              </div>

              <p class="text-gray-500">
                {{ book.description }}
              </p>

              <div class="flex py-4 space-x-4">
                <button
                  type="button"
                  class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
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
    showDeleteDailog(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.RemoveCompany(id)
        }
      })
    },
    

  
    getBooks() {
      // POST request using fetch with error handling
      let url = import.meta.env.VITE_API_BASE_URL + 'books/' + this.$route.params.id
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

          this.book = data.data
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
    book: [],
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
