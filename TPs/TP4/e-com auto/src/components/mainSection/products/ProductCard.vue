<template>
    <div class="w-3/10 h-3/7 bg-gray-800 rounded-md border-2 border-gray-800 shadow-md shadow-gray-800 text-gray-50 overflow-hidden relative">
        <img :src="info.img" alt="Photo" class="w-full h-2/5 object-cover">
        <div class="w-full flex justify-end items-start text-gray-400 select-none">
            <div class="px-4 mr-1 rounded-b-xl bg-gray-950">
                {{info.categorie}}
            </div>
        </div>

        <div class="w-full text-lg py-1 inset-shadow-sm inset-shadow-gray-700 mt-3 select-none">
            <div class="font-bold ml-4 text-gray-200">
                {{info.nom}}
            </div>
        </div>

        <div class="absolute bottom-2 w-full flex justify-between px-2 items-center">
            <div class="text-green-600 font-bold text-center py-2 w-1/3 border border-dashed border-green-700 rounded-lg select-none">
                {{info.prix}} €
            </div>
            
            <button :class="`mr-3 rounded-full size-9 text-2xl ${info.disponible ? 'cursor-pointer bg-blue-700 hover:bg-blue-600 text-gray-100': 'bg-stone-600 text-gray-400 cursor-not-allowed'} `">
                +
            </button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        info: {
            type: Object,
            default: {
                id: -1,
                nom: "Unnamed",
                prix: 0,
                categorie: "No category",
                img: "./images/img5.jpg",
                disponible: false
            }
        }
    });
</script>
