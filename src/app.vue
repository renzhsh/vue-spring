<template>
    <div class="app-main">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {

    }
};
</script>
<style lang="less">
html,
body,
.app-main {
    height: 100%;
    width: 100%;
}

html,
body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

ul,
ol,
li,
p {
    list-style: none;
    margin: 0;
    padding: 0;
}

.transition {
    transition: all 0.5s ease;
}
</style>
