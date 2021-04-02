<template>
  <main id="mstrblstr">
    <button v-if="videoURL !== ''"
            class="prev-next prev-next--prev"
            v-on:click="onPrevCollage">
      <svg style="enable-background:new 0 0 42.67 64;"
           version="1.1"
           viewBox="0 0 42.67 64"
           x="0px"
           xml:space="preserve"
           y="0px">
        <rect height="15.08"
              transform="matrix(0.7071 -0.7071 0.7071 0.7071 -23.9215 27.5817)"
              width="45.25"
              x="-1.29"
              y="35.12"/>
        <rect height="15.08"
              transform="matrix(0.7071 0.7071 -0.7071 0.7071 21.3333 -8.8366)"
              width="45.25"
              x="-1.29"
              y="13.79"/>
      </svg>
    </button>
    <button v-if="videoURL !== ''"
            class="prev-next prev-next--next"
            v-on:click="onNextCollage">
      <svg style="enable-background:new 0 0 42.67 64;"
           version="1.1"
           viewBox="0 0 42.67 64"
           x="0px"
           xml:space="preserve"
           y="0px">
        <rect height="15.08"
              transform="matrix(0.7071 -0.7071 0.7071 0.7071 -23.9215 27.5817)"
              width="45.25"
              x="-1.29"
              y="35.12"/>
        <rect height="15.08"
              transform="matrix(0.7071 0.7071 -0.7071 0.7071 21.3333 -8.8366)"
              width="45.25"
              x="-1.29"
              y="13.79"/>
      </svg>

    </button>

    <div v-if="videoURL === ''"
         class="start">
      <p>
        <button class="button"
                v-on:click="onStart">Play
        </button>
      </p>
      <p>
        Heads-up! Audio and video will start when you click play.
      </p>
    </div>

    <video id="video-player"
           :src="videoURL"
           autoplay></video>

    <iframe id="audio-player"
            :src="`https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/${soundCloudID}`"
            allow="autoplay"
            frameborder="no"
            height="166"
            scrolling="no"
            width="100%"></iframe>

    <div class="attributions">
      <div v-if="videoAttribution.name">
        <strong>VIDEO:</strong>
        <a :href="videoAttribution.url"
           target="_blank"> {{
            videoAttribution.name
                            }}
        </a>
        on Pexels.
      </div>
      <div v-if="audioAttribution.title">
        <strong>AUDIO:</strong>
        <a :href="audioAttribution.permalink_url"
           target="_blank">{{
            audioAttribution.title
                           }}
        </a>
        by
        <a :href="audioAttribution.user.uri">{{
            audioAttribution.user.username
                                             }}
        </a>
        on Soundcloud.
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {onMounted, ref, Ref, SetupContext} from "vue";
import LooseObject from "@/ts/lib/interfaces/LooseObject";
import Collage from "@/ts/lib/interfaces/Collage";

declare global {
  interface Window {
    SC: any;
  }
}
window.SC = window.SC || {};

