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

vuex 用のJSファイルを作成

webpack/src の中、index.js の並びに store.js を作成。

まずはスケルトン

    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    const store = new Vuex.Store({
      state: {
        // state には変数を格納
        count: 0,
      },
      mutations: {
        // mutations は、stateを変更させる同期メソッドを書く
        // 非同期処理は書いてはいけない
        // mutation をコールするオブジェクトは「commit」
        // mutation をコミットする以外の方法で
        // state を変化させてはいけない
        addCounter(state, n) {
          state.count = state.count + n;
        },
      },
      actions: {
        // actions には好きなようにメソッドを書く
        // actions をコールするオブジェクトは「dispatch」
        incrementCounter({commit}) {
          // 引数1を含めて addCounter ミューテーションをコミットする
          commit('addCounter', 1);
        }
      }
    });

    export default store;

index.js を修正して、store を注入

    import Vue from 'vue';
    import router from './router.js';
    import app from './app.vue';
    import store from './store.js';

    new Vue({
      el: '#app',
      render: h => h(app),
      router,
      store,
    });



components に、global-counter-button.vue を作る

    <template>
      <div>
        <button @click="incrementCounter()">{{ count }}</button>
      </div>
    </template>

    <script>
      import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

      export default {
        name: 'global-counter-button',
        methods:{
          ...mapActions( {
            incrementCounter: 'incrementCounter'
          }),

        },
        computed: {
          ...mapState({
            count: state => state.count,
          })
        },
      }
    </script>

list.vue を修正して、global-counter-button を使ってみる

    <script>
      import globalCounterButton from './global-counter-button.vue';

      export default {
        components: {
          globalCounterButton,
        },

detail.vue にも global-counter-button を入れてみる


store は階層化できます


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


