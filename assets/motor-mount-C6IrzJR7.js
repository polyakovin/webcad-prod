const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/build-Cfz6m77Q.js","assets/STLExporter-BExu1CFc.js","assets/three.module-DHLk-87x.js","assets/BufferGeometryUtils-BLhkFWFe.js","assets/preload-helper-BXl3LOEh.js","assets/mesh-Cq_MWlSY.js","assets/kernel-DYl0GoBz.js"])))=>i.map(i=>d[i]);
import{S as Se}from"./STLExporter-BExu1CFc.js";import{t as be}from"./BufferGeometryUtils-BLhkFWFe.js";import{_ as re}from"./preload-helper-BXl3LOEh.js";import{g as Ee}from"./mesh-Cq_MWlSY.js";import{G as _e,M as ee,b as Ae,x as k,f as Me,e as Ue,i as ze,aj as Te,l as ie,ak as J,al as O,am as Le,B as te,an as ge,V as U,ao as Be,ap as q,aq as ye,h as ne,ar as G,a8 as W,a1 as Pe,c as De}from"./three.module-DHLk-87x.js";const V=new WeakMap;function Ce(n){return V.get(n)}async function Ze(n){const e=V.get(n);if(e)return e;const[{buildPart:t},{loadKernel:r}]=await Promise.all([re(()=>import("./build-Cfz6m77Q.js"),__vite__mapDeps([0,1,2,3,4,5])),re(()=>import("./kernel-DYl0GoBz.js"),__vite__mapDeps([6,4]))]),i=await r(),a=V.get(n)??t(i,n);return V.set(n,a),a}function Oe(n,e=!1){const t=Ee(n.mesh),r=be(t,Math.PI/5);return t.dispose(),e&&r.translate(-n.center[0],-n.center[1],-n.center[2]),r}function Ie(n){if(n.features){const i=Ce(n.features);if(!i)throw new Error("Wait for the modeled body to finish rebuilding.");return Oe(i,!0)}const[e,t,r]=n.size;return n.kind==="cylinder"?new Me(e/2,e/2,t,64):n.kind==="sphere"?new Ue(e/2,64,32):new ze(e,t,r)}function je(n){const e=Ie(n),t=new Ae({color:n.color,metalness:.22,roughness:.42}),r=new ee(e,t);return r.position.fromArray(n.position),r.rotation.y=k.degToRad(n.rotation),r.visible=n.visible,r.name=n.name,r.userData.bodyId=n.id,r.updateMatrixWorld(!0),r}function Ye(n){const e=n.bodies.filter(r=>r.visible);if(e.length===0)throw new Error("No visible bodies to export. Show or create a body.");const t=new _e;try{for(const r of e)t.add(je(r));return t.updateMatrixWorld(!0),new Se().parse(t,{binary:!1})}finally{for(const r of t.children)r instanceof ee&&(r.geometry.dispose(),r.material.dispose())}}const K=["XZ","XY","YZ"],we={XZ:[0,2,1],XY:[0,1,2],YZ:[1,2,0]},ve=[[-1,-1],[1,-1],[1,1],[-1,1]],I=.01,y=1e4,Q=24,oe=12;function j(n){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid feature data.");return n}function w(n,e,t){if(typeof n!="number"||!Number.isFinite(n)||n<e||n>t)throw new Error(`Enter a feature value from ${e} to ${t} mm.`);return n}function X(n,e){if(typeof n!="number"||!Number.isInteger(n)||n<0||n>=e)throw new Error("A feature or constraint must refer to an earlier item.");return n}function H(n){if(n!==void 0&&typeof n!="boolean")throw new Error("Invalid sketch constraint.");return n===!0||void 0}function se(n){const e=j(n),t=K.find(a=>a===e.plane);if(!t||e.sign!==1&&e.sign!==-1||!Array.isArray(e.anchor)||e.anchor.length!==3)throw new Error("Choose a planar face.");const r=y*(Q+1),i=[w(e.anchor[0],-r,r),w(e.anchor[1],-r,r),w(e.anchor[2],-r,r)];return{plane:t,sign:e.sign,anchor:i}}function We(n,e){const t=j(n);if(!Array.isArray(t.center)||t.center.length!==2)throw new Error("Invalid sketch center.");const r={center:[w(t.center[0],-y,y),w(t.center[1],-y,y)],centerU:H(t.centerU),centerV:H(t.centerV),mirrorTo:t.mirrorTo===void 0?void 0:X(t.mirrorTo,e.length)};if(r.mirrorTo!==void 0&&(r.centerU||r.centerV))throw new Error("A mirrored center already has a position constraint.");if(t.shape==="rectangle")return{...r,shape:t.shape,width:w(t.width,I,y),height:w(t.height,I,y),square:H(t.square)};if(t.shape==="circle"){const i=t.equalTo===void 0?void 0:X(t.equalTo,e.length);if(i!==void 0&&e[i].shape!=="circle")throw new Error("Equal diameter requires an earlier circle.");return{...r,shape:t.shape,diameter:w(t.diameter,I,y),equalTo:i}}throw new Error("Use a rectangle or circle for each sketch profile.")}function Ne(n){return n?.type==="extrude"&&n.mode==="add"&&n.profiles.length===1&&n.profiles[0].shape==="rectangle"}function Je(n){if(!Array.isArray(n)||!n.length||n.length>Q)throw new Error(`A body must have 1 to ${Q} features.`);const e=[];for(const t of n){const r=j(t);if(r.type==="extrude"){if(r.mode!=="add"&&(r.mode!=="cut"||!e.length))throw new Error("Start with an additive extrusion.");const i=j(r.plane);let a;if("cap"in i){const o=X(i.cap,e.length),c=e[o];if(c.type!=="extrude"||c.mode!=="add")throw new Error("Choose an additive extrusion face.");a={cap:o}}else if("face"in i){if(!e.length)throw new Error("Create a body before sketching on a face.");const o=H(i.join);a={face:se(i.face),...o&&{join:o}}}else{if(!K.some(o=>o===i.axis))throw new Error("Choose a sketch plane.");a={axis:i.axis,offset:w(i.offset,-y,y)}}if(!Array.isArray(r.profiles)||!r.profiles.length||r.profiles.length>oe)throw new Error(`Draw 1 to ${oe} profiles before extruding.`);const s=[];for(const o of r.profiles)s.push(We(o,s));e.push({type:"extrude",mode:r.mode,plane:a,profiles:s,depth:w(r.depth,I,y)})}else if(r.type==="face-extrude"){if(!e.length)throw new Error("Create a body before extruding its face.");const i=w(r.depth,-y,y);if(Math.abs(i)<I)throw new Error("Enter a depth of at least 0.01 mm.");e.push({type:"face-extrude",face:se(r.face),depth:i})}else if(r.type==="finish"){const i=X(r.target,e.length),a=e[i];if(!Ne(a))throw new Error("Choose a rectangular extrusion.");if(r.style!=="chamfer"&&r.style!=="fillet")throw new Error("Choose a chamfer or fillet.");const s=xe(e,a.plane).axis;let o;if(r.edge!==void 0){const c=j(r.edge),d=K.find(l=>l===c.plane);if(!d||typeof c.corner!="number"||!Number.isInteger(c.corner)||!ve[c.corner])throw new Error("Choose a valid rectangular edge.");o={plane:d,corner:c.corner}}if(e.some(c=>c.type==="finish"&&c.target===i&&(c.edge?.plane??s)===(o?.plane??s)&&(!o||!c.edge||c.edge.corner===o.corner)))throw new Error("An edge can have only one finish.");e.push({type:"finish",target:i,style:r.style,size:w(r.size,I,y),...o&&{edge:o}})}else throw new Error("Unknown modeling feature.")}return e}function xe(n,e){if("axis"in e)return e;if("face"in e){const{plane:i,anchor:a,sign:s}=e.face;return{axis:i,offset:a[we[i][2]],...s<0&&{sign:-1}}}const t=n[e.cap];if(t?.type!=="extrude"||t.mode!=="add")throw new Error("Choose an additive extrusion face.");const r=xe(n,t.plane);return{...r,offset:r.offset+t.depth*(r.sign??1)}}function Ke(n){const e=[];for(const t of n){const r=t.mirrorTo===void 0?void 0:e[t.mirrorTo],[i,a]=t.center,s=r?[-r.center[0],r.center[1]]:[t.centerU?0:i,t.centerV?0:a];if(t.shape==="rectangle")e.push({...t,center:s,height:t.square?t.width:t.height});else{const o=t.equalTo===void 0?void 0:e[t.equalTo];e.push({...t,center:s,diameter:o?.shape==="circle"?o.diameter:t.diameter})}}return e}function Qe(n,[e,t],r){return n==="XZ"?[e,r,t]:n==="YZ"?[r,e,t]:[e,t,r]}function et(n,e=[]){const[t,r]=n.center;if(n.shape==="circle")return Array.from({length:80},(s,o)=>{const c=o*Math.PI/40;return[t+n.diameter*.5*Math.cos(c),r+n.diameter*.5*Math.sin(c)]});const i=n.width/2,a=n.height/2;return ve.flatMap(([s,o],c)=>{const d=e.find(u=>!u.edge||u.edge.corner===c);if(!d)return[[t+s*i,r+o*a]];const l=d.size;if(l>=Math.min(i,a))throw new Error("The edge finish must be smaller than half the shorter side.");const f=d.style==="fillet"?12:1;return Array.from({length:f+1},(u,B)=>{const P=(c+2+B/f)*Math.PI/2;return[t+s*(i-l)+Math.cos(P)*l,r+o*(a-l)+Math.sin(P)*l]})})}const ae=new te,N=new U;class Re extends Te{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],r=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(r),this.setAttribute("position",new ie(e,3)),this.setAttribute("uv",new ie(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,r=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),r.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const r=new J(t,6,1);return this.setAttribute("instanceStart",new O(r,3,0)),this.setAttribute("instanceEnd",new O(r,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const r=new J(t,6,1);return this.setAttribute("instanceColorStart",new O(r,3,0)),this.setAttribute("instanceColorEnd",new O(r,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Le(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new te);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ae.setFromBufferAttribute(t),this.boundingBox.union(ae))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ge),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const r=this.boundingSphere.center;this.boundingBox.getCenter(r);let i=0;for(let a=0,s=e.count;a<s;a++)N.fromBufferAttribute(e,a),i=Math.max(i,r.distanceToSquared(N)),N.fromBufferAttribute(t,a),i=Math.max(i,r.distanceToSquared(N));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}G.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ne(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};q.line={uniforms:ye.merge([G.common,G.fog,G.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Fe extends Be{constructor(e){super({type:"LineMaterial",uniforms:ye.clone(q.line.uniforms),vertexShader:q.line.vertexShader,fragmentShader:q.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const $=new W,ce=new U,le=new U,p=new W,h=new W,E=new W,Z=new U,Y=new De,m=new Pe,de=new U,R=new te,F=new ge,_=new W;let A,L;function fe(n,e,t){return _.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),_.multiplyScalar(1/_.w),_.x=L/t.width,_.y=L/t.height,_.applyMatrix4(n.projectionMatrixInverse),_.multiplyScalar(1/_.w),Math.abs(Math.max(_.x,_.y))}function qe(n,e){const t=n.matrixWorld,r=n.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,s=Math.min(r.instanceCount,i.count);for(let o=0,c=s;o<c;o++){m.start.fromBufferAttribute(i,o),m.end.fromBufferAttribute(a,o),m.applyMatrix4(t);const d=new U,l=new U;A.distanceSqToSegment(m.start,m.end,l,d),l.distanceTo(d)<L*.5&&e.push({point:l,pointOnLine:d,distance:A.origin.distanceTo(l),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function Ge(n,e,t){const r=e.projectionMatrix,a=n.material.resolution,s=n.matrixWorld,o=n.geometry,c=o.attributes.instanceStart,d=o.attributes.instanceEnd,l=Math.min(o.instanceCount,c.count),f=-e.near;A.at(1,E),E.w=1,E.applyMatrix4(e.matrixWorldInverse),E.applyMatrix4(r),E.multiplyScalar(1/E.w),E.x*=a.x/2,E.y*=a.y/2,E.z=0,Z.copy(E),Y.multiplyMatrices(e.matrixWorldInverse,s);for(let u=0,B=l;u<B;u++){if(p.fromBufferAttribute(c,u),h.fromBufferAttribute(d,u),p.w=1,h.w=1,p.applyMatrix4(Y),h.applyMatrix4(Y),p.z>f&&h.z>f)continue;if(p.z>f){const v=p.z-h.z,x=(p.z-f)/v;p.lerp(h,x)}else if(h.z>f){const v=h.z-p.z,x=(h.z-f)/v;h.lerp(p,x)}p.applyMatrix4(r),h.applyMatrix4(r),p.multiplyScalar(1/p.w),h.multiplyScalar(1/h.w),p.x*=a.x/2,p.y*=a.y/2,h.x*=a.x/2,h.y*=a.y/2,m.start.copy(p),m.start.z=0,m.end.copy(h),m.end.z=0;const S=m.closestPointToPointParameter(Z,!0);m.at(S,de);const b=k.lerp(p.z,h.z,S),M=b>=-1&&b<=1,D=Z.distanceTo(de)<L*.5;if(M&&D){m.start.fromBufferAttribute(c,u),m.end.fromBufferAttribute(d,u),m.start.applyMatrix4(s),m.end.applyMatrix4(s);const v=new U,x=new U;A.distanceSqToSegment(m.start,m.end,x,v),t.push({point:x,pointOnLine:v,distance:A.origin.distanceTo(x),object:n,face:null,faceIndex:u,uv:null,uv1:null})}}}class tt extends ee{constructor(e=new Re,t=new Fe({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,r=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let s=0,o=0,c=t.count;s<c;s++,o+=2)ce.fromBufferAttribute(t,s),le.fromBufferAttribute(r,s),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+ce.distanceTo(le);const a=new J(i,2,1);return e.setAttribute("instanceDistanceStart",new O(a,1,0)),e.setAttribute("instanceDistanceEnd",new O(a,1,1)),this}raycast(e,t){const r=this.material.worldUnits,i=e.camera;i===null&&!r&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const a=e.params.Line2!==void 0&&e.params.Line2.threshold||0;A=e.ray;const s=this.matrixWorld,o=this.geometry,c=this.material;L=c.linewidth+a,o.boundingSphere===null&&o.computeBoundingSphere(),F.copy(o.boundingSphere).applyMatrix4(s);let d;if(r)d=L*.5;else{const f=Math.max(i.near,F.distanceToPoint(A.origin));d=fe(i,f,c.resolution)}if(F.radius+=d,A.intersectsSphere(F)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),R.copy(o.boundingBox).applyMatrix4(s);let l;if(r)l=L*.5;else{const f=Math.max(i.near,R.distanceToPoint(A.origin));l=fe(i,f,c.resolution)}R.expandByScalar(l),A.intersectsBox(R)!==!1&&(r?qe(this,t):Ge(this,i,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport($),this.material.uniforms.resolution.value.set($.z,$.w))}}function ue(n,e,t,r){const i=n.clone().project(e);return new ne((i.x+1)*t/2,(1-i.y)*r/2)}function nt(n,e,t,r,i,a=!1){if(r<=0||i<=0)return null;const s=ue(n,t,r,i);if(!a&&(s.x<0||s.y<0||s.x>r||s.y>i))return null;const o=i*t.zoom/(t.top-t.bottom),c=ue(n.clone().addScaledVector(e,1/o),t,r,i).sub(s),d=c.length(),l=d<.1?new ne(0,-1):c.divideScalar(d),f=k.clamp(s.x+l.x*34,24,r-24),u=k.clamp(s.y+l.y*34,24,i-24);return{x:s.x,y:s.y,handleX:f,handleY:u,dx:l.x,dy:l.y,pixelsPerMillimeter:o*Math.max(.35,d),fieldOnLeft:f>r-200,fieldAbove:u>i-100}}const pe=(n,e,t)=>(e[0]-n[0])*(t[1]-n[1])-(e[1]-n[1])*(t[0]-n[0]);function rt({positions:n,triangles:e},{plane:t,sign:r,anchor:i}){const[a,s,o]=we[t],c=Math.max(1e-6,Math.abs(i[o])*2e-7),d=[i[a],i[s]],l=[],f=new Map;let u=-1;for(let S=0;S<e.length;S+=3){const b=[e[S],e[S+1],e[S+2]];if(b.some(g=>Math.abs(n[g*3+o]-i[o])>c))continue;const M=b.map(g=>[n[g*3+a],n[g*3+s]]),D=pe(...M);if(D*r*(t==="XZ"?-1:1)<=0)continue;D<0&&M.reverse();const v=b.map((g,C)=>{const z=b[(C+1)%3];return g<z?`${g}:${z}`:`${z}:${g}`}),x=l.length;l.push({points:M,edges:v,offset:n[b[0]*3+o]});for(const g of v){const C=f.get(g);C?C.push(x):f.set(g,[x])}u===-1&&M.every((g,C)=>{const z=M[(C+1)%3];return pe(g,z,d)>=-c*Math.hypot(z[0]-g[0],z[1]-g[1])})&&(u=x)}if(u===-1)return null;const B=new Set([u]),P=[];for(const S of B){const{points:b,edges:M}=l[S];P.push(b);for(const D of M)for(const v of f.get(D))B.add(v)}return{paths:P,offset:l[u].offset,epsilon:c}}function it(n){const e=new Map;for(const i of n)for(const[a,s]of i.entries()){const o=i[(a+1)%i.length];e.delete(`${o}:${s}`)||e.set(`${s}:${o}`,[s,o])}const t=new Map;for(const[i,a]of e.values()){const s=t.get(String(i));s?s.push(a):t.set(String(i),[a])}const r=[];for(const[i]of e.values()){if(!t.get(String(i))?.length)continue;const a=[i];let s=t.get(String(i))?.pop();for(;s&&String(s)!==String(i);)a.push(s),s=t.get(String(s))?.pop();s&&a.length>=3&&r.push(a)}return r}const he=(n,e,t=0)=>({shape:"rectangle",center:[0,t],centerU:!0,width:n,height:e}),T=(n,e,t)=>({shape:"circle",center:[e,t],diameter:n,centerU:e===0||void 0});function me(n,e,t,r){return[T(n,-e,t),{...T(n*.72,e+6,t+5),equalTo:0,mirrorTo:0},{...T(n*1.25,-e,r),equalTo:0},{...T(n*.8,e-6,r-5),equalTo:0,mirrorTo:2}]}const ot="motor-mount";function st(n=134,e=9){return[{type:"extrude",mode:"add",plane:{axis:"XZ",offset:0},profiles:[he(n,72,4)],depth:12},{type:"extrude",mode:"add",plane:{axis:"XY",offset:-10},profiles:[he(78,64,39)],depth:14},{type:"extrude",mode:"add",plane:{cap:1},profiles:[T(48,0,44)],depth:10},{type:"extrude",mode:"cut",plane:{cap:2},profiles:[T(30,0,44)],depth:25},{type:"extrude",mode:"cut",plane:{cap:2},profiles:[T(38,0,44)],depth:3.5},{type:"extrude",mode:"cut",plane:{cap:1},profiles:me(7,28,28,60),depth:15},{type:"extrude",mode:"cut",plane:{cap:0},profiles:me(e,48,-19,26),depth:13},{type:"finish",target:0,style:"chamfer",size:7},{type:"finish",target:1,style:"fillet",size:9}]}export{ve as C,tt as L,Q as M,we as P,Qe as a,Ze as b,Ce as c,K as d,Re as e,Fe as f,rt as g,it as h,et as i,nt as j,je as k,Ne as l,oe as m,I as n,ot as o,Je as p,st as q,xe as r,Ke as s,ue as t,Ye as u,Oe as v,y as w};
