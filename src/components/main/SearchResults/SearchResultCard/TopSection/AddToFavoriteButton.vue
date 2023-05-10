<script setup lang="ts">
import IconSupportVue from '@/components/icons/IconSupport.vue';
import ref from 'vue';

const addToFavorite = () => {
    console.log('added to favorites');
}

</script>
<template>
    <div class="add-to-favorites-container">
        <IconSupportVue/>
        <button class="add-to-favorites-button" @click="addToFavorite">Add to Favorites</button>
    </div>
</template>

<style scoped>
.add-to-favorites-container {
    display: flex;
    flex-direction: row;
}
.add-to-favorites-button {
    margin-left:1rem;
}
</style>

