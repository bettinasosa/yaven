"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

class TouchTexture {
  size = 64
  width = 64
  height = 64
  maxAge = 64
  radius = 0.1
  speed = 1 / 64
  trail: {
    x: number
    y: number
    age: number
    force: number
    vx: number
    vy: number
  }[] = []
  last: { x: number; y: number } | null = null
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  texture: THREE.Texture

  constructor() {
    this.canvas = document.createElement("canvas")
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext("2d")!
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.texture = new THREE.Texture(this.canvas)
  }

  update() {
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i]
      const f = p.force * this.speed * (1 - p.age / this.maxAge)
      p.x += p.vx * f
      p.y += p.vy * f
      p.age++
      if (p.age > this.maxAge) this.trail.splice(i, 1)
      else this.drawPoint(p)
    }
    this.texture.needsUpdate = true
  }

  addTouch(point: { x: number; y: number }) {
    let force = 0,
      vx = 0,
      vy = 0
    if (this.last) {
      const dx = point.x - this.last.x,
        dy = point.y - this.last.y
      if (dx === 0 && dy === 0) return
      const d = Math.sqrt(dx * dx + dy * dy)
      vx = dx / d
      vy = dy / d
      force = Math.min((dx * dx + dy * dy) * 20000, 2.0)
    }
    this.last = { x: point.x, y: point.y }
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy })
  }

  drawPoint(p: (typeof this.trail)[number]) {
    const pos = { x: p.x * this.width, y: (1 - p.y) * this.height }
    let intensity =
      p.age < this.maxAge * 0.3
        ? Math.sin((p.age / (this.maxAge * 0.3)) * (Math.PI / 2))
        : -(
            (1 - (p.age - this.maxAge * 0.3) / (this.maxAge * 0.7)) *
            ((1 - (p.age - this.maxAge * 0.3) / (this.maxAge * 0.7)) - 2)
          )
    intensity *= p.force
    const color = `${((p.vx + 1) / 2) * 255}, ${((p.vy + 1) / 2) * 255}, ${intensity * 255}`
    const radius = this.radius * this.width
    this.ctx.shadowOffsetX = this.size * 5
    this.ctx.shadowOffsetY = this.size * 5
    this.ctx.shadowBlur = radius
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`
    this.ctx.beginPath()
    this.ctx.fillStyle = "rgba(255,0,0,1)"
    this.ctx.arc(
      pos.x - this.size * 5,
      pos.y - this.size * 5,
      radius,
      0,
      Math.PI * 2
    )
    this.ctx.fill()
  }
}

const VERTEX = `varying vec2 vUv; void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); vUv = uv; }`

const FRAGMENT = `
  uniform float uTime, uSpeed, uIntensity, uGrainIntensity, uGradientSize, uColor1Weight, uColor2Weight;
  uniform vec2 uResolution;
  uniform vec3 uColor1, uColor2, uColor3, uColor4, uColor5, uColor6, uBase;
  uniform sampler2D uTouchTexture;
  varying vec2 vUv;

  float grain(vec2 uv, float t) {
    return fract(sin(dot(uv * uResolution * 0.5 + t, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
  }

  vec3 getGradientColor(vec2 uv, float time) {
    // Blob A — orbits around left-center (0.3, 0.5)
    vec2 anchorA = vec2(0.3, 0.5);
    vec2 c1 = anchorA + vec2(sin(time * uSpeed * 0.4) * 0.22, cos(time * uSpeed * 0.5) * 0.25);
    vec2 c2 = anchorA + vec2(cos(time * uSpeed * 0.55) * 0.18, sin(time * uSpeed * 0.4) * 0.2);
    vec2 c3 = anchorA + vec2(sin(time * uSpeed * 0.35) * 0.2, cos(time * uSpeed * 0.6) * 0.22);

    // Blob B — orbits around right-center (0.7, 0.5)
    vec2 anchorB = vec2(0.7, 0.5);
    vec2 c4 = anchorB + vec2(cos(time * uSpeed * 0.45) * 0.22, sin(time * uSpeed * 0.5) * 0.25);
    vec2 c5 = anchorB + vec2(sin(time * uSpeed * 0.6) * 0.18, cos(time * uSpeed * 0.45) * 0.2);
    vec2 c6 = anchorB + vec2(cos(time * uSpeed * 0.35) * 0.2, sin(time * uSpeed * 0.55) * 0.22);

    float i1 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c1));
    float i2 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c2));
    float i3 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c3));
    float i4 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c4));
    float i5 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c5));
    float i6 = 1.0 - smoothstep(0.0, uGradientSize, length(uv - c6));

    vec3 color = vec3(0.0);
    color += uColor1 * i1 * (0.6 + 0.4 * sin(time * uSpeed)) * uColor1Weight;
    color += uColor2 * i2 * (0.6 + 0.4 * cos(time * uSpeed * 1.2)) * uColor2Weight;
    color += uColor3 * i3 * (0.6 + 0.4 * sin(time * uSpeed * 0.8)) * uColor1Weight;
    color += uColor4 * i4 * (0.6 + 0.4 * cos(time * uSpeed * 1.3)) * uColor2Weight;
    color += uColor5 * i5 * (0.6 + 0.4 * sin(time * uSpeed * 1.1)) * uColor1Weight;
    color += uColor6 * i6 * (0.6 + 0.4 * cos(time * uSpeed * 0.9)) * uColor2Weight;

    color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(lum), color, 1.15);
    color = pow(color, vec3(1.05));
    float brightness = length(color);
    // Strong pull toward primary blue base
    color = mix(uBase, color, clamp(brightness * 0.55, 0.05, 0.4));

    return color;
  }

  void main() {
    vec2 uv = vUv;
    vec4 touchTex = texture2D(uTouchTexture, uv);
    uv.x -= (touchTex.r * 2.0 - 1.0) * 0.8 * touchTex.b;
    uv.y -= (touchTex.g * 2.0 - 1.0) * 0.8 * touchTex.b;
    vec2 center = vec2(0.5);
    float dist = length(uv - center);
    float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * touchTex.b;
    uv += vec2(ripple);
    vec3 color = getGradientColor(uv, uTime);
    color += grain(uv, uTime) * uGrainIntensity;
    color = clamp(color, uBase * 0.9, uBase * 1.35);
    gl_FragColor = vec4(color, 1.0);
  }
