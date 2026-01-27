/**
 * voice.js - Logic for handling user input and dynamically creating MEV Wiki pages.
 * * FIX APPLIED: Removed unnecessary JavaScript submit handler from generated HTML 
 * * to ensure the 'condition' parameter is passed correctly during form submission.
 */

// --- LOCAL STORAGE KEYS ---
const WIKI_PAGES_STORAGE_KEY = 'wiki_pages'; 
const DYNAMIC_MAP_KEY = 'dynamic_map_page_content'; 


// --- LOCAL STORAGE UTILITIES ---

function savePageToLocalStorage(title, content) {
    try {
        let pages = JSON.parse(localStorage.getItem(WIKI_PAGES_STORAGE_KEY) || '{}');
        pages[title] = content; 
        localStorage.setItem(WIKI_PAGES_STORAGE_KEY, JSON.stringify(pages));
        return true;
    } catch (e) {
        console.error("Could not save standard page to localStorage:", e);
        return false;
    }
}

function saveMapContent(content) {
    try {
        localStorage.setItem(DYNAMIC_MAP_KEY, content);
        return true;
    } catch (e) {
        console.error("Could not save map content to localStorage:", e);
        return false;
    }
}


// --- MAP HTML GENERATION (FIX APPLIED HERE) ---

/**
 * Generates the full HTML content for the 3D map scene, customized by condition.
 * @param {string} condition - The user-requested scene condition (e.g., 'foggy', 'night', 'sunny').
 * @returns {string} The full, parameterized HTML content.
 */
function generateMapSceneHtml(condition = 'day') {
    
    // 1. --- MATH & PARAMETER LOGIC based on the condition ---
    let dayCycleSpeed = 0.017; 
    let initialTheta = 0;      
    let sunLightIntensity = 1.0;
    let fogDensity = 0.98;

    const normalizedCondition = condition.toLowerCase();

    if (normalizedCondition.includes('night') || normalizedCondition.includes('dark')) {
        dayCycleSpeed = 0.00;         
        initialTheta = Math.PI * 1.5; 
        sunLightIntensity = 0.05;     
        fogDensity = 0.5;             
    } else if (normalizedCondition.includes('sunny') || normalizedCondition.includes('noon')) {
        dayCycleSpeed = 0.00;         
        initialTheta = Math.PI * 0.5; 
        sunLightIntensity = 2.0;      
        fogDensity = 0.98;
    } else if (normalizedCondition.includes('foggy') || normalizedCondition.includes('mist') || normalizedCondition.includes('rainy')) {
        dayCycleSpeed = 0.005;        
        sunLightIntensity = 0.7;      
        fogDensity = 1.5;             
    }
    // If none match, it defaults to the looping day cycle (dayCycleSpeed = 0.017)


    // 2. --- INPUT FORM HTML (From voice.html) ---
    const searchFormHtml = `
        <div id="inputWrapper" style="position:fixed; top:0; left:0; z-index:1000; width:100%;">
            <form id="mapSearchForm" action="./map-loader.html" method="get" style="margin:0;">
                <input
                    style="position:absolute; top:25px; left:90px; width:150px; font-family:monospace; font-size:10px; color:peru;"
                    id="mapFilterInput"
                    autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="true"
                    type="text" 
                    name="condition"
                    placeholder="foggy, night, sunny..." 
                    value="${condition.trim()}"
                    required
                >
            </form>
        </div>
    `;

    // 3. --- FULL HTML TEMPLATE STRING ---
    return `
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>3D Sun Cycle Map (${condition})</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link type="text/css" rel="stylesheet" href="./files/main.css">
<style>
.infobox {
      position: fixed;
	  top: 250px;
    }
</style>
	</head>
	<body>
		 <div id="info">
		    <center><a href="./map-loader.html?condition=day" target="_blank" rel="noopener"><button class="infobox">Refresh</button></a></center>
		 </div>
         ${searchFormHtml}

		<script type="importmap">
			{
				"imports": {
					"three": "./examples/build/three.webgpu.js",
					"three/webgpu": "./examples/build/three.webgpu.js",
					"three/tsl": "./examples/build/three.tsl.js",
					"three/addons/": "./examples/jsm/"
				}
			}
		</script>

		<script type="module">

			import * as THREE from 'three';
			import { color, fog, float, positionWorld, triNoise3D, positionView, normalWorld, uniform } from 'three/tsl';
			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

			let camera, scene, renderer;
			let controls;
			
			let clock = new THREE.Clock();
            let initialTheta = ${initialTheta}; 

			init();

			function init() {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 600 );
				camera.position.set( 30, 15, 30 );

				scene = new THREE.Scene();

				// custom fog
				const skyColor = color( 0xf0f5f5 );
				const groundColor = color( 0xd0dee7 );

				const fogNoiseDistance = positionView.z.negate().smoothstep( 0, camera.far - 300 );

				const distance = fogNoiseDistance.mul( 20 ).max( 4 );
				const alpha = ${fogDensity}; 
				const groundFogArea = float( distance ).sub( positionWorld.y ).div( distance ).pow( 3 ).saturate().mul( alpha );

				const timer = uniform( 0 ).onFrameUpdate( ( frame ) => frame.time );

				const fogNoiseA = triNoise3D( positionWorld.mul( .005 ), 0.2, timer );
				const fogNoiseB = triNoise3D( positionWorld.mul( .01 ), 0.2, timer.mul( 1.2 ) );

				const fogNoise = fogNoiseA.add( fogNoiseB ).mul( groundColor );

				// apply custom fog
				scene.fogNode = fog( fogNoiseDistance.oneMinus().mix( groundColor, fogNoise ), groundFogArea );
				scene.backgroundNode = normalWorld.y.max( 0 ).mix( groundColor, skyColor );

				// builds
				const buildWindows = positionWorld.y.mul( 10 ).floor().mod( 4 ).sign().mix( color( 0x000066 ).add( fogNoiseDistance ), color( 0xffffff ) );

				const buildGeometry = new THREE.BoxGeometry( 1, 1, 1 );
				const buildMaterial = new THREE.MeshPhongNodeMaterial( {
					colorNode: buildWindows
				} );

				const buildMesh = new THREE.InstancedMesh( buildGeometry, buildMaterial, 4000 );
				scene.add( buildMesh );

				const dummy = new THREE.Object3D();
				const center = new THREE.Vector3();

				for ( let i = 0; i < buildMesh.count; i ++ ) {

					const scaleY = Math.random() * 7 + .5;

					dummy.position.x = Math.random() * 600 - 300;
					dummy.position.z = Math.random() * 600 - 300;

					const distance = Math.max( dummy.position.distanceTo( center ) * .012, 1 );

					dummy.position.y = .5 * scaleY * distance;

					dummy.scale.x = dummy.scale.z = Math.random() * 3 + .5;
					dummy.scale.y = scaleY * distance;

					dummy.updateMatrix();

					buildMesh.setMatrixAt( i, dummy.matrix );
				}

				// lights
				scene.add( new THREE.HemisphereLight( skyColor.value, groundColor.value, 0.5 ) );

				// === DAY/NIGHT CYCLE SETUP ===
				const sunLight = new THREE.DirectionalLight(0xffffff, ${sunLightIntensity}); 
				sunLight.position.set(0, 50, 0); 
				scene.add(sunLight);
				
				const sunGeometry = new THREE.SphereGeometry( 20, 32, 32 ); 
				const sunMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFF00, emissive: 0xFFFF00 } ); 
				const visibleSun = new THREE.Mesh( sunGeometry, sunMaterial );
				scene.add( visibleSun ); 

				const dayCycleSpeed = ${dayCycleSpeed}; 

				window.sunLight = sunLight;
				window.visibleSun = visibleSun;
				window.dayCycleSpeed = dayCycleSpeed; 
				// ===============================

				// geometry
				const planeGeometry = new THREE.PlaneGeometry( 200, 200 );
				const planeMaterial = new THREE.MeshPhongMaterial( {
					color: 0x999999
				} );

				const ground = new THREE.Mesh( planeGeometry, planeMaterial );
				ground.rotation.x = - Math.PI / 2;
				ground.scale.multiplyScalar( 3 );
				ground.castShadow = true;
				ground.receiveShadow = true;
				scene.add( ground );

				// renderer
				renderer = new THREE.WebGPURenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setAnimationLoop( animate );
				document.body.appendChild( renderer.domElement );

				// controls
				controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 2, 0 );
				controls.minDistance = 7;
				controls.maxDistance = 100;
				controls.maxPolarAngle = Math.PI / 2;
				controls.autoRotate = true;
				controls.autoRotateSpeed = .1;
				controls.update();

				window.addEventListener( 'resize', resize );
                
                // --- IN-SCENE COMMAND HANDLER ---
                // REMOVED JavaScript submit listener. We rely on native HTML form submission.
			}

			function resize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function animate() {
                // The initial clock time starts at the requested condition
				const elapsedTime = clock.getElapsedTime(); 
				const time = (elapsedTime * window.dayCycleSpeed) + initialTheta; 
				const theta = time % (Math.PI * 2); 

				const sunX = Math.cos(theta) * 200; 
				const sunY = Math.sin(theta) * 200; 

				window.sunLight.position.set(sunX, sunY, 0); 
				window.visibleSun.position.set(sunX, sunY, 0); 

				const intensityFactor = Math.max(0.1, Math.sin(theta) * 1.0); 

				window.sunLight.intensity = intensityFactor * 1.5; 
				
				const sunriseColor = new THREE.Color(0xFF8800); 
				const noonColor = new THREE.Color(0xFFFFFF); 
				
				window.sunLight.color.lerpColors(sunriseColor, noonColor, intensityFactor);

				controls.update();
				renderer.render( scene, camera );
			}

		</script>
	</body>
</html>
`;
}


