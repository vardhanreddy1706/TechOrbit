'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

function StudioLighting() {
  const {gl,scene,invalidate}=useThree();
  useEffect(()=>{
    const pmrem=new THREE.PMREMGenerator(gl);
    const room=new RoomEnvironment();
    const target=pmrem.fromScene(room,.025);
    scene.environment=target.texture;
    invalidate();
    return()=>{scene.environment=null;target.dispose();room.dispose();pmrem.dispose();};
  },[gl,scene,invalidate]);
  return null;
}
function Sculpture({paused}:{paused:boolean}) {
  const group=useRef<THREE.Group>(null);
  const satellite=useRef<THREE.Mesh>(null);
  const time=useRef(0);
  useFrame(({pointer},delta)=>{
    if(paused||!group.current)return;
    time.current+=Math.min(delta,.05);
    const t=time.current;
    group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,t*.065+pointer.x*.2,2.5,delta);
    group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,.2+pointer.y*.13,2.5,delta);
    if(satellite.current)satellite.current.position.set(Math.cos(t*.28)*2.35,Math.sin(t*.28)*1.2,Math.sin(t*.28)*1.55);
  });
  return <>
    <StudioLighting/>
    <ambientLight intensity={.3}/>
    <directionalLight position={[3,5,4]} intensity={3} color="#e2eaff"/>
    <pointLight position={[-3,0,2]} intensity={18} color="#8B5CF6"/>
    <pointLight position={[3,-1,-1]} intensity={24} color="#1769FF"/>
    <group ref={group} rotation={[.2,.1,-.32]}>
      <mesh><sphereGeometry args={[.83,48,48]}/><meshPhysicalMaterial color="#204590" metalness={.88} roughness={.22} clearcoat={1} envMapIntensity={1.1}/></mesh>
      <group rotation={[.65,.2,.18]}><mesh><torusGeometry args={[1.62,.1,20,144]}/><meshPhysicalMaterial color="#a9b8d6" metalness={1} roughness={.22} clearcoat={1} envMapIntensity={1.1}/></mesh></group>
      <group rotation={[1.17,.81,.44]}><mesh><torusGeometry args={[1.99,.035,12,144]}/><meshPhysicalMaterial color="#7f9fef" metalness={.85} roughness={.22} envMapIntensity={1.3}/></mesh></group>
      <group rotation={[-.62,.75,-.3]}><mesh><torusGeometry args={[2.19,.027,12,144]}/><meshPhysicalMaterial color="#9e8fe9" metalness={.75} roughness={.21} envMapIntensity={1.2}/></mesh></group>
      <mesh ref={satellite} position={[2.35,0,.5]}><sphereGeometry args={[.15,24,24]}/><meshPhysicalMaterial color="#bac9e8" metalness={1} roughness={.2}/></mesh>
      <mesh position={[-1.7,1.5,.5]} rotation={[.5,.4,.6]}><octahedronGeometry args={[.12]}/><meshPhysicalMaterial color="#888edb" metalness={.65} roughness={.22}/></mesh>
    </group>
  </>;
}
export default function OrbitScene({paused,onReady,onLost}:{paused:boolean;onReady:()=>void;onLost:()=>void}) {
  return <Canvas onCreated={({gl})=>{onReady();gl.domElement.addEventListener('webglcontextlost',onLost,{once:true});}} dpr={[1,1.5]} camera={{position:[0,0,7.2],fov:42}} frameloop={paused?'demand':'always'} gl={{antialias:true,alpha:true,powerPreference:'low-power'}}><Sculpture paused={paused}/></Canvas>;
}
