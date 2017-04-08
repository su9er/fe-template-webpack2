/**
 * Created by su9er on 17/3/25.
 */

import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import scss from 'gulp-sass'
import buffer from 'vinyl-buffer'
import spritesmith from 'gulp.spritesmith'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'

const spritesPath = path.join(__dirname, 'src/assets/sprites') // 雪碧图总目录
const cssPath = path.join(__dirname, 'src/assets/css')
const spritesArray = []

/*
*
* collectSpritesTask
*
* */
(function(dir) {
  let filesList = []
  fs.readdirSync(dir).forEach(name => {
    const spritesFile = path.join(spritesPath, `${name}`) // 雪碧图子目录
    const stats = fs.lstatSync(spritesFile)
    if (stats.isFile() && /png$/.test(name)) {
      filesList.push(spritesFile)
    } else if (stats.isDirectory() && fs.readdirSync(spritesFile).length) {
      const gulpTask = `sprites:${name}`
      spritesArray.push(gulpTask)
      gulp.task(gulpTask, () => {
        const spritesData = gulp.src(path.join(spritesFile, '*.png'))
          .pipe(spritesmith({
            imgName: `${name}_icon.png`,
            imgPath: `/img/${name}_icon.png`,
            cssName: `_${name}_icon.scss`
          }))
        spritesData.css
          .pipe(gulp.dest(cssPath)) // 雪碧图定位scss文件输出目录
        spritesData.img
          .pipe(buffer())
          .pipe(imagemin({
            optimizationLevel: 7, // 类型: Number 默认: 3 取值范围: 0-7(优化登记)
            use: [pngquant()] // 使用pngquant深度压缩png图片的imagemin插件
          }))
          .pipe(gulp.dest(path.join(__dirname, 'static/img')))
      })
    }
  })
  if (filesList.length) {
    gulp.task('sprites:app', () => {
      let spritesData = gulp.src(path.join(spritesPath, '*.png'))
        .pipe(spritesmith({
          imgName: 'app_icon.png',
          imgPath: '/img/app_icon.png',
          cssName: '_app_icon.scss'
        }))
      spritesData.css
        .pipe(gulp.dest(cssPath)) // 雪碧图定位scss文件输出目录
      spritesData.img
        .pipe(buffer())
        .pipe(imagemin({
          optimizationLevel: 7, // 类型: Number 默认: 3 取值范围: 0-7(优化登记)
          use: [pngquant()] // 使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest(path.join(__dirname, 'static/img')))
    })
  }
})(spritesPath)

gulp.task('sprites', spritesArray)

/*
*
* scss:single 不依赖雪碧图合并
*
* */
gulp.task('scss:single', () => {
  gulp.src(path.join(cssPath, '*.scss'))
    .pipe(scss({
      outputStyle: 'compressed'
    })).on('error', scss.logError)
    .pipe(gulp.dest(path.join(__dirname, 'static/css')))
})

gulp.task('scss', ['sprites'], () => {
  gulp.src(path.join(cssPath, '*.scss'))
    .pipe(scss({
      outputStyle: 'compressed'
    })).on('error', scss.logError)
    .pipe(gulp.dest(path.join(__dirname, 'static/css')))
})

gulp.task('img', () => {
  gulp.src(path.join(__dirname, 'src/assets/img/*.png'))
    .pipe(buffer())
    .pipe(imagemin({
      optimizationLevel: 7, // 类型: Number 默认: 3 取值范围: 0-7(优化登记)
      use: [pngquant()] // 使用pngquant深度压缩png图片的imagemin插件
    }))
    .pipe(gulp.dest(path.join(__dirname, 'static/img/')))
})

gulp.task('default', ['sprites', 'scss', 'img']);
