// 다른 geometry도 살펴보자
// new Three.CircleGeometry 4개의 인자를 받고 첫 번쨰는 반지름 default : 1 이다
// 두 번째 인자는 Segment 원판 구성을 분할하는 개수 default : 8
// 세 번째, 네 번째는 각각 시작 각도, 연장 각도 입니다 default 0, 2pi
// 2pi = 360deg | 0, pi/2 로 설정 ConGeometry 말 그대로 콘 모양
// 인자를 7개나 받음 각각 밑 면 원의 반지름 default : 1, 두 번째 원 뿔의 높이 default : 1;
// 세 번째 원뿔의 둘레 방향 Segment Default : 8, 네 번째는 원뿔의 높이 방향 분할 개수 default : 1;
// 다섯 번째 원뿔의 밑 면을 열어 놓을 건지에 대한 TF 이다 Default: false;
// 여섯 번쨰와 일곱 번쨰의 인자는 시작각, 연장각, default : 0, 2pi
// CylinderGeometry는 8개의 인자를 받음 근데 이런 건 솔직히 필요 없을 것 같다. 그래서 한 개만 하고 넘기도록 하겠따
// TorusKnotGeometry 뭔가 이쁜데 활요도는 떨어지는 Geo이다 인자는 1 - 반지름, 2 - 원통의 반지름, 3, 4 - 분할 수 이당 5, 6은 이걸 구성하는데 필요한 반복수


import * as Three from "../three.js-master/build/three.module.js";
import { OrbitControls } from "../three.js-master/examples/jsm/controls/OrbitControls.js"

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
        const geometry = new Three.TorusKnotGeometry(.6, .1, 64, 32, 20, 1);
        const material = new Three.MeshPhongMaterial({ color: 0xf0932b });
        const cube = new Three.Mesh(geometry, material);

        const lineMateria = new Three.LineBasicMaterial({ color: 0xffffff });
        const line = new Three.LineSegments(
            new Three.WireframeGeometry(geometry), lineMateria
        );

        const group = new Three.Group();
        group.add(cube)
        // group.add(line);

        this._scene.add(group);
        this._cube = group;
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
