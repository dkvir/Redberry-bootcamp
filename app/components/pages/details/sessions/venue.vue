<template>
  <div class="venue flex-column">
    <h3 class="title f-button">
      {{ theater.venue.name }}
    </h3>
    <ul class="halls flex-start align-center">
      <li
        v-for="(hall, index) in theater.sessions"
        :key="index"
        class="hall flex-column"
      >
        <p class="name">Hall {{ hall.hall.name }}</p>

        <div class="ticket flex">
          <div class="wrapper left flex-center flex-column">
            <div class="circle"></div>
            <p class="starts-at f-h2">
              {{ formatTime(hall.startsAt) }}
            </p>
            <div class="footer flex-center">
              <span class="span f-body-s uppercase">{{
                hall.language.code
              }}</span>
              <div class="chip f-label-s uppercase">{{ hall.format.name }}</div>
            </div>
          </div>
          <div class="wrapper right flex-center flex-column">
            <p class="price f-h2">₾ {{ hall.price }}</p>
            <div class="footer flex-center">
              <nuxt-icon name="ticket" class="icon" />
              <span class="span f-body-s">{{ hall.seatsLeft }} left</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  theater: {
    type: Array,
    required: true,
  },
});

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString("en-GB", {
    timeZone: "Asia/Tbilisi",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<style lang="scss" scoped>
.venue {
  margin-top: 27px;
  gap: 12px;

  .title {
    color: var(--color-text-primary);
  }

  .halls {
    gap: 14px;
    flex-wrap: wrap;
  }

  .hall {
    height: 140px;
    gap: 9px;
    padding: 15px;
    background-color: var(--color-bg-card);
    border-radius: 18px;
  }

  .ticket {
    height: 81px;
    background-color: var(--color-bg-page);
    border-radius: 8px;

    .wrapper {
      position: relative;
      gap: 8px;
      padding: 15px 20px;
      &.left {
        border-right: 1px dashed var(--color-text-primary);
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          transform: translate(50%, 50%);
          @include size(20px);
          border-radius: 50%;
          background-color: var(--color-bg-card);
        }

        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
          @include size(20px);
          border-radius: 50%;
          background-color: var(--color-bg-card);
        }
      }
    }

    .footer {
      gap: 6px;
      color: var(--color-text-secondary);
    }

    .chip {
      background-color: var(--color-bg-card);
      border-radius: 999px;
      padding: 6px 14px;
    }

    .price {
      color: var(--color-red);
    }
  }
}
</style>
