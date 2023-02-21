function _gfxdrivername() {
  const gl = document.createElement("canvas").getContext("webgl");
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
}
