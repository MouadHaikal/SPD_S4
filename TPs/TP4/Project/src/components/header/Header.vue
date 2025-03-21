<template>
    <div class="w-full h-24 mt-10 flex justify-center items-center bg-gray-700 rounded-2xl inset-shadow-sm inset-shadow-gray-600 drop-shadow-md select-none">
        <h1 class="text-4xl font-bold text-gray-200">{{ props.title }}</h1>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: "Untitled"
        }
    });
</script>
