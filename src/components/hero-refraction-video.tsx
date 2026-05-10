"use client"

import { useEffect, useRef } from "react"

/* ── GLSL ──────────────────────────────────────────────────────────────────
   Vertex: maps the full-screen quad to UVs where y=0 is at the top
   (matching CSS/video conventions without needing UNPACK_FLIP_Y).
   Fragment: pincushion barrel distortion inside the lens radius, plus a
   subtle rim highlight at the edge, then applies object-cover UV mapping.
────────────────────────────────────────────────────────────────────────── */
const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;
uniform sampler2D u_tex;
uniform vec2      u_mouse;        /* physical px, y from top */
uniform vec2      u_res;          /* canvas physical px      */
uniform float     u_radius;       /* physical px             */
uniform vec2      u_cover_scale;  /* object-cover UV scale   */
uniform vec2      u_cover_offset; /* object-cover UV offset  */
varying vec2 v_uv;

void main() {
  vec2 px    = v_uv * u_res;
  vec2 delta = px - u_mouse;
  float dist = length(delta);
  vec2 sampleUV = v_uv;

  if (dist < u_radius && u_radius > 0.5) {
    float t = dist / u_radius;
    /* smooth cubic falloff: full strength at centre, zero at edge — no hard boundary */
    float falloff = (1.0 - t * t) * (1.0 - t * t);
    float warp    = 1.0 - 0.38 * falloff;
    sampleUV = (u_mouse + delta * warp) / u_res;
  }

  /* object-cover mapping: screen UV → video texture UV */
  vec2 videoUV = sampleUV * u_cover_scale + u_cover_offset;
  vec4 colour  = texture2D(u_tex, clamp(videoUV, 0.001, 0.999));

  gl_FragColor = colour;
}
`

type Props = {
  src: string
  playbackRate?: number
}

export function HeroRefractionVideo({ src, playbackRate = 0.75 }: Props) {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0, y: 0, inside: false, r: 0 })

  /* playback rate -------------------------------------------------------- */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const apply = () => {
      video.defaultPlaybackRate = playbackRate
      video.playbackRate        = playbackRate
    }
    apply()
    video.addEventListener("loadedmetadata", apply)
    return () => video.removeEventListener("loadedmetadata", apply)
  }, [playbackRate])

  /* WebGL lens ------------------------------------------------------------ */
  useEffect(() => {
    const canvas = canvasRef.current
    const video  = videoRef.current
    if (!canvas || !video) return

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false })
    if (!gl) {
      /* no WebGL — reveal the original video and bail */
      video.style.visibility = "visible"
      return
    }

    /* compile & link */
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    /* full-screen quad */
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]),
      gl.STATIC_DRAW,
    )
    const posLoc = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    /* uniforms */
    const uMouse       = gl.getUniformLocation(prog, "u_mouse")
    const uRes         = gl.getUniformLocation(prog, "u_res")
    const uRadius      = gl.getUniformLocation(prog, "u_radius")
    const uCoverScale  = gl.getUniformLocation(prog, "u_cover_scale")
    const uCoverOffset = gl.getUniformLocation(prog, "u_cover_offset")

    /* video texture */
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,     gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T,     gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const TARGET_R_CSS = 170 /* lens radius in CSS pixels */
    let raf: number

    const loop = () => {
      if (video.readyState >= 2) {
        const dpr = Math.min(devicePixelRatio, 2)
        const cw  = Math.floor(canvas.clientWidth  * dpr)
        const ch  = Math.floor(canvas.clientHeight * dpr)
        if (canvas.width !== cw || canvas.height !== ch) {
          canvas.width  = cw
          canvas.height = ch
          gl.viewport(0, 0, cw, ch)
        }

        /* object-cover UV mapping */
        const vw      = video.videoWidth  || cw
        const vh      = video.videoHeight || ch
        const cAspect = cw / ch
        const vAspect = vw / vh
        let sx = 1, sy = 1, ox = 0, oy = 0
        if (cAspect > vAspect) {
          sy = vAspect / cAspect
          oy = (1 - sy) / 2
        } else {
          sx = cAspect / vAspect
          ox = (1 - sx) / 2
        }

        /* upload current video frame */
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)

        /* smooth lens radius */
        const m = mouseRef.current
        const targetR = m.inside ? TARGET_R_CSS * dpr : 0
        m.r += (targetR - m.r) * 0.09

        gl.uniform2f(uMouse,       m.x * dpr, m.y * dpr)
        gl.uniform2f(uRes,         cw, ch)
        gl.uniform1f(uRadius,      m.r)
        gl.uniform2f(uCoverScale,  sx, sy)
        gl.uniform2f(uCoverOffset, ox, oy)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    /* track mouse globally so the lens follows even over z-10 content */
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseRef.current.x      = x
      mouseRef.current.y      = y
      mouseRef.current.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
    }
    const onLeave = () => { mouseRef.current.inside = false }

    window.addEventListener("mousemove",     onMove)
    document.addEventListener("mouseleave",  onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove",    onMove)
      document.removeEventListener("mouseleave", onLeave)
      gl.deleteTexture(tex)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
    }
  }, [])

  return (
    <>
      {/* Video plays but is hidden — the canvas renders its frames */}
      <video
        ref={videoRef}
        style={{ visibility: "hidden" }}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* WebGL canvas: renders video + lens distortion, pointer-events-none
          so hero content (z-10) still receives clicks/hovers normally */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />
    </>
  )
}
