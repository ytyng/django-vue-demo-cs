# django-vue-demo-cs
webpack front, django server


# 環境構築

Makefile 書いてます

    git clone git@github.com:ytyng/django-vue-demo-cs.git

    cd django-vue-demo-cs

    make server

途中でadminパスワードを聞かれるので適宜入力

    make client

サーバ起動

    make runserver

# 解説

factory-boy + faker でテストデータを1000件作っています

API は django-rest-framework で

単一ファイルコンポーネント(.vueファイル)でやってます

npm run watch で、ファイル修正をウォッチします

# タスク

## webpack-dev-server 追加

    cd webpack

    npm install --save-dev webpack-dev-server

dev server 設定を書く

webpack.config.js の上方に

    const backendTarget ='http://127.0.0.1:8000';

module.exports = { の中に

    devServer: {
      contentBase: 'dist/',
      proxy: {
        '/backend': {
          target: backendTarget,
          pathRewrite: {'^/backend': ''},
        },
        '/static': {
          target: backendTarget,
        },
        '/admin': {
          target: backendTarget,
        },
        '/product': {
          target: backendTarget,
        },
      }
    }

※ このようなアプローチもありそう

    devServer: {
      contentBase: 'dist/',
      proxy: {
        '/backend': {
          target: backendTarget,
          pathRewrite: {'^/backend': ''},
        },
        ...


package.json の scripts に追加 (カンマ注意)

    "devserver": "webpack-dev-server"

起動

    npm run devserver

vue ファイルを修正すると自動リロードされる!

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


