import { ref } from 'vue'

export default function getPosts(tag = null) {
  const posts = ref([])
  const error = ref(null)
  const loading = ref(false)

  const load = async () => {
    loading.value = true
    try {
      let url = 'http://localhost:3000/posts?_sort=id&_order=desc'
      
      // If a tag is provided, fetch only posts with that tag
      if (tag) {
        url = `http://localhost:3000/posts?tags_like=${tag}&_sort=id&_order=desc`
      }
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      
      posts.value = await response.json()
      loading.value = false
    } catch (err) {
      error.value = err.message
      loading.value = false
    }
  }

  return { posts, error, loading, load }
}
