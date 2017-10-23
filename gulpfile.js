const gulp = require('gulp');
const less = require('gulp-less');
const livereload = require('gulp-livereload');

gulp.task('less-css', ()=>{
	gulp.src('./public/styles/*.less')
		.pipe(less())
		.pipe(gulp.dest('./public/styles/'))
		.pipe(livereload());
})

gulp.task('watch', () =>{
	const server = livereload();
	gulp.watch(['./public/styles/*.less'], ['less-css']);
})

gulp.task('default', ['less-css', 'watch'])