// --- COMMAND HANDLER ---

function handleMapSceneCommand(keyword, createButtonCallback) {
    if (keyword.trim() === '') return false; 

    const normalizedKeyword = keyword.trim().toLowerCase();
    
    if (normalizedKeyword.includes('map scene')) {
        const mapButtonTitle = "View 3D Map (Dynamic)";
        
        // Save the map HTML content string once (not strictly necessary, but good practice)
        // Pass a default condition for the initial save
        saveMapContent(generateMapSceneHtml('day')); 
        
        let msg = new SpeechSynthesisUtterance("3D Map Scene initialized. Click the new button to launch.");
        window.speechSynthesis.speak(msg);
        
        if (typeof createButtonCallback === 'function') {
            // The link points to map-loader.html with the initial 'day' condition
            createButtonCallback(mapButtonTitle, './map-loader.html?condition=day'); 
        }
        return true; 
    }
    
    return false; 
}


// --- GLOBAL UTILITY (EXPOSED FOR voice.html) ---

window.createLinkButton = function(keyword, targetUrl = null) {
    const list = document.getElementById('filterInputList');
    if (!list) return;

    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    link.href = targetUrl ? targetUrl : `#${encodeURIComponent(keyword)}`;
    
    if (targetUrl) {
         link.target = "_self";
    }
    
    link.className = 'titleInput'; 
    
    const button = document.createElement('button');
    button.textContent = keyword.trim();
    
    link.appendChild(button);
    listItem.appendChild(link);
    list.appendChild(listItem);
}
