// 다른 geometry도 살펴보자 2 
// Main * TextGeometry
// ExtrudeGeometry의 파생 클래스로 폰트를 불러오기 위해선 FontLoader를 통해 비동기적으로 불러와야 한다
// 원랜 Three.~로 가져왔는데 바뀌어서 import로 가져와야만 한다
// 비동기 안에서 구동해야 오류가 안 난다고 한다 이유는 잘 모르겠다
// Process - FontLoader와 TextGeometry를 가져오고 객체 생성하고 url 만들고 폰트 로더 객체 생성 하고 비동기로
// FontLoad 함 이 떄 비동기 안에서 나머지 코드를 구동해야 에러가 안 나기 때문에 비동기 인수로 this를 받아서 실행한다
// Promise 객체로 resolve, reject를 받아서 FontLoader.load(url, resolve, undefined, reject) 로 Font Object를 만든다
// 요걸 TextGeometry 에 전달한다 독립적으로 가져왔기 떄문에 Three.~로 안 해도 된다 첫 번쨰 인수는 텍스트 이고 두 번째 인수는
// Configs, font, size, height, curveSegement, bevelEnabled, bevelThickness, bevelSize, bevelSegement

import * as Three from "../three.js-master/build/three.module.js";
import { OrbitControls } from "../three.js-master/examples/jsm/controls/OrbitControls.js"
import { FontLoader } from "../three.js-master/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "../three.js-master/examples/jsm/geometries/TextGeometry.js"

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
        this._setUpControl();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setUpControl() {
        new OrbitControls(this._camera, this._DivScreen);
    }

    _setUpModel() {
        const FontLoade = new FontLoader();
        const LoadFont = async (that) => {
            const url = '../three.js-master/examples/fonts/helvetiker_regular.typeface.json';
            const fonts = await new Promise((resolve, reject) => {
                FontLoade.load(url, resolve, undefined, reject)
            })

            const geometry = new TextGeometry("I'm so hungry", {
                font: fonts,
                size: 10,
                height: 1.5,
                curveSegement: 100,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: .75,
                bevelSegement: 10
            })

            const fillmaterial = new Three.MeshPhongMaterial({ color: 0x30336b })
            const cube = new Three.Mesh(geometry, fillmaterial)

            const lineMateria = new Three.LineBasicMaterial({ color: 0xffffff });
            const line = new Three.LineSegments(
                new Three.WireframeGeometry(geometry), lineMateria
            );

            const group = new Three.Group();
            group.add(cube)
            // group.add(line);

            that._scene.add(group);
            that._cube = group;
        }
        LoadFont(this);
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
        camera.position.x = 50;
        camera.position.y = 2;
        camera.position.z = 50;
        this._camera = camera;
    };

    _setUpLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light1 = new Three.DirectionalLight(color, intensity);
        const light2 = new Three.DirectionalLight(color, intensity);
        light1.position.set(-1, 2, 4);
        light2.position.set(5, 5, 5);
        this._scene.add(light1, light2)
    }

    resize() {
        const width = this._DivScreen.clientWidth;
        const height = this._DivScreen.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    update(time) {
        time *= 0.001;
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time)
        requestAnimationFrame(this.render.bind(this))
    }
}

window.onload = () => {
    new App();
}