attribute float aScales;

varying vec2 vUv;

uniform  float uPixelRatio;
uniform float uSize;
uniform vec3 uTest;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScales;
    gl_PointSize *= (1.0 / - (viewPosition.z / 3.0));
}