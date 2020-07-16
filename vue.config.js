module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        additionalData: `
        @import '@/assets/scss/reset.scss';
        @import "@/assets/scss/_vars.scss";
        @import "@/assets/scss/style.scss";        
        `
      }
    }
  },
};