`

// Primary blue palette
function hexToVec3(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return new THREE.Vector3(r, g, b)
}

class GradientApp {
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  clock: THREE.Clock
  touchTexture: TouchTexture
  uniforms: Record<string, { value: unknown }>
  mesh: THREE.Mesh | null = null
  animationId: number | null = null
  container: HTMLElement

  constructor(container: HTMLElement) {
    this.container = container
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.domElement.style.display = "block"
    this.renderer.domElement.style.width = "100%"
    this.renderer.domElement.style.height = "100%"
    this.renderer.domElement.style.position = "absolute"
    this.renderer.domElement.style.inset = "0"
    this.renderer.domElement.style.zIndex = "0"
    this.renderer.domElement.style.pointerEvents = "none"
    container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      10000
    )
    this.camera.position.z = 50

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color("#267FE5")

    this.clock = new THREE.Clock()
    this.touchTexture = new TouchTexture()

    this.uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          container.clientWidth,
          container.clientHeight
        )
      },
      uColor1: { value: hexToVec3("#267FE5") }, // primary blue
      uColor2: { value: hexToVec3("#267FE5") }, // primary blue
      uColor3: { value: hexToVec3("#4da3f0") }, // brighter sky blue
      uColor4: { value: hexToVec3("#7b8fd4") }, // brighter steel violet
      uColor5: { value: hexToVec3("#9e8ec8") }, // brighter lavender
      uColor6: { value: hexToVec3("#c8897a") }, // brighter warm coral
      uBase: { value: hexToVec3("#267FE5") },
      uSpeed: { value: 0.4 },
      uIntensity: { value: 1.0 },
      uTouchTexture: { value: this.touchTexture.texture },
      uGrainIntensity: { value: 0.06 },
      uGradientSize: { value: 0.45 },
      uColor1Weight: { value: 1.8 },
      uColor2Weight: { value: 0.5 }
    }

    this.init()
  }

  getViewSize() {
    const fov = (this.camera.fov * Math.PI) / 180
    const height = Math.abs(this.camera.position.z * Math.tan(fov / 2) * 2)
    return { width: height * this.camera.aspect, height }
  }

  init() {
    const viewSize = this.getViewSize()
    const geometry = new THREE.PlaneGeometry(
      viewSize.width,
      viewSize.height,
      1,
      1
    )
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    // Mouse/touch tracking — listen on the parent section so content doesn't block events
    const root = this.container.parentElement ?? this.container
    const c = this.container
    const onMove = (x: number, y: number) => {
      this.touchTexture.addTouch({ x: x / c.clientWidth, y: 1 - y / c.clientHeight })
    }
    root.addEventListener("mousemove", (e) => {
      const rect = c.getBoundingClientRect()
      onMove(e.clientX - rect.left, e.clientY - rect.top)
    })
    root.addEventListener("touchmove", (e) => {
      const rect = c.getBoundingClientRect()
      onMove(
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top
      )
    })

    const onResize = () => {
      this.camera.aspect = c.clientWidth / c.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(c.clientWidth, c.clientHeight)
      const vs = this.getViewSize()
      if (this.mesh) {
        this.mesh.geometry.dispose()
        this.mesh.geometry = new THREE.PlaneGeometry(vs.width, vs.height, 1, 1)
      }
      ;(this.uniforms.uResolution.value as THREE.Vector2).set(
        c.clientWidth,
        c.clientHeight
      )
    }
    window.addEventListener("resize", onResize)

    this.tick()
  }

  tick() {
    const delta = Math.min(this.clock.getDelta(), 0.1)
    this.touchTexture.update()
    ;(this.uniforms.uTime.value as number) += delta
    this.renderer.render(this.scene, this.camera)
    this.animationId = requestAnimationFrame(() => this.tick())
  }

  cleanup() {
    if (this.animationId) cancelAnimationFrame(this.animationId)
    this.renderer.dispose()
    if (
      this.container &&
      this.renderer.domElement &&
      this.container.contains(this.renderer.domElement)
    ) {
      this.container.removeChild(this.renderer.domElement)
    }
  }
}

export function LiquidGradientBg() {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<GradientApp | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (appRef.current) appRef.current.cleanup()
    appRef.current = new GradientApp(container)
    return () => {
      if (appRef.current) appRef.current.cleanup()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  )
}
