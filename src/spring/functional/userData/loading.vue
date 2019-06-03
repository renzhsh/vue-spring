<template>
    <h2>数据加载中......</h2>
</template>
<script>
export default {
    created() {
        let inval = setInterval(() => {
            if (this.$userData.ready) {
                clearInterval(inval);
                this.$router.push(this.$route.query.redirect);
            }
        }, 500);
    }
};
</script>

