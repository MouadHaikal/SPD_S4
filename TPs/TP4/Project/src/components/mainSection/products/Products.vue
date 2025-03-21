<template>
    <section class="flex-3/4 h-full flex flex-wrap place-content-evenly bg-gray-700  inset-shadow-sm inset-shadow-gray-900 rounded-xl">
        <ProductCard v-for="product in paginatedProducts" :key="product.id" :info="product"/>
    </section>
</template>

<script setup>
    import ProductCard from './ProductCard.vue'

    import { computed, onMounted, ref, watch } from 'vue';

    const emit = defineEmits(['updatePageCount'])

    const products = ref([]);

    onMounted(async () => {
        try {
            const response = await fetch('http://localhost:3000/products')
            const data = await response.json()
            products.value = data;
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    })

    const props = defineProps({
        currPage: {
            type: Number,
            default: 1
        },
        searchQuery: {
            type: String,
            default: ''
        },
        minPrice: {
            type: String,
            default: ''
        },
        maxPrice: {
            type: String,
            default: ''
        },
        category: {
            type: String,
            default: ''
        }
    });

    const pageCount = ref(1);


    const filteredProducts = computed(() => {
        if (!products.value) return[]

        let filtered = products.value

        // Search
        const query = props.searchQuery.toLowerCase().trimStart();
        if (query) {
            filtered = filtered.filter(product => { return product.nom.toLowerCase().includes(query); })
        }

        // Price Range
        if (props.minPrice.trimStart() != ""){
            let num = Number.parseInt(props.minPrice);
            filtered = filtered.filter(product => { return product.prix >= num; })
        }

        if (props.maxPrice.trimStart() != ''){
            let num = Number.parseInt(props.maxPrice);
            filtered = filtered.filter(product => { return product.prix <= num; })
        }

        // Category
        let cat = props.category.toLowerCase();
        if (cat){
            filtered = filtered.filter(product => { return product.categorie.toLowerCase() == cat; })
        }

        return filtered
    });

    watch(
        filteredProducts,
        () => {
            pageCount.value = Math.ceil(filteredProducts.value.length / 6) || 1;
            emit("updatePageCount", pageCount.value);
        },
    )

    const paginatedProducts = computed(() => {
        const start = (props.currPage - 1) * 6
        const end = start + 6;

        return filteredProducts.value.slice(start, end);
    })
</script>
