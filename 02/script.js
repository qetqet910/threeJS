// 이제 큐브에 선을 넣어보자.
// LineBasicMaterial 로 라인의 색깔을 정해준다
// LineSegments 로 Line을 만든다 인수를 참 야물딱지게 받는다
// WireframeGeometry(geometry), lineMateria 요렇게 받는다
// 항상 저런 친구들 앞에는 new Three를 생략하고 있다는 걸 까먹지 말자 현민아
// Group() 이걸 사용해서 그룹을 만들어서 그 안에 큐브랑 선까지 넣으면 완성이다
// 마우스 이벤트를 할 거다 그걸 위해서 일단 OrbitControls 라는 라이브러리?
// 를 가져온다 가져온 후에 사용해야 한다 this._setUpControl();로 써주고
// _setUpControl()를 만든다 OrbitControls는 독립적으로 참조되기 떄문에
// new OrbitControls(camera, screen) 으로 만들어준다

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
        const geometry = new Three.DodecahedronGeometry(.8, 5)
        const material = new Three.MeshPhongMaterial({ color: 0x515151 });
        const cube = new Three.Mesh(geometry, material);

        const lineMateria = new Three.LineBasicMaterial({ color: 0xffff00 });
        const line = new Three.LineSegments(
            new Three.WireframeGeometry(geometry), lineMateria
        );

        const group = new Three.Group();
        group.add(cube)
        group.add(line);

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
        const light = new Three.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light)
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
