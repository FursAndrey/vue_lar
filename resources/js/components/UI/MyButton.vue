<template>
    <button class="btn">
      <slot></slot>
    </button>
</template>

<script>
    export default {
       name: 'my-button'
    }
</script>

<style scoped>
    .btn {
        padding: 10px 15px;
        background: none;
        color: rgb(66, 133, 51);
        border: 1px solid rgb(66, 133, 51);
        cursor: pointer;
        border-radius: 10px;
    }
</style>