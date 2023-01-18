uniform float uTime;
uniform vec3 uTest;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;

varying vec2 vUv;
varying vec3 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    modelPosition.xyz += aRandomness * 1.0;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_Position = projectedPosition;
    // gl_PointSize = (uTest.x * aScale) * uTest.y;
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);
    vColor = color;
    vUv = uv;
}