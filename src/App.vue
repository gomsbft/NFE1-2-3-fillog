<template>
  <Suspense>
    <BasicLayout>
      <RouterView :key="$route.fullPath" />
    </BasicLayout>
  </Suspense>
</template> <!-- Template Ends -->

<script setup>
  import BasicLayout from './layouts/BasicLayout.vue';

  /* <Suspense> 블록으로 앱 전체를 감싸 전역적으로 Axios의 Await 비동기 작동을 가능하게 한다. */

</script> <!-- Logic Ends -->