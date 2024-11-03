<template>
    <li class="article-item">
        <div class="article-item-image-container">
            <RouterLink :to="`/posts/${ thisArticle._id }`">
                <img class="article-item-thumbnail" v-if="thisArticle.images.length > 0" :src="thisArticle.images[0]" alt="이미지 미리보기">
            </RouterLink>

            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-gallery-line"></use>
            </svg>
        </div>

        <dl class="article-item-descriptions">
            <dt class="article-item-titlebar" :title="thisArticle.title">
                <p class="article-item-title">
                    <RouterLink :to="`/posts/${ thisArticle._id }`">
                        {{ thisArticle.title }}
                    </RouterLink>
                </p>

                <span>[{{ thisArticle.comments.length }}]</span>
            </dt>

            <dd class="article-item-info">
                <RouterLink :to="`/posts/${ thisArticle._id }`">
                    {{ postCategory[thisArticle.category] }}
                </RouterLink>

                <span>·</span>

                <RouterLink :to="`/posts/${ thisArticle._id }`">
                    {{ dateFormat(thisArticle.createdAt) }}
                </RouterLink>
            </dd>

            <dd class="article-item-text-summary">
                <RouterLink :to="`/posts/${ thisArticle._id }`">
                    {{ thisArticle.text }}
                </RouterLink>
            </dd>
        </dl>
    </li>
</template> <!-- Template Ends -->

<script setup>
    import { RouterLink } from 'vue-router';
    import dateFormat from '../utilities/dateFormat';
    import postData from '../datas/postData.json'; // 임시 데이터
    import postCategory from '../datas/articleCategory.json'; // 임시 카테고리

    const props = defineProps([ 'postObject' ]);
    const thisArticle = props.postObject;
</script> <!-- Logic Ends -->