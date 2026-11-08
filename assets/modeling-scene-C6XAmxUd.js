import{aj as ot,l as Ge,ak as Ue,al as K,am as rt,B as De,an as Ke,V as O,ao as at,ap as he,aq as Qe,h as ct,ar as me,M as Oe,a8 as ae,a1 as lt,c as dt,x as R,W as ut,E as ft,S as pt,C as ht,ae as mt,O as wt,a as gt,D as je,H as vt,b as yt,m as xt,g as St,X as bt,G as N,d as Et,q as Mt,ag as _t}from"./three.module-DHLk-87x.js";import{m as Be,r as et,s as At,g as zt,k as Lt,l as Ut}from"./motor-mount-C-iSTYXS.js";import{buildExtrusionChange as Bt,buildPart as Ct}from"./build-By6iEcX1.js";import{loadKernel as Dt}from"./kernel-DYl0GoBz.js";import{a as Ot,b as Pt,d as kt}from"./theme-w4nisitE.js";import"./STLExporter-BExu1CFc.js";import"./BufferGeometryUtils-BLhkFWFe.js";import"./preload-helper-BXl3LOEh.js";import"./mesh-Cq_MWlSY.js";const qe=new De,ue=new O;class tt extends ot{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Ge(e,3)),this.setAttribute("uv",new Ge(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Ue(t,6,1);return this.setAttribute("instanceStart",new K(i,3,0)),this.setAttribute("instanceEnd",new K(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new Ue(t,6,1);return this.setAttribute("instanceColorStart",new K(i,3,0)),this.setAttribute("instanceColorEnd",new K(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new rt(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new De);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),qe.setFromBufferAttribute(t),this.boundingBox.union(qe))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ke),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let u=0,f=e.count;u<f;u++)ue.fromBufferAttribute(e,u),n=Math.max(n,i.distanceToSquared(ue)),ue.fromBufferAttribute(t,u),n=Math.max(n,i.distanceToSquared(ue));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}me.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ct(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};he.line={uniforms:Qe.merge([me.common,me.fog,me.line]),vertexShader:`
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
		`};class we extends at{constructor(e){super({type:"LineMaterial",uniforms:Qe.clone(he.line.uniforms),vertexShader:he.line.vertexShader,fragmentShader:he.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const be=new ae,Ne=new O,Ve=new O,S=new ae,b=new ae,k=new ae,Ee=new O,Me=new dt,E=new lt,Xe=new O,fe=new De,pe=new Ke,T=new ae;let F,V;function Ye(o,e,t){return T.set(0,0,-e,1).applyMatrix4(o.projectionMatrix),T.multiplyScalar(1/T.w),T.x=V/t.width,T.y=V/t.height,T.applyMatrix4(o.projectionMatrixInverse),T.multiplyScalar(1/T.w),Math.abs(Math.max(T.x,T.y))}function Tt(o,e){const t=o.matrixWorld,i=o.geometry,n=i.attributes.instanceStart,u=i.attributes.instanceEnd,f=Math.min(i.instanceCount,n.count);for(let a=0,c=f;a<c;a++){E.start.fromBufferAttribute(n,a),E.end.fromBufferAttribute(u,a),E.applyMatrix4(t);const l=new O,h=new O;F.distanceSqToSegment(E.start,E.end,h,l),h.distanceTo(l)<V*.5&&e.push({point:h,pointOnLine:l,distance:F.origin.distanceTo(h),object:o,face:null,faceIndex:a,uv:null,uv1:null})}}function It(o,e,t){const i=e.projectionMatrix,u=o.material.resolution,f=o.matrixWorld,a=o.geometry,c=a.attributes.instanceStart,l=a.attributes.instanceEnd,h=Math.min(a.instanceCount,c.count),w=-e.near;F.at(1,k),k.w=1,k.applyMatrix4(e.matrixWorldInverse),k.applyMatrix4(i),k.multiplyScalar(1/k.w),k.x*=u.x/2,k.y*=u.y/2,k.z=0,Ee.copy(k),Me.multiplyMatrices(e.matrixWorldInverse,f);for(let M=0,v=h;M<v;M++){if(S.fromBufferAttribute(c,M),b.fromBufferAttribute(l,M),S.w=1,b.w=1,S.applyMatrix4(Me),b.applyMatrix4(Me),S.z>w&&b.z>w)continue;if(S.z>w){const C=S.z-b.z,A=(S.z-w)/C;S.lerp(b,A)}else if(b.z>w){const C=b.z-S.z,A=(b.z-w)/C;b.lerp(S,A)}S.applyMatrix4(i),b.applyMatrix4(i),S.multiplyScalar(1/S.w),b.multiplyScalar(1/b.w),S.x*=u.x/2,S.y*=u.y/2,b.x*=u.x/2,b.y*=u.y/2,E.start.copy(S),E.start.z=0,E.end.copy(b),E.end.z=0;const m=E.closestPointToPointParameter(Ee,!0);E.at(m,Xe);const p=R.lerp(S.z,b.z,m),L=p>=-1&&p<=1,G=Ee.distanceTo(Xe)<V*.5;if(L&&G){E.start.fromBufferAttribute(c,M),E.end.fromBufferAttribute(l,M),E.start.applyMatrix4(f),E.end.applyMatrix4(f);const C=new O,A=new O;F.distanceSqToSegment(E.start,E.end,A,C),t.push({point:A,pointOnLine:C,distance:F.origin.distanceTo(A),object:o,face:null,faceIndex:M,uv:null,uv1:null})}}}class Ft extends Oe{constructor(e=new tt,t=new we({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let f=0,a=0,c=t.count;f<c;f++,a+=2)Ne.fromBufferAttribute(t,f),Ve.fromBufferAttribute(i,f),n[a]=a===0?0:n[a-1],n[a+1]=n[a]+Ne.distanceTo(Ve);const u=new Ue(n,2,1);return e.setAttribute("instanceDistanceStart",new K(u,1,0)),e.setAttribute("instanceDistanceEnd",new K(u,1,1)),this}raycast(e,t){const i=this.material.worldUnits,n=e.camera;n===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const u=e.params.Line2!==void 0&&e.params.Line2.threshold||0;F=e.ray;const f=this.matrixWorld,a=this.geometry,c=this.material;V=c.linewidth+u,a.boundingSphere===null&&a.computeBoundingSphere(),pe.copy(a.boundingSphere).applyMatrix4(f);let l;if(i)l=V*.5;else{const w=Math.max(n.near,pe.distanceToPoint(F.origin));l=Ye(n,w,c.resolution)}if(pe.radius+=l,F.intersectsSphere(pe)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),fe.copy(a.boundingBox).applyMatrix4(f);let h;if(i)h=V*.5;else{const w=Math.max(n.near,fe.distanceToPoint(F.origin));h=Ye(n,w,c.resolution)}fe.expandByScalar(h),F.intersectsBox(fe)!==!1&&(i?Tt(this,t):It(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(be),this.material.uniforms.resolution.value.set(be.z,be.w))}}class Ce extends tt{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e){const t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setColors(i),this}setFromPoints(e){const t=e.length-1,i=new Float32Array(6*t);for(let n=0;n<t;n++)i[6*n]=e[n].x,i[6*n+1]=e[n].y,i[6*n+2]=e[n].z||0,i[6*n+3]=e[n+1].x,i[6*n+4]=e[n+1].y,i[6*n+5]=e[n+1].z||0;return super.setPositions(i),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class _e extends Ft{constructor(e=new Ce,t=new we({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const X=Be(122),oe=[.58,1.03],Ae=[.47,.72],ze=[.28,1.33],W=o=>()=>X.slice(0,o),I=[{title:"Motor mount",detail:"Drag to orbit",duration:2200,view:oe,model:()=>Be()},{title:"Draw the base sketch",detail:"XZ plane · 122 × 72 mm",duration:2300,view:Ae,focusY:10,model:W(0),sketch:[0]},{title:"Extrude the base",detail:"Add · 12 mm",duration:2e3,view:oe,model:W(1),sweeps:[{feature:0,until:1}]},{title:"Extrude the upright",detail:"Base face · 59 mm upward",duration:2400,view:[.63,1.12],model:W(2),sweeps:[{feature:1,until:1,fromBase:!0}]},{title:"Sketch on the upright face",detail:"Circle · Ø48 mm · Centered",duration:2400,view:ze,model:W(2),sketch:[2]},{title:"Extrude the boss",detail:"Add · 10 mm",duration:1900,view:oe,model:W(3),sweeps:[{feature:2,until:1}]},{title:"Sketch the bore and recess",detail:"Boss face · Ø30 and Ø38 mm",duration:2400,view:ze,model:W(3),sketch:[3,4]},{title:"Cut the bore and recess",detail:"Through bore · 3.5 mm recess",duration:2600,view:ze,model:W(5),sweeps:[{feature:3,until:.58},{feature:4,until:1}]},{title:"Constrain the hole pattern",detail:"Equal diameters · Mirrored centers",duration:2900,view:Ae,model:W(6),sketch:[6]},{title:"Cut the mounting holes",detail:"Base face · 4 × Ø9 mm",duration:2200,view:Ae,model:W(7),sweeps:[{feature:6,until:1}]},{title:"Chamfer and round the edges",detail:"Base chamfer 7 mm · Upright radius 9 mm",duration:2300,view:oe,model:o=>[...X.slice(0,7),{type:"finish",target:0,style:"chamfer",size:Math.max(.1,7*o)},{type:"finish",target:1,style:"fillet",size:Math.max(.1,9*o)}],animated:!0},{title:"Edit the base width",detail:"122 → 134 mm",duration:2700,view:oe,model:o=>Be(122+12*o),animated:!0}],Rt={XZ:1,XY:2,YZ:0};function Ht(o,e){const t=X[e.feature];if(t?.type!=="extrude")throw new Error("Expected a modeling extrusion.");const{before:i,after:n,changed:u}=Bt(o,X.slice(0,e.feature+1)),f=e.fromBase?"XZ":et(X,t.plane).axis,a=Rt[f],c=u.size[a];return{before:i,after:n,changed:u,axis:a,pivot:u.center[a]-c/2,cut:t.mode==="cut",travel:t.mode==="cut"?Math.max(1,t.depth/c):1}}const Le=12,$e=4,Ze=27,re=o=>o*o*(3-2*o);function Je(o,e,t){return[R.lerp(o[0],e[0],t),R.lerp(o[1],e[1],t)]}function Wt(o,e,t,i){const n=new N,u=[];for(const c of I[o].sketch??[]){const l=X[c];if(l.type!=="extrude")continue;const{axis:h,offset:w}=et(X,l.plane),M=(m,p)=>new O(...Ut(h,m,p)),v=m=>M(m,w+.08),B=m=>{const p=zt(m).map($=>M($,0)),L=Array.from({length:p.length-2},($,q)=>[0,q+1,q+2]).flat(),G=new Oe(new Et().setFromPoints(p).setIndex(L),i),C=new Ce().setPositions([...p,p[0]].flatMap($=>$.toArray())),A=new _e(C,e),Q=new _e(C,t);G.renderOrder=3,Q.renderOrder=4,A.renderOrder=5;const Y=new N;return Y.add(G,Q,A),n.add(Y),Y};if(l.profiles.some(m=>m.mirrorTo!==void 0)){const m=new Ce().setPositions([v([0,-31]),v([0,36])].flatMap(L=>L.toArray())),p=new _e(m,t);p.renderOrder=3,n.add(p)}for(const[m,p]of At(l.profiles).entries()){const L=l.profiles[m];if(p.shape==="circle"&&L.shape==="circle"){const G=B({...p,center:[0,0],diameter:2});u.push({shape:G,from:v(L.center),to:v(p.center),startRadius:L.diameter/2,endRadius:p.diameter/2})}else B({...p,center:[0,0]}).position.copy(v(p.center))}}const f=u.some(({from:c,to:l,startRadius:h,endRadius:w})=>!c.equals(l)||h!==w),a=(c,l,h)=>re(R.clamp((c-l)/(h-l),0,1));return{group:n,show(c){const l=R.lerp(.2,1,a(c,0,f?.52:.85)),h=a(c,.52,.77),w=a(c,.77,1);for(const{shape:M,from:v,to:B,startRadius:m,endRadius:p}of u)M.position.lerpVectors(v,B,w),M.scale.setScalar(l*R.lerp(m,p,h))}}}async function Jt(o){const e=o.querySelector(".modeling-stage"),t=e.querySelector("canvas"),i=o.querySelector("[data-model-title]"),n=o.querySelector("[data-model-detail]"),u=o.querySelector("[data-model-count]"),f=window.matchMedia("(prefers-reduced-motion: reduce)"),a=await Dt(),c=new ut({canvas:t,antialias:!0});c.setPixelRatio(Math.min(devicePixelRatio,1.75)),c.toneMapping=ft;const l=new pt,h=15594227,w=new ht(h),M=new mt(h,280,520);l.background=w,l.fog=M;const v=new wt(-90,90,65,-65,.1,1e3),B=new O(0,Ze,4),m=new gt(760,76,10334134,12175308);m.position.y=-.13,m.material.transparent=!0,m.material.opacity=.58;const p=new je(16773853,2.9);p.position.set(-90,140,110);const L=new je(12969471,1.35);L.position.set(75,15,-65),l.add(m,p,L,new vt(16777215,6715267,2.55));const G=new yt({color:12875851,roughness:.35,metalness:.25,polygonOffset:!0,polygonOffsetFactor:1}),C=new xt({color:4400409,transparent:!0,opacity:.32}),A={transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1},Q=new we({...A,color:18088,linewidth:2.6}),Y=new we({...A,color:16120319,linewidth:4.6,opacity:.88}),$=new St({...A,color:3771391,opacity:.34,side:bt}),q=new N,ge=new N;l.add(q,ge);let Z=!f.matches,ce=!0,ee=!1,z=0,te=0,ne=0,J=0,U=I[0].view,Pe=U,ke=B.y,x,H=!1,D;const Te=new Map,Ie=new Map,ve=new Map;function P(){!J&&ce&&!ee&&(J=requestAnimationFrame(st))}function ye(s,r=!1){Pe=U,ke=B.y,z=(s+I.length)%I.length;const d=I[z];if(te=r?d.duration*.75:0,ge.clear(),d.sketch){const g=ve.get(z)??Wt(z,Q,Y,$);ve.set(z,g),ge.add(g.group)}i.textContent=d.title,n.textContent=d.detail,u.textContent=`${String(z+1).padStart(2,"0")} / ${I.length}`,P()}function ie(s){Z=s,ne=0,P()}function Fe(){return f.matches?1:re(Math.min(1,te/480))}function Re(){return Je(Pe,I[z].view,Fe())}function le(s){const r=Lt(s),d=new Oe(r,G);return d.add(new Mt(new _t(r,32),C)),d}function nt(s){const r=Ht(a,s),d=r.before?le(r.before):new N,g=le(r.after),y=le(r.changed),j=new N;return j.add(d,g,y),{group:j,show(_){d.visible=_===0||!r.cut&&_<1,g.visible=_===1||r.cut&&_>0;const se=r.cut?Math.max(0,1-_*r.travel):_;y.visible=_>0&&_<1&&se>0,y.visible&&(y.scale.setComponent(r.axis,se),y.position.setComponent(r.axis,r.pivot*(1-se)))}}}function it(s){const r=I[z];let d;if(r.sweeps){const g=r.sweeps.findIndex(({until:se})=>s<=se),y=r.sweeps[g],j=g>0?r.sweeps[g-1].until:0,_=Ie.get(y.feature)??nt(y);Ie.set(y.feature,_),_.show(re((s-j)/(y.until-j))),d=_.group}else{const g=r.animated?Math.round(re(s)*Le):Le,y=`${z}:${g}`,j=Te.get(y);if(j)d=j;else{const _=r.model(g/Le);d=_.length?le(Ct(a,_)):new N,Te.set(y,d)}}q.children[0]!==d&&(q.clear(),q.add(d))}function st(s){if(J=0,!ce||ee)return;const r=ne?Math.min(55,s-ne):0;ne=s,Z&&!x&&!H&&!D&&(te+=r,te>=I[z].duration&&ye(z+1));const d=I[z],g=Math.min(1,te/(d.duration*.72));try{it(g)}catch(y){console.error("Could not build the modeling demo.",y),ee=!0,o.removeAttribute("data-live");return}if(ve.get(z)?.show(g),D){const y=f.matches?1:re(Math.min(1,(s-D.started)/560));U=Je(D.from,D.to,y),y>=1&&(D=void 0)}else!x&&!H&&(U=Re());B.y=R.lerp(ke,d.focusY??Ze,Fe()),v.position.setFromSphericalCoords(260,U[1],U[0]).add(B),v.lookAt(B),c.render(l,v),o.hasAttribute("data-live")||(o.dataset.live="true"),(Z||D)&&P()}const He=()=>{const{clientWidth:s,clientHeight:r}=e;if(!s||!r)return;c.setSize(s,r,!1);const d=s/r,g=Math.max(60,87/d);v.left=-g*d,v.right=g*d,v.top=g,v.bottom=-g,v.updateProjectionMatrix(),P()};new ResizeObserver(He).observe(e),"IntersectionObserver"in window&&new IntersectionObserver(([s])=>{ce=s.isIntersecting,ne=0,!ce&&J?(cancelAnimationFrame(J),J=0):P()}).observe(e),t.addEventListener("pointerdown",s=>{x||s.button!==0||(H=!1,D=void 0,x={id:s.pointerId,x:s.clientX,y:s.clientY,from:U,moved:!1},t.setPointerCapture(s.pointerId))}),t.addEventListener("pointermove",s=>{if(x?.id!==s.pointerId)return;const r=x.x-s.clientX,d=x.y-s.clientY;!x.moved&&Math.hypot(r,d)<$e||(x.moved=!0,e.dataset.dragging="true",U=[x.from[0]+R.clamp(r*.009,-Math.PI,Math.PI),R.clamp(x.from[1]+d*.009,.2,2.8)],P())});function xe(){D={from:U,to:Re(),started:performance.now()},P()}function Se(s){if(x?.id!==s.pointerId)return;const r=s.type==="pointerup"&&!x.moved&&Math.hypot(x.x-s.clientX,x.y-s.clientY)<$e;x=void 0,delete e.dataset.dragging,r?ie(!Z):xe()}t.addEventListener("pointerup",Se),t.addEventListener("pointercancel",Se),t.addEventListener("lostpointercapture",Se);const We={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,-.12],ArrowDown:[0,.12]},de=new Set;t.addEventListener("keydown",s=>{if(x)return;if(s.key===" "||s.key==="PageUp"||s.key==="PageDown"){if(s.preventDefault(),s.repeat||H)return;s.key===" "?ie(!Z):(D=void 0,ie(!1),ye(z+(s.key==="PageUp"?-1:1),!0));return}if(!Object.hasOwn(We,s.key))return;s.preventDefault(),de.add(s.key),H=!0,D=void 0;const[r,d]=We[s.key];U=[U[0]+r,R.clamp(U[1]+d,.2,2.8)],P()}),t.addEventListener("keyup",s=>{!de.delete(s.key)||de.size||!H||(H=!1,xe())}),t.addEventListener("blur",()=>{de.clear(),H&&(H=!1,xe())}),f.addEventListener("change",()=>{f.matches&&ie(!1)}),t.addEventListener("webglcontextlost",s=>{s.preventDefault(),ee=!0,o.removeAttribute("data-live")}),t.addEventListener("webglcontextrestored",()=>{ee=!1,P()}),Ot(s=>{w.setHex(s?Pt:h),M.color.copy(w),m.material.color.setHex(s?kt:16777215),Q.color.setHex(s?10209279:18088),Y.color.setHex(s?1321806:16120319),P()}),He(),ie(Z),ye(0)}export{Jt as startModelingDemo};
