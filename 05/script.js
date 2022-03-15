// 3차원 공간상의 코드 구현 Scene Graph
// 완벽 이해 완 료 ! !

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
        // Solar
        const SolarSystem = new Three.Object3D();
        this._scene.add(SolarSystem);

        const SphereGEO = new Three.TorusKnotGeometry(.6, .1, 100, 20, 4, 9)

        const SoloarMTE = new Three.MeshPhongMaterial({ emissive: 0xffff00, flatShading: true });
        const SolarMES = new Three.Mesh(SphereGEO, SoloarMTE);
        SolarMES.scale.set(3, 3, 3)
        SolarSystem.add(SolarMES)

        // Earth
        const EarthSystem = new Three.Object3D();
        SolarSystem.add(EarthSystem)
        EarthSystem.position.x = 10;

        const EarthMTE = new Three.MeshPhongMaterial({ color: 0x30336b, emissive: 0x686de0, flatShading: false });
        const EarthMES = new Three.Mesh(SphereGEO, EarthMTE);
        EarthSystem.add(EarthMES);

        // Moon
        const MoonSystem = new Three.Object3D();
        EarthSystem.add(MoonSystem);
        MoonSystem.position.x = 3;
        MoonSystem.position.y = 1.2;

        const MoonMET = new Three.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222, flatShading: true })
        const MoonMES = new Three.Mesh(SphereGEO, MoonMET);


        MoonMES.scale.set(.5, .5, .5)
        MoonSystem.add(MoonMES)

        this._SolarSYS = SolarSystem;
        this._EarthSYS = EarthSystem;
        this._MoonSYS = MoonSystem;
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
        camera.position.x = 10;
        camera.position.y = 2;
        camera.position.z = 12;
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

        this._SolarSYS.rotation.y = time / 2;
        this._EarthSYS.rotation.y = time * 3;
        this._MoonSYS.rotation.y = time * 5;
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