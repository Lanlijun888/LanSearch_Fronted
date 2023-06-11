<template>
  <div id="userList">
    <a-list
      item-layout="horizontal"
      :data-source="props.userList"
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable style="width: 200px">
            <template #cover>
              <img alt="example" :src="item.userAvatar" />
            </template>
            <a-card-meta :title="item.userName">
              <template #description>{{ item.userProfile }}</template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import ikun from "../assets/ikun.png";
import { withDefaults, defineProps } from "vue";
interface Props {
  userList: any[];
}
const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>

<style scoped></style>
