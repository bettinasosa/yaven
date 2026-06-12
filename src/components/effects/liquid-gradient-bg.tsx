"use client"

import { useEffect, useRef } from "react"

// ---------------------------------------------------------------------------
// TouchTexture — canvas-based trail that feeds into the shader as a texture
// ---------------------------------------------------------------------------
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

  constructor() {
    this.canvas = document.createElement("canvas")
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext("2d")!
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
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

// ---------------------------------------------------------------------------
// Shaders
// ---------------------------------------------------------------------------
const VERTEX = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT = `
  precision mediump float;

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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ]
}

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Shader compile error: ${gl.getShaderInfoLog(shader)}`)
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram {
  const program = gl.createProgram()!
  gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vs))
  gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`)
  }
  return program
}

// ---------------------------------------------------------------------------
// GradientApp — raw WebGL implementation
// ---------------------------------------------------------------------------
class GradientApp {
  private gl: WebGLRenderingContext
  private program: WebGLProgram
  private quadBuffer: WebGLBuffer
  private touchTex: WebGLTexture
  private touchTexture: TouchTexture
  private uTime = 0
  private lastNow = performance.now()
  private animationId: number | null = null
  private canvas: HTMLCanvasElement
  private container: HTMLElement
  private _eventRoot: HTMLElement
  private _onResize: () => void
  private _onMouseMove: (e: MouseEvent) => void
  private _onTouchMove: (e: TouchEvent) => void

  // Cached uniform locations
  private loc: Record<string, WebGLUniformLocation | null> = {}

  constructor(container: HTMLElement) {
    this.container = container

    // Create and style the canvas
    const canvas = document.createElement("canvas")
    canvas.style.display = "block"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.position = "absolute"
    canvas.style.inset = "0"
    canvas.style.zIndex = "0"
    canvas.style.pointerEvents = "none"
    container.appendChild(canvas)
    this.canvas = canvas

    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = container.clientWidth * dpr
    canvas.height = container.clientHeight * dpr

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false })
    if (!gl) throw new Error("WebGL not supported")
    this.gl = gl

    // Compile program
    this.program = createProgram(gl, VERTEX, FRAGMENT)
    gl.useProgram(this.program)

    // Cache uniform locations
    const uniformNames = [
      "uTime", "uSpeed", "uIntensity", "uGrainIntensity", "uGradientSize",
      "uColor1Weight", "uColor2Weight", "uResolution",
      "uColor1", "uColor2", "uColor3", "uColor4", "uColor5", "uColor6", "uBase",
      "uTouchTexture",
    ]
    for (const name of uniformNames) {
      this.loc[name] = gl.getUniformLocation(this.program, name)
    }

    // Full-screen quad in clip space: two triangles covering [-1,1]x[-1,1]
    const verts = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ])
    this.quadBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(this.program, "position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Touch texture (canvas → WebGL texture)
    this.touchTexture = new TouchTexture()
    this.touchTex = gl.createTexture()!
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.touchTex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.touchTexture.canvas)

    // Set static uniforms
    const w = container.clientWidth
    const h = container.clientHeight
    gl.uniform2f(this.loc["uResolution"], w, h)
    gl.uniform1f(this.loc["uSpeed"], 0.4)
    gl.uniform1f(this.loc["uIntensity"], 1.0)
    gl.uniform1f(this.loc["uGrainIntensity"], 0.06)
    gl.uniform1f(this.loc["uGradientSize"], 0.45)
    gl.uniform1f(this.loc["uColor1Weight"], 1.8)
    gl.uniform1f(this.loc["uColor2Weight"], 0.5)
    gl.uniform3fv(this.loc["uColor1"], hexToRgb("#267FE5"))
    gl.uniform3fv(this.loc["uColor2"], hexToRgb("#267FE5"))
    gl.uniform3fv(this.loc["uColor3"], hexToRgb("#4da3f0"))
    gl.uniform3fv(this.loc["uColor4"], hexToRgb("#7b8fd4"))
    gl.uniform3fv(this.loc["uColor5"], hexToRgb("#9e8ec8"))
    gl.uniform3fv(this.loc["uColor6"], hexToRgb("#c8897a"))
    gl.uniform3fv(this.loc["uBase"],   hexToRgb("#267FE5"))
    gl.uniform1i(this.loc["uTouchTexture"], 0)

    // Clear to base color so there's no flash before first frame
    gl.clearColor(...hexToRgb("#267FE5"), 1)

    // Event listeners
    const root = container.parentElement ?? container
    this._eventRoot = root

    this._onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      this.touchTexture.addTouch({
        x: (e.clientX - rect.left) / container.clientWidth,
        y: 1 - (e.clientY - rect.top) / container.clientHeight,
      })
    }
    this._onTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect()
      this.touchTexture.addTouch({
        x: (e.touches[0].clientX - rect.left) / container.clientWidth,
        y: 1 - (e.touches[0].clientY - rect.top) / container.clientHeight,
      })
    }
    root.addEventListener("mousemove", this._onMouseMove)
    root.addEventListener("touchmove", this._onTouchMove)

    this._onResize = () => {
      const dpr2 = Math.min(window.devicePixelRatio, 2)
      canvas.width = container.clientWidth * dpr2
      canvas.height = container.clientHeight * dpr2
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(this.loc["uResolution"], container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", this._onResize)

    gl.viewport(0, 0, canvas.width, canvas.height)
    this.tick()
  }

  private tick = () => {
    const now = performance.now()
    const delta = Math.min((now - this.lastNow) / 1000, 0.1)
    this.lastNow = now

    this.touchTexture.update()

    const gl = this.gl
    // Upload updated touch canvas to texture
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.touchTex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.touchTexture.canvas)

    this.uTime += delta
    gl.uniform1f(this.loc["uTime"], this.uTime)

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    this.animationId = requestAnimationFrame(this.tick)
  }

  cleanup() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId)
    this.animationId = null

    window.removeEventListener("resize", this._onResize)
    this._eventRoot.removeEventListener("mousemove", this._onMouseMove)
    this._eventRoot.removeEventListener("touchmove", this._onTouchMove)

    const gl = this.gl
    gl.deleteTexture(this.touchTex)
    gl.deleteBuffer(this.quadBuffer)
    gl.deleteProgram(this.program)

    const ext = gl.getExtension("WEBGL_lose_context")
    if (ext) ext.loseContext()

    if (this.container.contains(this.canvas)) {
      this.container.removeChild(this.canvas)
    }
  }
}

// ---------------------------------------------------------------------------
// React component
// ---------------------------------------------------------------------------
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
        pointerEvents: "none",
      }}
    />
  )
}
