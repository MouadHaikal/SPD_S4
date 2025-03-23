import { ref } from 'vue'

export default function getPost(id) {
  const post = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const load = async () => {
    loading.value = true
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      
      post.value = await response.json()
      loading.value = false
    } catch (err) {
      error.value = err.message
      loading.value = false
    }
  }

  return { post, error, loading, load }
}
