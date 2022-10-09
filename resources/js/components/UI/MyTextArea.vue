<template>
    <textarea class="textarea" @input="updateTextArea" rows="4">{{ modelValue }}</textarea>
</template>
  
<script>
    export default {
        name: 'my-text-area',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateTextArea(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>
  
<style scoped>
    .textarea {
        width: 90%;
        border: 1px solid rgb(0, 128, 30);
        padding: 10px 15px;
        margin-top: 15px;
        resize: none;
    }
</style>