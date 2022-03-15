// material
// MeshLambertMaterial - 광원의 영향을 계산하는 재질 option - side 랜더하는 부분 결정 Front, Back, Double;
// MeshPhongMaterial - 위랑 광원영향계산, emissive는 같음 BUT 반사면 컬러, 세기, 고른 랜더링 여부 결정 가능
// specular: "#535c68", shininess: 100, flatShading: true 로 가능 flatShading default false 평면 음영 랜더링 여부
// 물리 기반 랜더링(PBR) Physically Based Rendering Material - MeshStandardMaterial, MeshPhysicalMaterial 이 있다
// option - roughness, metalness 어디서 많이 보던 친구들이쥬? Unreal, Unity 할 떄 많이 봤잖아유
// MeshPhysicalMaterial는 standard보다 발전된 친구라네용 clearcoat, clearcoatRoughness 요 친구들로 코팅을 할 수 있어요
// 그럼 빤딲빤딲햬져요

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
        const group = new Three.Group();

        const material = new Three.MeshPhysicalMaterial({
            // visible: true,
            // transparent: true,
            // opacity: .5,
            // depthTest: true,
            // depthWrite: true,
            // side: Three.DoubleSide,
            // specular: "#535c68",
            // shininess: 100,
            // flatShading: true,

            color: "#4834d4",
            emissive: "#130f40",
            roughness: 1,
            metalness: 0,
            clearcoat: 1,
            clearcoatRoughness: .5,
            wireframe: false,
        })

        const box = new Three.Mesh(new Three.BoxGeometry(1, 1, 1), material);
        const sph = new Three.Mesh(new Three.SphereGeometry(0.7, 32, 32), material);

        box.position.set(-1, 0, 0);
        sph.position.set(1, 0, 0);

        group.add(box);
        group.add(sph);

        this._scene.add(group)
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
        camera.position.z = 3;
        this._camera = camera;
    };

    _setUpLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light1 = new Three.DirectionalLight(color, intensity);
        light1.position.set(4, 4, 4);
        this._scene.add(light1)
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