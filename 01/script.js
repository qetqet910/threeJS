// Step 1 three.module.js import for module dev, App class created, onload binding
/* must require 
    Screen, renderer, scene, Camera, Light, Model, ResResize
*/
// - DivScreen 을 가져와서 필드에 박는다 (this._DivScreen = DivScreen)
// _는 JS에서 암묵적으로 그 class 안에서만 쓸 수 있는 변수이다
// Three 에서 WebGLRenderer로 rebderer를 가져오고 안티엘리어스 설정을 켜준다
// 가져온 render를 setPixelRatio 로 설정해준다 이 때 값은 window.devicePixelRatio 로 한다
// window.devicePixelRatio - 대충 축소 확대 하면 값이 나온다 기본 값은 PC마다 다르당
// renderer를 _DivScreen에 appendchild로 추가해준다 마찬가지로 field에 박아준다
// 다음은 scene Three에서 Scene를 꺼내준다 filed에 박아주면 끝이다
// 담은 setUpCamera, Light, Model을 만들어 준다 ConStructor 밖에 정의해준다
// _setUpCamera 가로 세로를 먼저 구하고 Three.PerspectiveCamera 값을 정의해준다 그 값은 잘 모르겟다
// position.z 값을 설정해주고 field에 박아준다
// _setUpLight 빛의 색깔, 세기를 설정하고 Three.DirectionalLight(color, intensity); 에 박아준다
// light.position(-1, 2, 4); 도 설정해준다 아무래도 x, y, z인 것 같다 마찬가지로 field에 박아준다
// _setUpModel geometry Three.BoxGeometry(1, 1, 1) 로 설정한다 x, y, z 이다
// material Three.MeshPhongMaterial({}) 로 컬러를 설정한다 Mesh(geometry, material); 로 큐브를 만든다
// scene에 박아주고 field 에도 박아준다 resize를 정의해보자
// Screen의 width값과 height값을 구해준다 aspect = width / height, updateProjectionMatrix() 로 this._camera 를 설정해준다
// this._renderer.setSize(width, height); 로 renderer 사이즈도 resize 해준다
// render는 time을 인수로 받고 renderer의 render를 세팅한다 this._renderer.render(this._scene, this._camera);
// time 인수를 this.update(time) 으로 넘겨준다 그 다음엔 requestAnimationFrame(this.render.bind(this)) 생성자 박아버리기
// update 는 드디어 마지막이다 일단 render에서 받은 time값을 * 0.001 해서 세컨드로 바꿔줌 그리고 그 second에 따라서 cube를 돌려줌
// this._cube.rotation.x = time; this._cube.rotation.y = time; 이렇게 돌려주면 완성

import * as Three from "../three.js-master/build/three.module.js"

class App {
    constructor() {
        const DivScreen = document.querySelector(".screen");
        this._DivScreen = DivScreen;

        const renderer = new Three.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio);
        DivScreen.appendChild(renderer.domElement)
        this._renderer = renderer;

        const scene = new Three.Scene();
        this._scene = scene;

        this._setUpCamera();
        this._setUpLight();
        this._setUpModel();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setUpCamera() {
        const width = this._DivScreen.clientWidth;
        const height = this._DivScreen.clientHeight;
        const camera = new Three.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        )
        camera.position.z = 2;
        this._camera = camera;
    };

    _setUpLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new Three.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light)
    }

    _setUpModel() {
        const geometry = new Three.BoxGeometry(1, 1, 1);
        const material = new Three.MeshPhongMaterial({ color: 0x44a88 });

        const cube = new Three.Mesh(geometry, material);

        this._scene.add(cube);
        this._cube = cube;
    }

    resize() {
        const width = this._DivScreen.clientWidth;
        const height = this._DivScreen.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this))
    }

    update(time) {
        time *= 0.001;
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
    }
}

window.onload = () => {
    new App();
}
