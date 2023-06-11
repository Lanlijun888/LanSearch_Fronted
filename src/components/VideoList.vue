<template>
  <div id="videoList">
    <a-list
      item-layout="horizontal"
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }"
      :data-source="props.videoList"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable>
            <template #cover>
              <img :src="item.pic" referrerpolicy="no-referrer" />
            </template>
            <p v-bind:style="{ fontWeight: 'bold' }">up：{{ item.author }}</p>
            <a :href="item.arcurl" target="_blank">
              <a-card-meta
                :title="item.title"
                v-html="item.title"
                class="title"
              />
            </a>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  videoList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  videoList: () => [],
});
</script>

<style scoped>
.title {
  color: black;
}
.keyword {
  color: rebeccapurple;
}
</style>
