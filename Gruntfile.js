module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      browserify: {
        files: ['Emitter.js'],
        tasks: ['browserify'],
      },
    },
    umd: {
      all: {
        options: {
          src: 'Emitter.js',
          dest: 'dist/Emitter.js',

          objectToExport: 'Emitter',
          amdModuleId: 'Emitter',
          globalAlias: 'Emitter',
        },
      },
    },
    shell: {
      'test.normal': {
        command: 'node test/node/index.js',
      },
      'test.mocha': {
        command: './node_modules/mocha/bin/mocha test/node/test.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-umd');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test:normal', ['shell:test.normal']);
  grunt.registerTask('test:mocha', ['shell:test.mocha']);
};
