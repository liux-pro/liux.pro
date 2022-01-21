import path from 'path'
import fse from 'fs-extra'
// 复制vditor的静态文件到静态文件夹
// 用到vditor编辑器时候吧cdn设置成本地，让他脱离jsDeliver运行
export default function () {
  console.log('\x1B[32m', 'vditor patch plugin loaded')
  this.nuxt.hook('build:before', (builder) => {
    try {
      fse.removeSync(path.join(builder.nuxt.options.alias.static, 'vditor'))
      fse.copySync(path.join(path.dirname(require.resolve('vditor')), 'css'), path.join(builder.nuxt.options.alias.static, 'vditor', 'dist', 'css'))
      fse.copySync(path.join(path.dirname(require.resolve('vditor')), 'js'), path.join(builder.nuxt.options.alias.static, 'vditor', 'dist', 'js'))
      fse.copySync(path.join(path.dirname(require.resolve('vditor')), 'images'), path.join(builder.nuxt.options.alias.static, 'vditor', 'dist', 'images'))
      console.log('\x1B[32m', 'copy vditor dist success!')
    } catch (err) {
      throw new Error('copy vditor dist fail')
    }
  })
}
