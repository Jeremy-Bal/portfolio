uniform float uSize;
uniform float uTime;
uniform vec3 uTest;

attribute float aScales;
attribute vec3 aRandomness;

varying vec3 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float angle = atan(modelPosition.x, modelPosition.z);
    //angle = max(angle, uTest.y);

    //branche distance
    float distanceToCenter = length(modelPosition.xz) * 0.8;
    
    //speed
    //float angleOffset = (1.0 / distanceToCenter) * uTime * 1.0;
    //test
    float angleOffset = (1.0 / distanceToCenter) * 20.0;

    angle += angleOffset;
    //angle = mod(angle, uTest.x);

    //l'angle
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    modelPosition.xyz += aRandomness * 1.0;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScales;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}