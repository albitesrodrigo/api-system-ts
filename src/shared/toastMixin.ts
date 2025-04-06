import Vue from "vue";

export default {
    methods: {
        makeToast(this: Vue, titulo: string, texto: string, tipo: string) {
            this.$bvToast.toast(texto, {
                title: titulo,
                autoHideDelay: 5000,
                variant: tipo,
            });
        },
    },
};