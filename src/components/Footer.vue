<template lang="pug">
    footer.text-center.bg-body-tertiary
      //- Grid container
      div
        //- Section: Social media
        section
          //- Facebook
          a.btn.btn-link.btn-floating.btn-lg.text-body.m-1(
            href="#!"
            role="button"
            data-mdb-ripple-init
            data-mdb-ripple-color="dark"
          )
            i.fab.fa-facebook-f
          //- Twitter
          a.btn.btn-link.btn-floating.btn-lg.text-body.m-1(
            href="#!"
            role="button"
            data-mdb-ripple-init
            data-mdb-ripple-color="dark"
          )
            i.fab.fa-twitter
          //- Google
          a.btn.btn-link.btn-floating.btn-lg.text-body.m-1(
            href="#!"
            role="button"
            data-mdb-ripple-init
            data-mdb-ripple-color="dark"
          )
            i.fab.fa-google
          //- Instagram
          a.btn.btn-link.btn-floating.btn-lg.text-body.m-1(
            href="#!"
            role="button"
            data-mdb-ripple-init
            data-mdb-ripple-color="dark"
          )
            i.fab.fa-instagram
          //- Linkedin
          a.btn.btn-link.btn-floating.btn-lg.text-body.m-1(
            href="#!"
            role="button"
            data-mdb-ripple-init
            data-mdb-ripple-color="dark"
          )
            i.fab.fa-linkedin
          //- Github
          a.btn.btn-link.btn-floating.btn-lg.text-body.m-1(
            href="#!"
            role="button"
            data-mdb-ripple-init
            data-mdb-ripple-color="dark"
          )
            i.fab.fa-github
      //- Copyright
      div.text-center.p-2(style="background-color: rgba(0, 0, 0, 0.05)")
        | © 2020 Copyright:
        a.text-body(href="https://mdbootstrap.com/") MDBootstrap.com
    </template>
<script>
export default {
  name: "AppFooter",
  data() {
    return {
      // Define any data properties you need here
    };
  },
  methods: {
    // Define any methods you need here
  },
};
</script>
<style scoped>
footer {
  position: fixed;
  height: 120px;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa;
  padding: 1rem 0;
}
</style>
