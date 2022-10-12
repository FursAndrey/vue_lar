<script setup>
</script>

<template>
    <div class="header">
        <h1 class="logo"><RouterLink to="/">Vue + Laravel</RouterLink></h1>
        <div id='nav-bar'>
            <RouterLink to="/cApi">CompositionApi</RouterLink>
            <RouterLink to="/posts">Posts</RouterLink>
        </div>
    </div>
    <router-view></router-view>
</template>

<style scoped>
.logo {
    color: #0400ff;
    font-family: sans-serif;
    font-style: italic;
}
.header {
    display: flex;
    justify-content: space-between;
}
div#nav-bar {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
}
.header a {
    text-decoration: none;
}
#nav-bar > a {
    border: 1px solid green;
    padding: 10px;
    border-radius: 10px;
    color: green;
    margin-left: 15px;;
}
</style>