<template>  
    <div class="menu remove">
        <div class="back">
            <p class="cursor"><span>&lsaquo;</span> Go back</p>
        </div>
        <hr>
        <div class="menuAsteroid">
            <p data-cible="asteroid" class="cursor">MORE INFOS</p>
        </div>
        <div class="menuGalaxy">
            <p data-cible="galaxy" class="cursor">WHO I AM</p>
        </div>
        <div class="menuCloud">
            <p data-cible="cloud" class="cursor">PROJECTS</p>
        </div>
    </div>
    <div class="contentCanvas">
        <canvas class="webgl"></canvas>
    </div>
</template>