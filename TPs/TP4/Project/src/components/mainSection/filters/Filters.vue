<template>
    <section class="flex-1/4 h-full relative">
        <SearchBar place-holder="Recherche" @search="handleSearch"/>
        <br>
        <PriceRange @update="handlePriceRangeUpdate"/>
        <br>
        <CategorySelect @update="handleCategorySelection"/>
        
        <PageSelector :pageCount="pageCount" @update-selected-page="handleSelectedPageUpdate"/>
    </section>
</template>

<script setup>

    import SearchBar from './SearchBar.vue';
    import PriceRange from './PriceRange.vue';
    import CategorySelect from './CategorySelect.vue';
    import PageSelector from './PageSelector.vue';

    const emit = defineEmits([ 'updateSelectedPage', 'search', 'updatePriceRange', 'selectCategory' ]);

    const props = defineProps({
        pageCount: {
            type: Number,
            default: 1
        }
    });

    const handleSelectedPageUpdate = (selected) =>{
        emit('updateSelectedPage', selected)
    }

    const handleSearch = (searchQuery) => {
        emit('search', searchQuery)
    }

    const handlePriceRangeUpdate = (minPrice, maxPrice) =>{
        emit('updatePriceRange', minPrice, maxPrice);
    }

    const handleCategorySelection = (category) => {
        emit('selectCategory', category)
    }
</script>
