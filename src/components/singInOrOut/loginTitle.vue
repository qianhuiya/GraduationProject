<template>
  <div class="loginTitle">{{$config.TITLE}}</div>
</template>

<style scoped>
.loginTitle{
    width:100%;
    position:absolute;
    top:60px;
    font-size:25px;
    display:flex;
    justify-content: center;
}
@media (max-width: 870px) {
  .loginTitle{
    width:100%;
    font-size:1rem;
    width:100vw;
    display:flex;
    justify-content: center;
  }
}
</style>
