<template>
  <div class="mt-8 sm:grid-cols-5 sm:px-8 px-4">
    <div class="bg-white border rounded-lg shadow">
      <div class="flex justify-between items-center px-4 py-2 mb-2 border-b-2 text-gray-600">
        <h3 class="tracking-wider">Books</h3>
        <button class="border rounded-sm bg-gray-200 px-4 py-2 text-xs hover:bg-gray-300" @click="toggleModal()">
          Add New
        </button>
      </div>
      <div class="px-4">
        <table class="table-fixed min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>

              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>

              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>

              <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 text-sm text-gray-500">
            <tr v-for="book in books" :key="book.id">
              <td class="py-4 whitespace-nowrap">{{ book.title }}</td>
              <td class="py-4 whitespace-nowrap text-sm text-gray-500">
                <span class="text-xs text-gray-400 leading-none">
                  {{ book.description.substring(0, 100) + '..' }}
                </span>
               
              </td>
              <td class="py-4 whitespace-nowrap text-sm text-gray-500">{{ book.author.name ?? '' }}</td>
              <td class="py-4 whitespace-nowrap text-sm text-gray-500">${{ book.price }}</td>
              <td class="py-4 whitespace-nowrap text-sm text-blue-600">
                <a
                  @click="toggleModal2('modal' + book.id)"
                  class="border text-gray-100 rounded-sm bg-blue-700 px-4 py-2 text-xs hover:bg-gray-300"
                  >Edit</a
                >
              </td>
              <td class="py-4 whitespace-nowrap text-sm text-blue-600">
                <a
                  @click="showDeleteDailog(book.id)"
                  class="border rounded-sm text-gray-100 bg-red-600 pointer px-4 py-2 text-xs hover:bg-gray-300"
                  >Delete</a
                >
              </td>

              <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" :id="'modal' + book.id">
                <div
                  class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                >
                  <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75" />
                  </div>
                  <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                  <div
                    class="
                      inline-block
                      align-center
                      bg-white
                      rounded-lg
                      text-left
                      overflow-hidden
                      shadow-xl
                      transform
                      transition-all
                      sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
                    "
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <form @submit.prevent="update('form' + book.id, book.id)" :id="'form' + book.id">
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <label>Ttile</label>
                        <input
                          type="text"
                          name="title"
                          class="w-full bg-gray-100 p-2 mt-2 mb-3"
                          v-bind:class="{ 'border-red-700': errors.title }"
                          :value="book.title"
                        />
                        <span v-if="errors.title" class="block text-sm text-red-700 -mt-2 mb-4">{{
                          errors.title[0]
                        }}</span>

                        <label>Author</label>

                        <select
                          name="author_id"
                          id=""
                          :value="book.author ? book.author.id : ''"
                          class="
                            bg-gray-50
                            border border-gray-300
                            text-gray-900 text-sm
                            rounded-lg
                            focus:ring-blue-500 focus:border-blue-500
                            block
                            w-full
                            p-2.5
                            dark:bg-gray-700
                            dark:border-gray-600
                            dark:placeholder-gray-400
                            dark:text-white
                            dark:focus:ring-blue-500
                            dark:focus:border-blue-500
                          "
                        >
                          <option value="">**Select**</option>
                          <option :value="author.id" v-for="author in authors">
                            {{ author.name }}
                          </option>
                        </select>

                        <span v-if="errors.author_id" class="block text-sm text-red-700 mt-2 mb-4">{{
                          errors.author_id[0]
                        }}</span>

                        <label>Description</label>

                        <textarea
                          name="description"
                          id=""
                          class="w-full bg-gray-100 p-2 mt-2 mb-3"
                          v-bind:class="{ 'border-red-700': errors.description }"
                          :value="book.description"
                        ></textarea>

                        <span v-if="errors.description" class="block text-sm text-red-700 -mt-2 mb-4">{{
                          errors.description[0]
                        }}</span>

                        <label>Price</label>
                        <input
                          type="text"
                          name="price"
                          class="w-full bg-gray-100 p-2 mt-2 mb-3"
                          v-bind:class="{ 'border-red-700': errors.price }"
                          :value="book.price"
                        />
                        <span v-if="errors.price" class="block text-sm text-red-700 -mt-2 mb-4">{{
                          errors.price[0]
                        }}</span>
                      </div>
                      <div class="bg-gray-200 px-4 py-3 text-right">
                        <button
                          type="button"
                          class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                          @click="toggleModal2('modal' + book.id)"
                        >
                          <i class="fas fa-times"></i> Cancel
                        </button>
                        <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">
                          <i class="fas fa-plus"></i>
                          {{ btnText }}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>

        <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
          <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div
              class="
                inline-block
                align-center
                bg-white
                rounded-lg
                text-left
                overflow-hidden
                shadow-xl
                transform
                transition-all
                sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
              "
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <form @submit.prevent="store" id="storeBook">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <label> Title</label>
                  <input
                    type="text"
                    class="w-full bg-gray-100 p-2 mt-2 mb-3"
                    v-bind:class="{ 'border-red-700': errors.title }"
                    v-model="title"
                  />
                  <span v-if="errors.title" class="block text-sm text-red-700 -mt-2 mb-4">{{ errors.title[0] }}</span>
                  <label>Description</label>

                  <textarea
                    name=""
                    id=""
                    class="w-full bg-gray-100 p-2 mt-2 mb-3"
                    v-bind:class="{ 'border-red-700': errors.description }"
                    v-model="description"
                  ></textarea>

                  <span v-if="errors.description" class="block text-sm text-red-700 -mt-2 mb-4">{{
                    errors.description[0]
                  }}</span>

                  <label> Author</label>
                  <select
                    name="author"
                    id=""
                    v-model="author_id"
                    class="
                      bg-gray-50
                      border border-gray-300
                      text-gray-900 text-sm
                      rounded-lg
                      focus:ring-blue-500 focus:border-blue-500
                      block
                      w-full
                      p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-blue-500
                      dark:focus:border-blue-500
                    "
                  >
                    <option value="">**Select**</option>
                    <option :value="author.id" v-for="author in authors">
                      {{ author.name }}
                    </option>
                  </select>

                  <span v-if="errors.author" class="block text-sm text-red-700 -mt-2 mb-4">{{ errors.author[0] }}</span>

                  <label> Price</label>
                  <input
                    type="number"
                    class="w-full bg-gray-100 p-2 mt-2 mb-3"
                    v-bind:class="{ 'border-red-700': errors.price }"
                    v-model="price"
                  />
                  <span v-if="errors.price" class="block text-sm text-red-700 -mt-2 mb-4">{{ errors.price[0] }}</span>
                  <label>Cover Photo</label>
                  <input
                    type="file"
                    id="cover_photo"
                    class="w-full bg-gray-100 p-2 mt-2 mb-3"
                    v-bind:class="{ 'border-red-700': errors.cover_photo }"
                  />
                  <span v-if="errors.cover_photo" class="block text-sm text-red-700 -mt-2 mb-4">{{
                    errors.cover_photo[0]
                  }}</span>
                </div>
                <div class="bg-gray-200 px-4 py-3 text-right">
                  <button
                    type="button"
                    class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    @click="toggleModal()"
                  >
                    <i class="fas fa-times"></i> Cancel
                  </button>
                  <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">
                    <i class="fas fa-plus"></i>
                    {{ btnText }}
                  </button>
                </div>
              </form>
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
    this.getAuthor()
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
          this.RemoveBook(id)
        }
      })
    },
    store() {
      // POST request using fetch with error handling
      let url = import.meta.env.VITE_API_BASE_URL + 'books'
      // alert(import.meta.env.VITE_API_BASE_URL)

      const formData = new FormData()
      const fileField = document.getElementById('cover_photo')
      //  const fileField = document.querySelector('input[type="file"]')

      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('author_id', this.author_id)
      formData.append('price', this.price)
      formData.append('cover_photo', fileField.files[0])

      this.disableButton = true
      this.btnText = 'Please wait...'
      const requestOptions = {
        method: 'POST',
        headers: {
          //'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Auth.token,
        },
        body: formData,
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
          this.showMessage('success', 'Book Added', 'success')
          setTimeout(function () {
            window.location.href = '/'
          }, 3000)
        })
        .catch((error) => {
          //alert(process.env.VUE_APP_API_BASE_URL);
          this.btnText = 'Submit'
          this.loginFailed = true
          // this.presentAlert(error);
          // alert(error)
          this.showMessage('error', error, 'sorry')
          this.errorMessage = error
          console.log(error)
        })
    },

    update(formId, id) {
      // POST request using fetch with error handling
      let url = import.meta.env.VITE_API_BASE_URL + 'books/' + id
      // alert(import.meta.env.VITE_API_BASE_URL)
      let myForm = document.getElementById(formId)
      let formData = new FormData(myForm)
      formData.append('_method', 'put')

      let formDataObject = Object.fromEntries(formData.entries())
      // Format the plain form data as JSON
      let formDataJsonString = JSON.stringify(formDataObject)
      this.disableButton = true
      this.btnText = 'Please wait...'
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Auth.token,
        },
        body: formDataJsonString,
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
          this.showMessage('success', 'Book updated', 'success')
          setTimeout(function () {
            window.location.href = '/'
          }, 2000)
        })
        .catch((error) => {
          //alert(process.env.VUE_APP_API_BASE_URL);
          this.btnText = 'Submit'
          this.loginFailed = true
          // this.presentAlert(error);
          this.showMessage('error', error, 'sorry')
          this.errorMessage = error
          console.log(error)
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
    RemoveBook(id) {
      // POST request using fetch with error handling
      let url = import.meta.env.VITE_API_BASE_URL + 'books/' + id

      this.disableButton = true
      this.btnText = 'Please wait...'
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + Auth.token,
        },
        body: '',
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
          this.showMessage('success', 'Record Deleted', 'success')
          setTimeout(function () {
            window.location.href = '/'
          }, 2000)
        })
        .catch((error) => {
          this.btnText = 'Submit'
          this.loginFailed = true

          alert(error)
          this.errorMessage = error
          console.log(error)
        })
    },
    getAuthor() {
      // POST request using fetch with error handling
      let url = import.meta.env.VITE_API_BASE_URL + 'authors'
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

          this.authors = data.data
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
    title: '',
    description: '',
    author_id: '',
    price: '',
    books: [],
    authors: [],
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
