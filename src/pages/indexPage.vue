<template>
  <div class="indexPage">
    <a-input-search
      v-model:value="searchText"
      placeholder="请输入搜索关键词"
      enter-button
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <post-list :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片" force-render>
        <image-list :picture-list="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <user-list :user-list="userList" />
      </a-tab-pane>
      <a-tab-pane key="video" tab="视频">
        <video-list :video-list="videoList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import ImageList from "@/components/ImageList.vue";
import VideoList from "@/components/VideoList.vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";

const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);
const videoList = ref([]);
const route = useRoute();
const router = useRouter();
const activeKey = route.params.category;
const searchText = ref(route.query.text || "");
const initSearchParams = {
  type: activeKey,
  text: "",
  pageSize: 20,
  pageNum: 1,
};

const loadDataOld = (params: any) => {
  const postQuery = {
    ...params,
    searchText: params.text,
  };
  const userQuery = {
    ...params,
    userName: params.text,
  };
  const pictureQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/post/list/page/vo", postQuery).then((res: any) => {
    postList.value = res.records;
  });

  myAxios.post("/user/list/page/vo", userQuery).then((res: any) => {
    userList.value = res.records;
  });

  myAxios.post("/picture/list/page/vo", pictureQuery).then((res: any) => {
    pictureList.value = res.records;
  });
};

/**
 * 加载聚合数据
 * @param params
 */
const loadData = (params: any) => {
  const { type } = params;
  // eslint-disable-next-line no-empty
  if (!type) {
    message.error("请求类别为空");
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("search/all", query).then((res: any) => {
    // eslint-disable-next-line no-empty
    if (type === "post") {
      postList.value = res.dataList;
    } else if (type === "user") {
      userList.value = res.dataList;
    } else if (type === "picture") {
      pictureList.value = res.dataList;
    } else if (type === "video") {
      videoList.value = res.dataList;
    }
  });
};

const searchParams = ref(initSearchParams);

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    type: route.params.category,
  } as any;
  loadData(searchParams.value);
});
const onSearch = (value: string) => {
  router.push({
    query: {
      ...searchParams.value,
      text: value,
    },
  });
  loadData(searchParams.value);
};

const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
</script>
