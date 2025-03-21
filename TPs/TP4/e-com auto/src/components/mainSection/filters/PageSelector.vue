<template>
    <section class="absolute bottom-0 w-full flex flex-wrap justify-start gap-1.5 content-between">
        <div v-for="page in pageCount" :class="`${(page == selectedPage)? 'opacity-100': 'opacity-40 hover:opacity-75' } text-center w-16 py-3 bg-cyan-950 inset-shadow-sm inset-shadow-cyan-800 text-2xl text-gray-200 font-bold rounded-lg cursor-pointer hover:bg-cyan-900`" @click="selectedPage=page">
            {{page}}
        </div>
    </section>
</template>

<script setup>
    import { defineProps, ref, watch } from 'vue';

    const props = defineProps({
        pageCount: {
            type: Number,
            default: 1
        }
    });

    const selectedPage = ref(1);

    const emit = defineEmits([ 'updateSelectedPage' ]);

    watch(
        selectedPage,
        () => {
            emit("updateSelectedPage", selectedPage.value);
        }
    )


</script>
