<template>
  <div
    class="content"
    :data-id="post.id"
    :style="{
      filter: $store.getters['user'] ? 'none' : 'blur(6px)'
    }"
  >
    <img
      v-if="post.user"
      width="40"
      style="border-radius: 50%;"
      :src="post.user.icon"
    />
    <div class="message">
      <div class="message__info">
        <p v-if="post.user">{{ post.user.name }}</p>
        <span>{{ post.createdAt | timestamp }}</span>
      </div>
      <div class="message__body">
        {{ post.body }}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters: {
    timestamp(val) {
      return dayjs.unix(val - 3000000000).format('hh:mm・YYYY/MM/DD')
    }
  },
  props: {
    post: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  border-top: solid 1px rgba(255, 255, 255, 0.1);
  line-height: 2;
  color: #e5e5e5;
}

.message {
  flex: 1;
  padding-left: 16px;
  &__info {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1;
    & span {
      font-size: 12px;
      display: inline-block;
      margin-left: 8px;
      margin-top: 2px;
    }
  }
  &__body {
    padding-top: 4px;
  }
}
</style>
