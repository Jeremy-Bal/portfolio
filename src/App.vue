
<template>
  <div class="blackScreen"></div>
  <div class="loadingScreen">
    <div class="intro">
      <p>A long time ago in a galaxy far<span class="fontPoppins">,</span> far away…</p>
      <p>
        A French astronaut was lost in space<span class="fontPoppins">.</span> He drifted for days and days in space 
        <span class="orange">the void</span><span class="fontPoppins">,</span> the infinite..
      </p>
      <p>When hope began to disappear<span class="fontPoppins">,</span> a glow blow</p>
      <p>He opened his eyes and discovered the light<span class="orange"> a new chance </span>but also <span class="orange">new challenges.</span></p>
      <p>But which way<span class="orange"> to go first ? </span></p>
    </div>
    <div class="content">
      <p class="fontEquinoxBold">Loading <span style="font-size: 20px;">..</span></p>
      <div class="loadingBar">
        <span class="maskSpan"></span>
        <span class="progress"></span>
      </div>
      <p class="showPercent">0<span>%</span></p>
      <div class="homeButton">
        <a class="btn-slice cursor" href="#">
          <div class="top cursor"><span>Travel the universe</span></div>
          <div class="bottom cursor"><span>Travel the universe</span></div>
        </a>
      </div>
    </div>
  </div>
  <div class="rounded"></div>
  <div class="cursorPoint"></div>
  <div class="home">
    <div class="homeOverlay">
      <div class="head">
        <div class="animationAppear">
          <h1>JEREMY BAL</h1>
          <h2>Créative déveloper</h2>
        </div>
        <div class="animationAppear">
          <p>Feb. <span class="fontEquinox">2222</span></p>
        </div>
      </div>
      <div class="bottom">
        <div class="animationAppear">
          <div class="contentImgFooter">
            <a target="_blank" href="https://www.linkedin.com/in/jérémy-bal-5014081a0/">
              <img alt="linkedin logo" src="./assets/in.png" style="height: 30px; margin-right: 15px;" class="cursor">
            </a>
            <a target="_blank" href="https://github.com/Jeremy-Bal/portfolio">
              <img alt="github logo" src="./assets/git.png" style="height: 30px; margin-right: 15px;" class="cursor">
            </a>
            <!-- <a target="_blank" href="#">
              <img alt="my cv" src="./assets/cv.png" style="height: 30px;" class="cursor">
            </a> -->
          </div>
        </div>
      </div>
    </div>
    <MyScene />
    <section class="cloud">
      <ScrollDown />
      <div class="container customScrollBar">
        <ShowOnScroll where="cloud">
          <div class="article">
            <Parallax where="cloud" :speed="3" :zoom="true">
              <div class="auto">
                <Parallax where="cloud" :speed="10">
                  <h1>Some projects</h1>
                </Parallax>
                <Parallax where="cloud" :speed="5">
                  <h2 class="orange">Night walk in japan</h2>
                </Parallax>
                <div class="tech">
                <Parallax where="cloud" :speed="5">
                  <img src="./assets/threejs.png" alt="threejs logo">
                </Parallax>
                <Parallax where="cloud" :speed="4">
                  <img src="./assets/react.png" alt="react logo">
                </Parallax>
                <Parallax where="cloud" :speed="3">
                  <img src="./assets/vercel.png" alt="vercel logo" style="filter: invert(100%)">
                </Parallax>
                <Parallax where="cloud" :speed="2">
                  <img src="./assets/blender.png" alt="blender">
                </Parallax>
                </div>
                <p>
                  This <span>personal project</span> was realized for fun and self training.<br><br>
                  The goal of this project was to create a street in japan at the night<br>
                  I developed this website using <span>React Three Fiber</span> and <span>Blender</span>.
                  <br /><br />If you <span>would like to see more</span>, you can by clicking on the <span>photo</span> visit the site.
                </p>
                <div class="mt-2">
                  <a href="https://night-walk-in-japan.vercel.app/" class="cursor" target="_blank">
                    <img src="./assets/jpanScreen.jpg" alt="screeen of my japan project" class="cursor">
                  </a>
                </div>
              </div>
            </Parallax>
          </div>
          <div class="article">
            <Parallax where="cloud" :speed="3" :zoom="true">
              <div class="auto">
                <Parallax where="cloud" :speed="5">
                  <h2 class="orange">A Cat</h2>
                </Parallax>
                <div class="tech">
                <Parallax where="cloud" :speed="5">
                  <img src="./assets/blender.png" alt="threejs logo">
                </Parallax>
                </div>
                <p>
                  To my personal satisfaction, I decided to create a white cat.
                </p>
                <div class="mt-2">
                  <img src="./assets/cat1.png" alt="screeen of my 3D cat">
                </div>
              </div>
            </Parallax>
          </div>
          <div class="article">
            <Parallax where="cloud" :speed="3" :zoom="true">
              <div class="auto">
                <Parallax where="cloud" :speed="5">
                  <h2 class="orange">Vast</h2>
                </Parallax>
                <div class="tech">
                <Parallax where="cloud" :speed="5">
                  <img src="./assets/threejs.png" alt="threejs logo">
                </Parallax>
                <Parallax where="cloud" :speed="4">
                  <img src="./assets/vue.png" alt="vuejs logo">
                </Parallax>
                <Parallax where="cloud" :speed="3">
                  <img src="./assets/webpack.png" alt="webpack logo">
                </Parallax>
                <Parallax where="cloud" :speed="2">
                  <img src="./assets/glsl.png" alt="glsl">
                </Parallax>
                </div>
                <p>
                  Project <span>Vast</span> was realized in school setting.<br><br>
                  The goal of the project was to present a complexe virtual reality service.<br>
                  I developed this website using <span>VueJs 3</span> and <span>ThreeJs</span>.
                </p>
                <Parallax where="cloud">
                  <div class="mt-4">
                    <video autoplay loop muted width="500">
                      <source src="./assets/vid.mp4"
                              type="video/mp4">
                      Sorry<span class="fontPoppins">,</span> your browser doesn't support embedded videos.
                    </video>
                  </div>
                </Parallax>
                <div class="mt-2">
                  <img src="./assets/vast.jpg" alt="screeen of my project vast">
                </div>
              </div>
            </Parallax>
          </div>
          <div class="article">
            <Parallax where="cloud" :speed="3" :zoom="true">
              <div class="auto">
                <Parallax where="cloud" :speed="5">
                  <h2 class="orange">Portal</h2>
                </Parallax>
                <div class="tech">
                  <Parallax where="cloud" :speed="3">
                    <img src="./assets/threejs.png" alt="threejs logo">
                  </Parallax>
                  <Parallax where="cloud" :speed="4">
                    <img src="./assets/webpack.png" alt="webpack logo">
                  </Parallax>
                  <Parallax where="cloud" :speed="5">
                    <img src="./assets/glsl.png" alt="glsl">
                  </Parallax>
                </div>
                <p class="p18">
                  This project was realized this time a the end of <span>Mr Bruno Simon's course</span>.<br>
                  The scene was directly created from<span> Blender</span><span class="fontPoppins">,</span> the textures was baked and the patern of the portal is a noise used in <span>shaders</span>. <br> <br>
                  For fun i decided to <span>improve</span> it and add some particles.
                </p>
                <img src="./assets/portal.jpg" alt="screen of course content" class="mt-4">
              </div>
            </Parallax>
          </div>
        </ShowOnScroll>
      </div>
    </section>
    <section class="asteroid">
      <ScrollDown />
      <div class="container customScrollBar">
        <ShowOnScroll where="asteroid">
          <div class="article">
            <Parallax where="asteroid" :speed="3" :zoom="true">
              <div class="auto">
                <Parallax where="asteroid" :speed="10">
                  <h1>Statut</h1>
                </Parallax>
                <Parallax where="asteroid" :speed="5">
                  <h2 class="orange">Looking for the right one</h2>
                </Parallax>
                <p class="p18">
                  My internship contract is coming to the end<span class="fontPoppins">,</span> this why I <span>looking for creative development creative agency</span> that would match my values<span class="fontPoppins">,</span> also allow me to improve and deepen my skills.<br><br>
                  I would like to bring my ideas<span class="fontPoppins">,</span> my knowledge and my <span>original</span> mindset.
                </p>
              </div>
            </Parallax>
          </div>
          <div class="article">
            <Parallax where="asteroid" :speed="3" :zoom="true">
              <div class="auto">
                <Parallax where="asteroid" :speed="5">
                  <h2 class="orange">But after ?</h2>
                </Parallax>
                <p class="p18">
                  Afterwards<span class="fontPoppins">,</span> I would like to deepen my skills on a 3D modeling software<span class="fontPoppins">,</span> more specificially on <span> Blender</span>.
                  I plan to learn with the help of Zach Reinhardt<span class="fontPoppins">,</span> an artist in his on right. Is course is available on <a target="_blank" class="cursor blue" href="https://www.cgboost.com/courses/cubic-worlds#FAQ">this link</a>. <br><br>
                  Finally<span class="fontPoppins">,</span> I would like to improve my skills and learn the secrets of <span>Shaders</span><span class="fontPoppins">,</span> witch is for me the ultimate in <span>creative development </span>and the hardest to master.
                </p>
                <img src="./assets/blenderBackground.jpeg" alt="screen of course content" class="mt-4">
              </div>
            </Parallax>
          </div>
        </ShowOnScroll>
      </div>
    </section>
    <section class="galaxy">
      <ScrollDown />
      <div class="container customScrollBar">
        <ShowOnScroll where="galaxy">
            <div class="article article-1">
              <Parallax where="galaxy" :speed="3" :zoom="true">
                <div class="auto">
                  <Parallax where="galaxy" :speed="10">
                    <h1>Who I am</h1>
                  </Parallax>
                  <Parallax where="galaxy" :speed="5">
                    <h2 class="orange">Hello world !</h2>
                  </Parallax>
                  <Parallax where="galaxy">
                    <div class="mb-3 mt-4">
                      <img src="./assets/moto.jpg" alt="me with my bike">
                    </div>
                  </Parallax>
                  <p class="">
                    My name is <span>Jérémy</span><span class="fontPoppins">,</span> I'm 25 years old and I am 1m80 tall. <br>
                    I am passionate about <span>creation</span> and <span>imagination</span><span class="fontPoppins">,</span> especially space and deep sea.<br><br>
                    I like to take users to <span> new experiences</span><span class="fontPoppins">,</span> to make them learn new ways to  <span>navigate and explore</span><br><br> 
                    To sum it up in 15 words<br>
                    I oppend and reserved<span class="fontPoppins">,</span> kind and I can be direct<span class="fontPoppins">,</span> but also courageous and apprehensive.<br>
                  </p>
                </div>
              </Parallax>
            </div>
            <div class="article">
              <Parallax where="galaxy" :speed="3" :zoom="true">
                <div class="auto">
                  <Parallax where="galaxy" :speed="5">
                    <h2 class="orange">My little story</h2>
                  </Parallax>
                  <p class="p18">
                    I started in the <span>army </span>at the age of 18 years for 5 years as a sniper<br>
                    I wanted to discover new sensations<span class="fontPoppins">,</span> <span>explore</span> the world and challenge myself. <br> <br>
                    It was great to be part of army beacause I <span>achieve</span> a significant experience but I decided to started again and joined one of my favorite fields<span class="fontPoppins">,</span> the one of <span>creation</span> of <span>websites</span>. <br>
                  </p>
                  <div class="mb-3 mt-4">
                    <img src="./assets/armee.jpg" alt="frf2 french rifle armee">
                  </div>
                </div>
              </Parallax>
            </div>
            <div class="article">
              <Parallax where="galaxy" :speed="3" :zoom="true">
                <div class="auto">
                  <Parallax where="galaxy" :speed="5">
                    <h2 class="orange">My experiences</h2>
                  </Parallax>
                  <p class="p18">
                    I joined in second year <span>ICAN</span><span class="fontPoppins">,</span> a great school specialised to design and web development.<br> <br>
                    During this 3 years of training I improved my <span>development</span> skills by my own and I learn to specialize myself in <span>3D</span> in particular with help <span>Bruno Simon's</span> course on the library. <a target="_blank" class="cursor blue" href="https://threejs-journey.com/">Threejs</a> <br> <br>
                    I also had a chance to join a small <span>web develpoment agency </span> as an intern for two years. I <span>helped and developed</span> on many projects<span class="fontPoppins">,</span> mainly in <span>Vuejs</span> and <span>Laravel</span>.
                  </p>
                  <div class="mb-3 mt-4 textCenter">
                    <img src="./assets/ican.png" alt="logo ICAN, french school for dev and design">
                  </div>
                </div>
              </Parallax>
            </div>
            <div class="article">
              <Parallax where="galaxy" :speed="3" :zoom="true">
                <div class="auto">
                  <h2 class="orange">I masterie</h2>
                  <div class="skill mt-4">
                    <img src="./assets/blender.png" alt="blender">
                    <img src="./assets/figma.svg" alt="figma">
                    <img src="./assets/xd.png" alt="xd">
                    <img src="./assets/sketch.png" alt="sketch">
                    <img src="./assets/laravel.png" alt="laravel">
                    <img src="./assets/webpack.png" alt="webpack">
                    <img src="./assets/vue.png" alt="vue">
                    <img src="./assets/react.png" alt="react">
                    <img src="./assets/threejs.png" alt="threejs">
                    <img src="./assets/glsl.png" alt="glsl">
                    <img src="./assets/jquery.png" alt="jquery">
                    <img src="./assets/sass.png" alt="sass">
                    <img src="./assets/git2.png" alt="git">
                    <img src="./assets/rl.png" alt="rocket league">
                  </div>
                </div>
              </Parallax>
            </div>
        </ShowOnScroll>
      </div>
    </section>
  </div>
  <div class="absolute">
    <div class="animationAppear oxy">
      <h3 style="position: relative; z-index: 1000;">Oxygene</h3>
      <div class="flex">
        <div class="maskOxy">
          <div>
            <span class="fontEquinoxBold" style="display: flex;">100<span class="fontHelvetica" style="padding-left: 4px;">%</span></span>
          </div>
        </div>
        <div class="refill cursor fontEquinoxBold">
          Refill
        </div>
      </div>
    </div>
  </div>
</template>

<script>
window.addEventListener('load', ()=>{
  window.scroll(0, 0)
})
window.addEventListener('DOMContentLoaded', ()=>{
  window.scroll(0, 0)
})
window.scroll(0, 0)
// @ is an alias to /src
import MyScene from '@/components/MyScene.vue'
import Experience from './three/Experience'
import Parallax from '@/components/ParallaxComponent.vue'
import ShowOnScroll from '@/components/ShowOnScroll.vue'
import ScrollDown from '@/components/ScrollDown.vue'

export default {
  components: {
    ShowOnScroll,
    MyScene,
    Parallax,
    ScrollDown,
  },
  mounted(){
    window.addEventListener('DOMContentLoaded', function(){
      document.documentElement.scrollTop = 0;
      new Experience(window.document.querySelector('canvas.webgl')) 
    })
  }
}
</script>
