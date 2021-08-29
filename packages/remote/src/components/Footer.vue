<template>
    <h1>Footer {{text}}</h1>
</template>

<script>
    export default {
        name: "Footer",
        props: {
            text: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>