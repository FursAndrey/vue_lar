<template>
    <select v-model="modelValue" @change="changeOption">
        <option disabled value="">Выберите из списка</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >
            {{ option.name }}
        </option>
    </select>
</template>
        
<script>
    export default {
        name: 'my-select',
        props: {
            modelValue: {
                type: String
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            changeOption(event) {
                this.$emit('update:modelValue', event.target.value);
            }
        }
    }
</script>
        
<style scoped>
    select{
        margin-left: 15px;
        padding: 10px 15px;
        background: none;
        color: rgb(66, 133, 51);
        border: 1px solid rgb(66, 133, 51);
        cursor: pointer;
        border-radius: 10px;
    }
</style>