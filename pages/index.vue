<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      />

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      />
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fill-height>
        <v-row align="center">
          <v-col cols="12" sm="2">
            <v-card class="mx-auto">
              prova
            </v-card>
          </v-col>

          <v-col cols="12" sm="8">
            <v-card elevation="16" outlined class="mx-auto pa-1" max-height="500" max-width="500">
              <QrScanner />
            </v-card>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ['Dashboard', 'Messages', 'Profile', 'Updates']
  })
}
</script>
