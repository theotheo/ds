const gulp = require('gulp');
const fs = require('fs');
const glob = require('glob');
const path = require("path");
const browserSync = require('browser-sync').create();
const asciidoctor = require('asciidoctor.js')();
const asciidoctorRevealjs = require('asciidoctor-reveal.js');
const plantuml = require('asciidoctor-plantuml');

asciidoctorRevealjs.register()
plantuml.register(asciidoctor.Extensions);


// Utility to create index file
gulp.task('buildIndex', function () {
    var fileList = '';
    const indexFile = '../docs/index.html';

	glob.sync('../docs/*.html').forEach(function (file) {
        console.log(file)
            if (file !== indexFile) {
                const basename = path.basename(file)
                fileList += '<li><a href="'+ basename +'">'+ basename +'</a></li>';
            }
	});

	fs.writeFileSync(indexFile, '<html><head></head><body><h3>Content</h3><ul>'+ fileList +'</ul></body></html>');
});

gulp.task('copy-img', function() {
    return gulp.src('../src/images/*')
      .pipe(gulp.dest('../docs/images'));
  });


// Convert the document 'presentation.adoc' using the reveal.js converter
gulp.task('reveal', () => {
    const attributes = {
        // revealjsdir: '../node_modules/reveal.js@',
        revealjsdir: 'reveal.js'
        //,'revealjs_history': true
        //,'revealjs_slideNumber': true
    };

    const options = {
        safe: 'unsafe', 
        backend: 'revealjs', 
        attributes: attributes,
        base_dir: '../src',
        to_dir: '../docs',
        mkdirs: true,
    };

	glob.sync('../src/*.adoc').forEach(function (file) {
        asciidoctor.convertFile(file, options);
	});
});

/**
 * Serve public folder and watch all changes
 */
gulp.task('serve', ['reveal', 'buildIndex', 'copy-img'], () => {
    browserSync.init({
        port: 8000,
        server: {
            baseDir: "../docs",
            index: "index.html"
        },
        browser: ['chrome'],
    });

    gulp.watch(['*.adoc', 'revealjs-plugins/*.js', '../src/**/*.adoc'], ['reveal', browserSync.reload]);
    gulp.watch(['../docs/*.html'], ['buildIndex']);
    gulp.watch(['../src/images/*'], ['copy-img']);
});

gulp.task('default', ['serve']);