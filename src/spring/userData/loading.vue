<template>
    <h2>数据加载中......</h2>
</template>
<script>
export default {
    created() {
        let inval = setInterval(() => {
            if (this.$userData.ready) {
                clearInterval(inval);
                if (this.$route.query.redirect) {
                    this.$router.push(this.$route.query.redirect);
                } else {
                    this.$router.push("/entrance");
                }
            }
        }, 500);
    }
};
</script>

