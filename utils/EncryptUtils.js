// https://github.com/java-crypto/cross_platform_crypto/blob/main/GenerateSha256Base64Hex/generatesha256base64hex.html
export async function sha256 (str) {
  // Get the string as arraybuffer.
  const buffer = new TextEncoder('utf-8').encode(str)
  const arrayBuffer = await crypto.subtle.digest('SHA-256', buffer)
  return hex(arrayBuffer)
}

export function hex (buffer) {
  let digest = ''
  const view = new DataView(buffer)
  for (let i = 0; i < view.byteLength; i += 4) {
    // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
    const value = view.getUint32(i)
    // toString(16) will transform the integer into the corresponding hex string
    // but will remove any initial "0"
    const stringValue = value.toString(16)
    // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
    // chars for Uint16 and 2 chars for Uint8)
    const padding = '00000000'
    const paddedValue = (padding + stringValue).slice(-padding.length)
    digest += paddedValue
  }
  return digest
}
