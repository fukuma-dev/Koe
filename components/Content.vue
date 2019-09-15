<template>
  <div class="content">
    <!-- <img src=""> -->
    <div class="message">
      <div class="message__info">
        <p>message__info</p>
        <span>created.at</span>
      </div>
      <div class="message__body">
        {{ post.body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
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
      opacity: 0.6;
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
