<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item class="justify-center">
          <v-list-item-avatar size="88">
            <v-img src="/Drupal.png" />
          </v-list-item-avatar>
        </v-list-item>

        <v-list-group>
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="text-h5 pb-1">
                Legend
              </v-list-item-title>
              <v-list-item-subtitle>me@liux.pro</v-list-item-subtitle>
            </v-list-item-content>
          </template>
          <div class="ml-5 text--primary ">
            <v-icon class="pr-1" size="12">
              mdi-map-marker-outline
            </v-icon><span class="">Beijing,China</span><br>
          </div>
        </v-list-group>
      </v-list>
      <v-divider />

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      inset
      app
      class="hidden-md-and-down"
    >
      <span>liux.pro &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-book-open-outline',
          title: 'editor',
          to: '/editor'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
<style>
html{
  overflow: hidden;
}
.container {
  padding: 0;
}
</style>
