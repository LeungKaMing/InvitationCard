<template>
    <div>
        <p class="desc">{{desc}}</p>
        <div class="tri">></div>
    </div>
</template>

<style scoped>
    .desc {
        position: absolute;
        bottom: 5%;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
    }
    .tri {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        color: #fff;
        -webkit-animation: pulse 1s infinite;
        animation: pulse 1s infinite;
    }

    @-webkit-keyframes pulse {
        from {
            -webkit-transform: scale3d(1, 1, 1) rotate(90deg);
            transform: scale3d(1, 1, 1) rotate(90deg);
        }

        50% {
            -webkit-transform: scale3d(2,2,2) rotate(90deg);
            transform: scale3d(2,2,2) rotate(90deg);
        }

        to {
            -webkit-transform: scale3d(1, 1, 1) rotate(90deg);
            transform: scale3d(1, 1, 1) rotate(90deg);
        }
    }

    @keyframes pulse {
        from {
            -webkit-transform: scale3d(1, 1, 1) rotate(90deg);
            transform: scale3d(1, 1, 1) rotate(90deg);
        }

        50% {
            -webkit-transform: scale3d(2,2,2) rotate(90deg);
            transform: scale3d(2,2,2) rotate(90deg);
        }

        to {
            -webkit-transform: scale3d(1, 1, 1) rotate(90deg);
            transform: scale3d(1, 1, 1) rotate(90deg);
        }
    }
</style>

<script>
    export default {
        props: {
            direct: {
                type: String,
                default: '向下翻页'
            },
            currentPage: {
                type: Number,
                default: 1
            }
        },
        computed: {
            desc () {
                return (this.direct === 'up' && this.currentPage !== 1) ? '向上翻页' : (this.direct === 'down' && this.currentPage !== 4) ? '向下翻页' : (this.direct === 'up' && this.currentPage === 1) ? '已经是最顶啦' : (this.direct === 'down' && this.currentPage === 4) ? '已经是最底啦' : '向下翻页'
            }
        }
    }
</script>
