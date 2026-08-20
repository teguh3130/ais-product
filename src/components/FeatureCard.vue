<template>

    <div class="card">

    <div class="icon">
            {{ icon }}
        </div>

        <h3>{{ title }}</h3>

        <p>{{ description }}</p>

    </div>



</template>

<script setup>

defineProps({
    icon: String,
    title: String,
    description: String
})

</script>

<style scoped>

.card{
    background:white;
    width:100%;
    padding:35px;
    border-radius:18px;
    box-shadow:0 10px 30px rgba(0,0,0,.08);
    text-align:center;
    transition:.3s;
}

.card:hover{
transform:translateY(-8px);
}

.icon{
font-size:42px;
margin-bottom:20px;
}

h3{
color:#003366;
margin-bottom:15px;
}

p{
color:#666;
line-height:1.7;
}

</style>