# django-vue-demo-cs
webpack front, django server


# 環境構築

./run-client-server.sh で、環境構築と起動をします。




# 解説

./run-client-server.sh の中でやってることは、

Django 環境の作成: make server

Webpack 環境の作成: make client

factory-boy + faker でテストデータを1000件作っています

API は django-rest-framework で

単一ファイルコンポーネント(.vueファイル)でやってます

# タスク

## Vuex を適用

書き中

    const productModule = {
      namespaced: true,
      state: {
        products: [],
        page: {},
        pagenator: {},
        q: '',
      },
      mutations: {
        setProducts(state, {products}) {
          state.products = products;
        },

      },
      actions: {

        updateListPage({state, commit}, {page = 1, q=null}) {
          commit('setProducts', {products: []});

          let url = `${state.apiPrefix}/list/?p=${page}`;
          if (q) {
            url += `&q=${q}`;
          }
          commit('setSearching', true);
          fetch(url)
            .then(response => {
              return response.json();
            }).then(data => {
            commit('setResponse', {
              products: data.page.object_list,
              page: data.page,
              paginator: data.paginator,
            });
            commit('setSearching', false);

          });

        },
        navigateListPage({commit}, {page = 1}) {
          commit('setProducts', {products: []});
        },

        search({commit, dispatch}, {q = ''}) {
          console.log(`search: ${q}`);
          commit('setQ', q);
          dispatch('updateListPage', {page:1});
        },
      }

    };

    const store = new Vuex.Store({
      modules: {
        productModule
      },
    });


    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

    created() {
      if (!this.products.length) {
        this.updateListPage({
          page: this.$route.query.p,
          q: this.$route.query.q
        });
      }
    },
    computed: {
      ...mapState('productsModule', {
        products: state => state.products,
        searching: state => state.searching,
      })
    },
    methods: {
      ...mapActions('productsModule', {
        updateListPage: 'updateListPage'
      }),
    },


