<template>
    <select class="w-full h-10" v-model="category">
        <option value="" selected>Toutes les catégories</option>
        <option value="Électricité">Électricité</option>
        <option value="Filtration">Filtration</option>
        <option value="Moteur">Moteur</option>
        <option value="Freinage">Freinage</option>
        <option value="Refroidissement">Refroidissement</option>
        <option value="Suspension">Suspension</option>
        <option value="Sécurité">Sécurité</option>
        <option value="Échappement">Échappement</option>
        <option value="Direction">Direction</option>
    </select>
</template>

<script setup>

    import { ref, watch } from 'vue';

    const emit = defineEmits([ 'update' ]);

    const category = ref("")

    watch(
        category,
        () => {
            emit('update', category.value)
        }
    )
    
</script>
