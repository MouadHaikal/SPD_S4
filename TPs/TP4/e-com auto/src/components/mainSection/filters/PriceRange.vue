<template>
    <div class="w-full h-10 flex justify-between items-center">
        <input class="w-2/7 text-center" placeholder="min" type="text" v-model="minPrice">
        <div class="grow h-full flex justify-evenly items-center">
            <div class="less-than">≤</div>

            <div class="text-center text-gray-400 font-bold select-none">
                Prix
            </div>

            <div class="less-than">≤</div>
        </div>

        <input class="w-2/7 text-center" placeholder="max" type="text" v-model="maxPrice">
    </div>
</template>

<script setup>

    import { ref, watch } from 'vue';

    const emit = defineEmits([ 'update' ]);

    const minPrice = ref("")
    const maxPrice = ref("")

    watch(
        [minPrice, maxPrice],
        () => {
            emit("update", minPrice.value, maxPrice.value)
        }
    )
    
</script>
