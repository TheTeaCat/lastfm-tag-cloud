module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import '@/assets/scss/reset.scss';
        @import "@/assets/scss/_vars.scss";
        @import "@/assets/scss/style.scss";        
        `
      }
    }
  },
};