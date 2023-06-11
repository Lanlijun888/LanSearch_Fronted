<template>
  <a-list item-layout="horizontal" :data-source="props.postList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta>
          {{ item }}
          <template #title>
            <a href="https://www.antdv.com/">
              <span v-html="item.title"></span>
            </a>
          </template>
          <template #avatar>
            <a-avatar :src="ikun" />
          </template>
          <template #description>
            <p v-html="item.content" style="color: black"></p>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import ikun from "../assets/ikun.png";
import { withDefaults, defineProps } from "vue";
interface Props {
  postList: any[];
}
const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});
</script>

<style scoped></style>