export default {
  props: {},
  setup: function (props: LooseObject, context: SetupContext) {
    const pexelsKey: string = "563492ad6f9170000100000160882ac2b50e487fa4164462be8a2e2c";
    let player: HTMLVideoElement;
    let iframe: HTMLIFrameElement;
    let scWidget: any;
    let collageIndex: Ref = ref(0);
    let videoIndex: Ref = ref(0);
    const collages: Ref = ref([
      {
        name: "Billiards",
        soundcloudId: "792674413",
        videoIds: [
          "5044242",
          "5044243",
          "5044245",
          "5044244",
          "5044250",
          "5044254"
        ]
      },
      {
        name: "Masked Lovers",
        soundcloudId: "398540970",
        videoIds: [
          "6904106",
          "6904105",
          "6904104",
          "6904103",
          "6904098",
          "6904095",
          "6904094",
          "6904093",
          "6904089",
          "6904088",
          "6904086",
          "6904087",
          "6904084"
        ]
      },
      {
        name: "Chess Masters",
        soundcloudId: "128459018",
        videoIds: [
          "6689888",
          "6689886",
          "6689884",
          "6689885",
          "6689883",
          "6689879",
          "6689587",
          "6689584",
          "6689581",
          "6689585",
          "6689577",
          "6689575",
          "6689574",
          "6689571",
          "6689568",
          "6689570",
          "6689106",
          "6689101",
          "6689094",
          "6689092",
          "6688641",
          "6688632",
          "6688630",
          "6688624",
          "6688627",
          "6688622",
          "6688353",
          "6687508"
        ]
      },
      {
        name: "Future of Gaming",
        soundcloudId: "328467803",
        videoIds: [
          "7048557",
          "7048556",
          "7047800",
          "7047797",
          "7047783",
          "7047257",
          "7046914",
          "7046913",
          "7046633",
          "7046615",
          "7046606"
        ]
      },
      {
        name: "Hip Hop Grannies",
        soundcloudId: "982243351",
        videoIds: [
          "7017944",
          "7017924",
          "7017925",
          "7017922",
          "7017840",
          "7017838",
          "7017806",
          "7017804",
          "7017796",
          "7017793",
          "7017795",
          "7017794"
        ]
      },
      {
        name: "Airline",
        soundcloudId: "454290741",
        videoIds: [
          "5778917",
          "5778916",
          "5778921",
          "5778920",
          "5778918",
          "5778915",
          "5778925",
          "5778924",
          "5778928",
          "5778931"
        ]
      }
    ]);
    const videoURL: Ref = ref("");
    const videoAttribution: Ref = ref({});
    const audioAttribution: Ref = ref({});
    const soundCloudID: Ref = ref(collages.value[collageIndex.value].soundcloudId);
    const autoplay: Ref = ref(true);

    const loadVideo = () => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.addEventListener("load", () => {
        let response: LooseObject = JSON.parse(xhr.response);

        videoAttribution.value = response.user;

        videoURL.value = response.video_files.find((i: LooseObject) => {
          return i.quality === "hd";
        }).link;

      });
      xhr.open("GET", `https://api.pexels.com/videos/videos/${collages.value[collageIndex.value].videoIds[videoIndex.value]}`);
      xhr.setRequestHeader("Authorization", pexelsKey);
      xhr.send();
    };

    const loadAudio = () => {
      scWidget.unbind(window.SC.Widget.Events.FINISH);

      scWidget.load(`https://api.soundcloud.com/tracks/${soundCloudID.value}`);
      scWidget.bind(window.SC.Widget.Events.READY, () => {
        scWidget.play();

        setTimeout(() => {
          scWidget.getCurrentSound((e: any) => {
            audioAttribution.value = e;
          });
        }, 1000);
      });

      scWidget.bind(window.SC.Widget.Events.FINISH, () => {
        onNextCollage();
      });
    };

    const shuffleArray = (arr: Array<any>) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [
          arr[i],
          arr[j]
        ] = [
          arr[j],
          arr[i]
        ];
      }
    };

    const onStart = () => {
      // Shuffle initial collages
      shuffleArray(collages.value);

      // Shuffle collage videos
      collages.value.forEach((c: Collage) => {
        shuffleArray(c.videoIds);
      });

      soundCloudID.value = collages.value[collageIndex.value].soundcloudId;

      loadVideo();
      loadAudio();
    };

    const onPrevCollage = () => {
      collageIndex.value = collageIndex.value - 1;
      videoIndex.value = 0;

      if (collageIndex.value < 0) {
        collageIndex.value = collages.value.length - 1;
      }

      soundCloudID.value = collages.value[collageIndex.value].soundcloudId;

      loadVideo();
      loadAudio();
    };

    const onNextCollage = () => {
      collageIndex.value = collageIndex.value + 1;
      videoIndex.value = 0;

      if (collageIndex.value >= collages.value.length) {
        collageIndex.value = 0;
      }

      soundCloudID.value = collages.value[collageIndex.value].soundcloudId;
      loadVideo();
      loadAudio();
    };

    const onVideoEnded = () => {
      videoIndex.value = videoIndex.value + 1;

      if (videoIndex.value >= collages.value[collageIndex.value].videoIds.length) {
        videoIndex.value = 0;
      }

      loadVideo();
    };

    const onAudioEnded = () => {
      onNextCollage();
    };

    onMounted(() => {
      player = document.getElementById("video-player") as HTMLVideoElement;
      player.volume = 0;

      player.addEventListener("ended", () => {
        onVideoEnded();
      });

      player.addEventListener("loadedmetadata", () => {
        player.play();
      });

      iframe = document.getElementById("audio-player") as HTMLIFrameElement;
      scWidget = window.SC.Widget(iframe);
    });

    return {
      videoURL,
      soundCloudID,
      videoAttribution,
      audioAttribution,
      onStart,
      onPrevCollage,
      onNextCollage
    };
  }
};

</script>


