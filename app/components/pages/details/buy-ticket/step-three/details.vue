<template>
  <div class="details">
    <div class="movie flex">
      <div class="poster">
        <img
          :src="order.session.movie.posterUrl"
          :alt="order.session.movie.title"
          class="img"
        />
      </div>
      <div class="info flex-column">
        <h2 class="title f-button">
          {{ order.session.movie.title }}
        </h2>
        <p class="subtitle f-body-s">
          {{ order.session.venue.name }} · Hall {{ order.session.hall.name }} ·
          {{ formatDate(order.session.date) }} ·
          {{ order.session.time }}
        </p>
      </div>
    </div>
    <div class="seats info-box flex-center justify-between">
      <div class="label f-body-s">Seats</div>
      <div class="value f-label-s">{{ seatCodes }}</div>
    </div>
    <div class="tickets info-box flex-center justify-between">
      <div class="label f-body-s">Tickets</div>
      <div class="value f-body-s">{{ ticketsSummary }}</div>
    </div>

    <div class="price info-box flex-center justify-between">
      <div class="label f-body-s uppercase">TOTAL PAID</div>
      <div class="value f-h3">₾ {{ totalPrice }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: {
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

const tickets = computed(() => props.order?.tickets ?? []);

const seatCodes = computed(() =>
  tickets.value.map((ticket) => ticket.seatCode).join(", "),
);

const ticketsSummary = computed(() => {
  const counts = {};
  tickets.value.forEach((ticket) => {
    const name = ticket.ticketType.name;
    counts[name] = (counts[name] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, count]) => `${count} x ${name}`)
    .join(", ");
});

const totalPrice = computed(() =>
  props.order.tickets.reduce((sum, t) => sum + t.price, 0),
);
</script>

<style lang="scss" scoped>
.details {
  margin-top: 18px;
  padding: 20px;
  border-radius: 12px;
  background-color: var(--color-bg-card);
  width: 673px;

  .movie {
    gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--color-bg-raised);
  }

  .poster {
    width: 48px;
    height: 64px;
    border-radius: 8px;
    overflow: hidden;
    .img {
      @include size(100%);
      object-fit: cover;
    }
  }

  .info {
    gap: 8px;
  }

  .title {
    color: var(--color-text-primary);
  }

  .subtitle {
    color: var(--color-text-secondary);
  }

  .info-box {
    margin-top: 12px;

    &.price {
      padding-top: 12px;
      border-top: 1px solid var(--color-bg-raised);
    }
  }

  .label {
    color: var(--color-text-secondary);
  }

  .value {
    color: var(--color-text-primary);
  }
}
</style>
