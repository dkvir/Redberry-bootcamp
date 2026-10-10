<template>
  <div class="movie flex align-center">
    <div class="poster">
      <img
        :src="item.session.movie.posterUrl"
        :alt="item.session.movie.title"
        class="img"
      />
    </div>
    <div class="info flex-column">
      <div class="info-header flex align-center">
        <h2 class="title f-h2">
          {{ item.session.movie.title }}
        </h2>
        <tiny-chip
          :label="item.session.movie.ageRating.code"
          :red="item.session.movie.ageRating.minAge"
        />
        <div class="duration f-body-m">
          {{ item.session.movie.runtimeMinutes }} min
        </div>
      </div>

      <div class="info-body flex">
        <div class="body-box flex-column">
          <div class="label f-overline uppercase">DATE</div>
          <div class="value f-label-m">
            {{ formatDate(item.session.date) }}
          </div>
        </div>
        <div class="body-box flex-column">
          <div class="label f-overline uppercase">venue</div>
          <div class="value f-label-m">
            {{ item.session.venue.name }} · Hall {{ item.session.hall.name }}
          </div>
        </div>
        <div class="body-box flex-column">
          <div class="label f-overline uppercase">format</div>
          <div class="value f-label-m flex-center">
            <div
              v-for="(format, key) in item.session.movie.formats"
              :key="key"
              class="format"
            >
              <span v-if="key !== 0" class="dot">·</span>
              {{ format.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="info-footer flex align-center">
        <div class="label f-overline uppercase">seats</div>
        <ul class="seats flex-center">
          <li
            v-for="ticket in item.tickets"
            :key="ticket.id"
            class="seat f-label-s value"
          >
            {{ ticket.seatCode }} · {{ ticket.ticketType.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
</script>

<style lang="scss" scoped>
.movie {
  gap: 18px;

  .poster {
    width: 100px;
    height: 134px;
    border-radius: 10px;
    overflow: hidden;
    .img {
      @include size(100%);
      object-fit: cover;
    }
  }

  .info {
    gap: 12px;

    &-header {
      gap: 10px;

      .title {
        color: var(--color-text-primary);
      }
      .duration {
        color: var(--color-text-secondary);
      }
    }

    &-body {
      gap: 40px;
      .body-box {
        gap: 4px;

        .dot {
          padding: 0 5px;
        }
      }
    }

    &-footer {
      gap: 8px;

      .seats {
        gap: 8px;
      }

      .seat {
        padding: 4px 10px;
        background-color: var(--color-tint-white);
        border-radius: 6px;
      }
    }
  }
}
</style>
