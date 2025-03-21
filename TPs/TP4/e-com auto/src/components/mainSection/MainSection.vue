<template>
    <section class="w-full mt-10 flex justify-between items-start p-7 rounded-2xl shadow-md shadow-gray-900 inset-shadow-sm inset-shadow-gray-700 h-[40rem] gap-8">
        <Filters :pageCount="pageCount" @update-selected-page="handleSelectedPageUpdate" @search="handleSearch" @update-price-range="handlePriceRangeUpdate" @select-category="handleCategorySelection"/>
        <Products @update-page-count="handlePageCountUpdate" :curr-page="selectedPage" :search-query="searchQuery" :min-price="minPrice" :max-price="maxPrice" :category="category"/>
    </section>
</template>

<script setup>
    import Filters from './filters/Filters.vue';
    import Products from './products/Products.vue';

    import { ref } from 'vue';

    const pageCount = ref(1);
    const selectedPage = ref(1);

    const searchQuery = ref('');
    const minPrice = ref('');
    const maxPrice = ref('');
    const category = ref('');

    const handlePageCountUpdate = (newCount) => {
        pageCount.value = newCount;
    }

    const handleSelectedPageUpdate = (selected) => {
        selectedPage.value = selected;
    }

    const handleSearch = (input) => {
        searchQuery.value = input;
    }

    const handlePriceRangeUpdate = (mini, maxi) => {
        minPrice.value = mini;
        maxPrice.value = maxi;
    }

    const handleCategorySelection = (selection) => {
        category.value = selection;
    }
</script>
