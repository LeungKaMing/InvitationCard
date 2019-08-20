<template>
    <div>
        <video-player class="video-player-box vjs-big-play-centered"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          customEventName="customstatechangedeventname"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @statechanged="playerStateChanged($event)"
          @ready="playerReadied">
        </video-player>
    </div>
</template>

<script>
  // videojs
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'

  // export
  export default {
    components: {
        videoPlayer
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    data() {
      return {
        playerOptions: {
					autoplay: false, //如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          height: '360',
          playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
          sources: [{
            type: "video/mp4",
            src: "http://valipl.cp31.ott.cibntv.net/65721e30eb64671ca0f6d4d9e/03000801005D4D18220D9A5003E880D7433C45-F3C1-496B-8693-A7D0E10F4116.mp4?ccode=0502&duration=169&expire=18000&psid=2b5588cae6dc5ad58c076ff923d49916&ups_client_netip=7920a6eb&ups_ts=1566231524&ups_userid=&utid=bJLaFRPfIzACAXFtck1SC29X&vid=XNDI4NTIzMzk2MA%3D%3D&vkey=Adb91737fdc074e85e6a82a9b616680b5"
          }],
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-3.jpg",
        }
      }
    },
    methods: {
    //   playerReadied(player) {
    //     const track = new videojs.AudioTrack({
    //       id: 'my-spanish-audio-track',
    //       kind: 'translation',
    //       label: 'Spanish',
    //       language: 'es'
    //     })
    //     player.audioTracks().addTrack(track)
    //     // Get the current player's AudioTrackList object.
    //     const audioTrackList = player.audioTracks()
    //     // Listen to the "change" event.
    //     audioTrackList.addEventListener('change', function() {
    //       // Log the currently enabled AudioTrack label.
    //       for (let i = 0; i < audioTrackList.length; i++) {
    //         const track = audioTrackList[i]
    //         if (track.enabled) {
    //           videojs.log(track.label)
    //           return
    //         }
    //       }
    //     })
    //   },
      // videojs
      // listen event
      onPlayerPlay(player) {
        console.log('onPlayerPlay!', player)
      },
      onPlayerPause(player) {
        console.log('onPlayerPause!', player)
      },
      onPlayerEnded(player) {
        console.log('onPlayerEnded!', player)
      },
      onPlayerWaiting(player) {
        console.log('onPlayerWaiting!', player)
      },
      onPlayerPlaying(player) {
        console.log('onPlayerPlaying!', player)
      },
      onPlayerLoadeddata(player) {
        console.log('onPlayerLoadeddata!', player)
      },
      onPlayerTimeupdate(player) {
        console.log('onPlayerTimeupdate!', player)
      },
      onPlayerCanplay(player) {
        console.log('onPlayerCanplay!', player)
      },
      onPlayerCanplaythrough(player) {
        console.log('onPlayerCanplaythrough!', player)
      },
      // ...player event
      // or listen state event
      playerStateChanged(playerCurrentState) {
        console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    }
  }
</script>