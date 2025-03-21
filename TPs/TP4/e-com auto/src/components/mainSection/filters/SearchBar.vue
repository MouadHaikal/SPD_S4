<template>
    <div class="relative w-full h-10">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="size-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>

        <input type="search"
               :placeholder="props.placeHolder"
               class="block w-full ps-10 p-2.5" 
               v-model="searchQuery"
        >
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        placeHolder: {
            type: String,
            default: "Recherche"
        }
    });

    const emit = defineEmits([ 'search' ]);

    const searchQuery = ref('');

    watch(
        searchQuery,
        () => {
            emit('search', searchQuery.value)
        }
    )
</script>
