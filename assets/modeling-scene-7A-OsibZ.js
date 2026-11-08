import{aj as nt,l as Re,ak as Ae,al as K,am as it,B as Ue,an as $e,V as P,ao as st,ap as fe,aq as Ze,h as ot,ar as pe,M as Be,a8 as re,a1 as rt,c as at,x as F,W as ct,E as lt,S as dt,C as ut,ae as ft,O as pt,a as ht,D as We,H as mt,b as wt,m as gt,g as vt,X as yt,G as Y,d as xt,q as St,ag as bt}from"./three.module-DHLk-87x.js";import{m as ze,r as Je,s as Et,f as Mt,j as _t,k as At}from"./motor-mount-I5iZ94n5.js";import{buildExtrusionChange as zt,buildPart as Lt}from"./build-PAf5sX-6.js";import{loadKernel as Ut}from"./kernel-DYl0GoBz.js";import"./STLExporter-BExu1CFc.js";import"./BufferGeometryUtils-BLhkFWFe.js";import"./preload-helper-BXl3LOEh.js";import"./mesh-Cq_MWlSY.js";const He=new Ue,le=new P;class Ke extends nt{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Re(e,3)),this.setAttribute("uv",new Re(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Ae(t,6,1);return this.setAttribute("instanceStart",new K(i,3,0)),this.setAttribute("instanceEnd",new K(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Ae(t,6,1);return this.setAttribute("instanceColorStart",new K(i,3,0)),this.setAttribute("instanceColorEnd",new K(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new it(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ue);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),He.setFromBufferAttribute(t),this.boundingBox.union(He))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $e),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let u=0,p=e.count;u<p;u++)le.fromBufferAttribute(e,u),n=Math.max(n,i.distanceToSquared(le)),le.fromBufferAttribute(t,u),n=Math.max(n,i.distanceToSquared(le));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}pe.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ot(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};fe.line={uniforms:Ze.merge([pe.common,pe.fog,pe.line]),vertexShader:`
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
		`};class he extends st{constructor(e){super({type:"LineMaterial",uniforms:Ze.clone(fe.line.uniforms),vertexShader:fe.line.vertexShader,fragmentShader:fe.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const ye=new re,je=new P,Ge=new P,S=new re,b=new re,O=new re,xe=new P,Se=new at,E=new rt,qe=new P,de=new Ue,ue=new $e,k=new re;let I,$;function Ne(o,e,t){return k.set(0,0,-e,1).applyMatrix4(o.projectionMatrix),k.multiplyScalar(1/k.w),k.x=$/t.width,k.y=$/t.height,k.applyMatrix4(o.projectionMatrixInverse),k.multiplyScalar(1/k.w),Math.abs(Math.max(k.x,k.y))}function Bt(o,e){const t=o.matrixWorld,i=o.geometry,n=i.attributes.instanceStart,u=i.attributes.instanceEnd,p=Math.min(i.instanceCount,n.count);for(let a=0,c=p;a<c;a++){E.start.fromBufferAttribute(n,a),E.end.fromBufferAttribute(u,a),E.applyMatrix4(t);const l=new P,f=new P;I.distanceSqToSegment(E.start,E.end,f,l),f.distanceTo(l)<$*.5&&e.push({point:f,pointOnLine:l,distance:I.origin.distanceTo(f),object:o,face:null,faceIndex:a,uv:null,uv1:null})}}function Dt(o,e,t){const i=e.projectionMatrix,u=o.material.resolution,p=o.matrixWorld,a=o.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,f=Math.min(a.instanceCount,c.count),h=-e.near;I.at(1,O),O.w=1,O.applyMatrix4(e.matrixWorldInverse),O.applyMatrix4(i),O.multiplyScalar(1/O.w),O.x*=u.x/2,O.y*=u.y/2,O.z=0,xe.copy(O),Se.multiplyMatrices(e.matrixWorldInverse,p);for(let g=0,z=f;g<z;g++){if(S.fromBufferAttribute(c,g),b.fromBufferAttribute(l,g),S.w=1,b.w=1,S.applyMatrix4(Se),b.applyMatrix4(Se),S.z>h&&b.z>h)continue;if(S.z>h){const B=S.z-b.z,L=(S.z-h)/B;S.lerp(b,L)}else if(b.z>h){const B=b.z-S.z,L=(b.z-h)/B;b.lerp(S,L)}S.applyMatrix4(i),b.applyMatrix4(i),S.multiplyScalar(1/S.w),b.multiplyScalar(1/b.w),S.x*=u.x/2,S.y*=u.y/2,b.x*=u.x/2,b.y*=u.y/2,E.start.copy(S),E.start.z=0,E.end.copy(b),E.end.z=0;const v=E.closestPointToPointParameter(xe,!0);E.at(v,qe);const m=F.lerp(S.z,b.z,v),A=m>=-1&&m<=1,G=xe.distanceTo(qe)<$*.5;if(A&&G){E.start.fromBufferAttribute(c,g),E.end.fromBufferAttribute(l,g),E.start.applyMatrix4(p),E.end.applyMatrix4(p);const B=new P,L=new P;I.distanceSqToSegment(E.start,E.end,L,B),t.push({point:L,pointOnLine:B,distance:I.origin.distanceTo(L),object:o,face:null,faceIndex:g,uv:null,uv1:null})}}}class Ct extends Be{constructor(e=new Ke,t=new he({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let p=0,a=0,c=t.count;p<c;p++,a+=2)je.fromBufferAttribute(t,p),Ge.fromBufferAttribute(i,p),n[a]=a===0?0:n[a-1],n[a+1]=n[a]+je.distanceTo(Ge);const u=new Ae(n,2,1);return e.setAttribute("instanceDistanceStart",new K(u,1,0)),e.setAttribute("instanceDistanceEnd",new K(u,1,1)),this}raycast(e,t){const i=this.material.worldUnits,n=e.camera;n===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const u=e.params.Line2!==void 0&&e.params.Line2.threshold||0;I=e.ray;const p=this.matrixWorld,a=this.geometry,c=this.material;$=c.linewidth+u,a.boundingSphere===null&&a.computeBoundingSphere(),ue.copy(a.boundingSphere).applyMatrix4(p);let l;if(i)l=$*.5;else{const h=Math.max(n.near,ue.distanceToPoint(I.origin));l=Ne(n,h,c.resolution)}if(ue.radius+=l,I.intersectsSphere(ue)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),de.copy(a.boundingBox).applyMatrix4(p);let f;if(i)f=$*.5;else{const h=Math.max(n.near,de.distanceToPoint(I.origin));f=Ne(n,h,c.resolution)}de.expandByScalar(f),I.intersectsBox(de)!==!1&&(i?Bt(this,t):Dt(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(ye),this.material.uniforms.resolution.value.set(ye.z,ye.w))}}class Le extends Ke{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e){const t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setColors(i),this}setFromPoints(e){const t=e.length-1,i=new Float32Array(6*t);for(let n=0;n<t;n++)i[6*n]=e[n].x,i[6*n+1]=e[n].y,i[6*n+2]=e[n].z||0,i[6*n+3]=e[n+1].x,i[6*n+4]=e[n+1].y,i[6*n+5]=e[n+1].z||0;return super.setPositions(i),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class be extends Ct{constructor(e=new Le,t=new he({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Z=ze(122),se=[.58,1.03],Ee=[.47,.72],Me=[.28,1.33],H=o=>()=>Z.slice(0,o),T=[{title:"Motor mount",detail:"Drag to orbit",duration:2200,view:se,model:()=>ze()},{title:"Draw the base sketch",detail:"XZ plane · 122 × 72 mm",duration:2300,view:Ee,focusY:10,model:H(0),sketch:[0]},{title:"Extrude the base",detail:"Add · 12 mm",duration:2e3,view:se,model:H(1),sweeps:[{feature:0,until:1}]},{title:"Extrude the upright",detail:"Base face · 59 mm upward",duration:2400,view:[.63,1.12],model:H(2),sweeps:[{feature:1,until:1,fromBase:!0}]},{title:"Sketch on the upright face",detail:"Circle · Ø48 mm · Centered",duration:2400,view:Me,model:H(2),sketch:[2]},{title:"Extrude the boss",detail:"Add · 10 mm",duration:1900,view:se,model:H(3),sweeps:[{feature:2,until:1}]},{title:"Sketch the bore and recess",detail:"Boss face · Ø30 and Ø38 mm",duration:2400,view:Me,model:H(3),sketch:[3,4]},{title:"Cut the bore and recess",detail:"Through bore · 3.5 mm recess",duration:2600,view:Me,model:H(5),sweeps:[{feature:3,until:.58},{feature:4,until:1}]},{title:"Constrain the hole pattern",detail:"Equal diameters · Mirrored centers",duration:2900,view:Ee,model:H(6),sketch:[6]},{title:"Cut the mounting holes",detail:"Base face · 4 × Ø9 mm",duration:2200,view:Ee,model:H(7),sweeps:[{feature:6,until:1}]},{title:"Chamfer and round the edges",detail:"Base chamfer 7 mm · Upright radius 9 mm",duration:2300,view:se,model:o=>[...Z.slice(0,7),{type:"finish",target:0,style:"chamfer",size:Math.max(.1,7*o)},{type:"finish",target:1,style:"fillet",size:Math.max(.1,9*o)}],animated:!0},{title:"Edit the base width",detail:"122 → 134 mm",duration:2700,view:se,model:o=>ze(122+12*o),animated:!0}],Pt={XZ:1,XY:2,YZ:0};function Ot(o,e){const t=Z[e.feature];if(t?.type!=="extrude")throw new Error("Expected a modeling extrusion.");const{before:i,after:n,changed:u}=zt(o,Z.slice(0,e.feature+1)),p=e.fromBase?"XZ":Je(Z,t.plane).axis,a=Pt[p],c=u.size[a];return{before:i,after:n,changed:u,axis:a,pivot:u.center[a]-c/2,cut:t.mode==="cut",travel:t.mode==="cut"?Math.max(1,t.depth/c):1}}const _e=12,Ve=4,Xe=27,oe=o=>o*o*(3-2*o);function Ye(o,e,t){return[F.lerp(o[0],e[0],t),F.lerp(o[1],e[1],t)]}function kt(o,e,t,i){const n=new Y,u=[];for(const c of T[o].sketch??[]){const l=Z[c];if(l.type!=="extrude")continue;const{axis:f,offset:h}=Je(Z,l.plane),g=(v,m)=>new P(...At(f,v,m)),z=v=>g(v,h+.08),j=v=>{const m=Mt(v).map(D=>g(D,0)),A=Array.from({length:m.length-2},(D,X)=>[0,X+1,X+2]).flat(),G=new Be(new xt().setFromPoints(m).setIndex(A),i),B=new Le().setPositions([...m,m[0]].flatMap(D=>D.toArray())),L=new be(B,e),N=new be(B,t);G.renderOrder=3,N.renderOrder=4,L.renderOrder=5;const V=new Y;return V.add(G,N,L),n.add(V),V};if(l.profiles.some(v=>v.mirrorTo!==void 0)){const v=new Le().setPositions([z([0,-31]),z([0,36])].flatMap(A=>A.toArray())),m=new be(v,t);m.renderOrder=3,n.add(m)}for(const[v,m]of Et(l.profiles).entries()){const A=l.profiles[v];if(m.shape==="circle"&&A.shape==="circle"){const G=j({...m,center:[0,0],diameter:2});u.push({shape:G,from:z(A.center),to:z(m.center),startRadius:A.diameter/2,endRadius:m.diameter/2})}else j({...m,center:[0,0]}).position.copy(z(m.center))}}const p=u.some(({from:c,to:l,startRadius:f,endRadius:h})=>!c.equals(l)||f!==h),a=(c,l,f)=>oe(F.clamp((c-l)/(f-l),0,1));return{group:n,show(c){const l=F.lerp(.2,1,a(c,0,p?.52:.85)),f=a(c,.52,.77),h=a(c,.77,1);for(const{shape:g,from:z,to:j,startRadius:v,endRadius:m}of u)g.position.lerpVectors(z,j,h),g.scale.setScalar(l*F.lerp(v,m,f))}}}async function qt(o){const e=o.querySelector(".modeling-stage"),t=e.querySelector("canvas"),i=o.querySelector("[data-model-title]"),n=o.querySelector("[data-model-detail]"),u=o.querySelector("[data-model-count]"),p=window.matchMedia("(prefers-reduced-motion: reduce)"),a=await Ut(),c=new ct({canvas:t,antialias:!0});c.setPixelRatio(Math.min(devicePixelRatio,1.75)),c.toneMapping=lt;const l=new dt;l.background=new ut("#edf2f3"),l.fog=new ft("#edf2f3",280,520);const f=new pt(-90,90,65,-65,.1,1e3),h=new P(0,Xe,4),g=new ht(760,76,10334134,12175308);g.position.y=-.13,g.material.transparent=!0,g.material.opacity=.58;const z=new We(16773853,2.9);z.position.set(-90,140,110);const j=new We(12969471,1.35);j.position.set(75,15,-65),l.add(g,z,j,new mt(16777215,6715267,2.55));const v=new wt({color:12875851,roughness:.35,metalness:.25,polygonOffset:!0,polygonOffsetFactor:1}),m=new gt({color:4400409,transparent:!0,opacity:.32}),A={transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1},G=new he({...A,color:18088,linewidth:2.6}),B=new he({...A,color:16120319,linewidth:4.6,opacity:.88}),L=new vt({...A,color:3771391,opacity:.34,side:yt}),N=new Y,V=new Y;l.add(N,V);let D=!p.matches,X=!0,Q=!1,_=0,ee=0,te=0,J=0,U=T[0].view,De=U,Ce=h.y,x,R=!1,C;const Pe=new Map,Oe=new Map,me=new Map;function W(){!J&&X&&!Q&&(J=requestAnimationFrame(tt))}function we(s,r=!1){De=U,Ce=h.y,_=(s+T.length)%T.length;const d=T[_];if(ee=r?d.duration*.75:0,V.clear(),d.sketch){const w=me.get(_)??kt(_,G,B,L);me.set(_,w),V.add(w.group)}i.textContent=d.title,n.textContent=d.detail,u.textContent=`${String(_+1).padStart(2,"0")} / ${T.length}`,W()}function ne(s){D=s,te=0,W()}function ke(){return p.matches?1:oe(Math.min(1,ee/480))}function Te(){return Ye(De,T[_].view,ke())}function ae(s){const r=_t(s),d=new Be(r,v);return d.add(new St(new bt(r,32),m)),d}function Qe(s){const r=Ot(a,s),d=r.before?ae(r.before):new Y,w=ae(r.after),y=ae(r.changed),q=new Y;return q.add(d,w,y),{group:q,show(M){d.visible=M===0||!r.cut&&M<1,w.visible=M===1||r.cut&&M>0;const ie=r.cut?Math.max(0,1-M*r.travel):M;y.visible=M>0&&M<1&&ie>0,y.visible&&(y.scale.setComponent(r.axis,ie),y.position.setComponent(r.axis,r.pivot*(1-ie)))}}}function et(s){const r=T[_];let d;if(r.sweeps){const w=r.sweeps.findIndex(({until:ie})=>s<=ie),y=r.sweeps[w],q=w>0?r.sweeps[w-1].until:0,M=Oe.get(y.feature)??Qe(y);Oe.set(y.feature,M),M.show(oe((s-q)/(y.until-q))),d=M.group}else{const w=r.animated?Math.round(oe(s)*_e):_e,y=`${_}:${w}`,q=Pe.get(y);if(q)d=q;else{const M=r.model(w/_e);d=M.length?ae(Lt(a,M)):new Y,Pe.set(y,d)}}N.children[0]!==d&&(N.clear(),N.add(d))}function tt(s){if(J=0,!X||Q)return;const r=te?Math.min(55,s-te):0;te=s,D&&!x&&!R&&!C&&(ee+=r,ee>=T[_].duration&&we(_+1));const d=T[_],w=Math.min(1,ee/(d.duration*.72));try{et(w)}catch(y){console.error("Could not build the modeling demo.",y),Q=!0,o.removeAttribute("data-live");return}if(me.get(_)?.show(w),C){const y=p.matches?1:oe(Math.min(1,(s-C.started)/560));U=Ye(C.from,C.to,y),y>=1&&(C=void 0)}else!x&&!R&&(U=Te());h.y=F.lerp(Ce,d.focusY??Xe,ke()),f.position.setFromSphericalCoords(260,U[1],U[0]).add(h),f.lookAt(h),c.render(l,f),(D||C)&&W()}const Ie=()=>{const{clientWidth:s,clientHeight:r}=e;if(!s||!r)return;c.setSize(s,r,!1);const d=s/r,w=Math.max(60,87/d);f.left=-w*d,f.right=w*d,f.top=w,f.bottom=-w,f.updateProjectionMatrix(),W()};new ResizeObserver(Ie).observe(e),"IntersectionObserver"in window&&new IntersectionObserver(([s])=>{X=s.isIntersecting,te=0,!X&&J?(cancelAnimationFrame(J),J=0):W()}).observe(e),t.addEventListener("pointerdown",s=>{x||s.button!==0||(R=!1,C=void 0,x={id:s.pointerId,x:s.clientX,y:s.clientY,from:U,moved:!1},t.setPointerCapture(s.pointerId))}),t.addEventListener("pointermove",s=>{if(x?.id!==s.pointerId)return;const r=x.x-s.clientX,d=x.y-s.clientY;!x.moved&&Math.hypot(r,d)<Ve||(x.moved=!0,e.dataset.dragging="true",U=[x.from[0]+F.clamp(r*.009,-Math.PI,Math.PI),F.clamp(x.from[1]+d*.009,.2,2.8)],W())});function ge(){C={from:U,to:Te(),started:performance.now()},W()}function ve(s){if(x?.id!==s.pointerId)return;const r=s.type==="pointerup"&&!x.moved&&Math.hypot(x.x-s.clientX,x.y-s.clientY)<Ve;x=void 0,delete e.dataset.dragging,r?ne(!D):ge()}t.addEventListener("pointerup",ve),t.addEventListener("pointercancel",ve),t.addEventListener("lostpointercapture",ve);const Fe={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,-.12],ArrowDown:[0,.12]},ce=new Set;t.addEventListener("keydown",s=>{if(x)return;if(s.key===" "||s.key==="PageUp"||s.key==="PageDown"){if(s.preventDefault(),s.repeat||R)return;s.key===" "?ne(!D):(C=void 0,ne(!1),we(_+(s.key==="PageUp"?-1:1),!0));return}if(!Object.hasOwn(Fe,s.key))return;s.preventDefault(),ce.add(s.key),R=!0,C=void 0;const[r,d]=Fe[s.key];U=[U[0]+r,F.clamp(U[1]+d,.2,2.8)],W()}),t.addEventListener("keyup",s=>{!ce.delete(s.key)||ce.size||!R||(R=!1,ge())}),t.addEventListener("blur",()=>{ce.clear(),R&&(R=!1,ge())}),p.addEventListener("change",()=>{p.matches&&ne(!1)}),t.addEventListener("webglcontextlost",s=>{s.preventDefault(),Q=!0,o.removeAttribute("data-live")}),t.addEventListener("webglcontextrestored",()=>{Q=!1,o.dataset.live="true",W()}),o.dataset.live="true",Ie(),ne(D),we(0)}export{qt as startModelingDemo};
