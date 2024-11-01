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
                    {{ movieCategory[thisArticle.category] }}
                </RouterLink>

                <span>·</span>

                <RouterLink :to="`/posts/${ thisArticle._id }`">
                    {{ new Date(thisArticle.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
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
    import movieCategory from '../datas/movieCategory.json';

    const props = defineProps([ 'postObject' ]);
    const thisArticle = props.postObject;
</script> <!-- Logic Ends -->