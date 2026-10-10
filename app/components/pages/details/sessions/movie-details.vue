<template>
  <div class="movie-details">
    <h2 class="details f-h2">Details</h2>

    <div class="detail flex-column">
      <p class="label f-label-s uppercase">DIRECTOR</p>
      <p class="value f-label-m">
        {{ movie.director }}
      </p>
    </div>

    <div class="detail flex-column">
      <p class="label f-label-s uppercase">MAIN CAST</p>
      <p class="value f-label-m">
        {{ movie.cast }}
      </p>
    </div>

    <div class="detail flex-column">
      <p class="label f-label-s uppercase">DURATION</p>
      <p class="value f-label-m">{{ movie.runtimeMinutes }} minutes</p>
    </div>

    <div class="detail flex-column">
      <p class="label f-label-s uppercase">RELEASE DATE</p>
      <p class="value f-label-m">{{ formatDate(movie.releaseDate) }}</p>
    </div>

    <div class="detail flex-column">
      <p class="label f-label-s uppercase">FORMATS</p>
      <p class="value f-label-m">{{ formatFormats(movie.formats) }}</p>
    </div>

    <div class="detail flex-column">
      <p class="label f-label-s uppercase">FROM</p>
      <p class="value f-label-m">₾{{ movie.fromPrice }}</p>
    </div>

    <div
      :class="[
        'note',
        {
          'is-restricted': movie.ageRating.minAge,
        },
      ]"
    >
      <p class="label f-label-s uppercase">RATING NOTE</p>
      <div class="note-info flex-start">
        <div class="rating">{{ movie.ageRating.code }}</div>
        <div v-if="movie.ageRating.code.minAge" class="warning">
          Not recommended for under-{{ movie.ageRating.minAge }}s. Tickets
          require an account aged {{ movie.ageRating.minAge }} or over.
        </div>
        <div v-else class="warning">
          Suitable for all ages. Anyone can watch this movie.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatFormats(formats) {
  return formats.map((format) => format.name).join(", ");
}
</script>

<style lang="scss" scoped>
.movie-details {
  padding: 0 26px;
  width: 30%;

  .detail {
    margin-top: 17px;
    gap: 7px;

    .label {
      color: var(--color-text-secondary);
    }

    .value {
      color: var(--color-text-primary);
    }
  }

  .note {
    margin-top: 17px;
    padding: 9px 13px;
    background-color: var(--note-bg, var(--color-tint-green));
    border-radius: 12px;
    color: var(--note-color, var(--color-green));

    &.is-restricted {
      --note-bg: var(--color-tint-orange);
      --note-color: var(--color-orange);
    }

    .note-info {
      margin-top: 6px;
      gap: 6px;
    }
  }
}
</style>
