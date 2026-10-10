<template>
  <div class="tickets">
    <pages-profile-tickets-states />
    <ul
      v-if="profileStore.tickets[profileStore.activeState].length > 0"
      class="list flex-column"
    >
      <li
        v-for="item in profileStore.tickets[profileStore.activeState]"
        :key="item.id"
        class="item flex-center justify-between"
      >
        <pages-profile-tickets-movie :item="item" />
        <div class="order flex-column justify-between">
          <div class="title flex-column">
            <div class="label f-overline uppercase">ORDER</div>
            <div class="value f-label-m">#{{ item.reference }}</div>
          </div>
          <div class="info flex-column">
            <div class="price flex-center justify-between">
              <div class="label f-label-m">Total paid</div>
              <div class="value f-h1">₾{{ item.totalPrice }}</div>
            </div>
            <button
              class="refund f-button flex-center"
              :disabled="
                !item.isRefundable || profileStore.refundingId === item.id
              "
              @click="onRefund(item)"
            >
              <span class="value">
                {{
                  profileStore.refundingId === item.id
                    ? "Refunding..."
                    : "Refund"
                }}
              </span>
            </button>
          </div>
          <div v-if="item.isRefundable" class="date f-body-s label flex-center">
            Refundable until {{ getRefundDeadline(item.session.startsAt) }}
          </div>
        </div>
      </li>
    </ul>

    <div v-else class="no-tickets f-button">You have no tickets</div>
  </div>
</template>

<script setup>
import { useProfileStore } from "~/stores/pages/profile";

const profileStore = useProfileStore();

await useAsyncData("profile-tickets", () =>
  Promise.all([
    profileStore.fetchTickets("upcoming"),
    profileStore.fetchTickets("past"),
  ]),
);

const REFUND_CUTOFF_MS = 2 * 60 * 60 * 1000;

const getRefundDeadline = (startsAt) => {
  const deadline = new Date(new Date(startsAt).getTime() - REFUND_CUTOFF_MS);

  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tbilisi",
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(deadline)
      .map((part) => [part.type, part.value]),
  );

  return `${p.hour}:${p.minute}, ${p.weekday} ${p.day} ${p.month}`;
};

const onRefund = async (item) => {
  if (!item.isRefundable) return;
  if (!confirm("Refund this order? This can't be undone.")) return;

  const ok = await profileStore.refundOrder(item);
  const message = profileStore.refundErrors[item.id];

  if (!ok && message) alert(message);
};
</script>

<style lang="scss" scoped>
.tickets {
  margin-top: 36px;

  .list {
    margin-top: 20px;
    gap: 20px;
  }

  :deep(.item) {
    align-items: stretch;
    padding: 25px 30px;
    background-color: var(--color-bg-card);
    border-radius: 26px;

    .label {
      color: var(--color-text-secondary);
    }
    .value {
      color: var(--color-text-primary);
    }
    .order {
      width: 300px;
      padding-left: 24px;
      border-left: 1px dashed var(--color-bg-raised);
    }

    .info {
      gap: 10px;

      .refund {
        width: 100%;
        height: 35px;
        background-color: var(--color-tint-white);
        border-radius: 999px;
        cursor: pointer;

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }
    }
  }

  .no-tickets {
    color: var(--color-red);
    margin-top: 24px;
  }
}
</style>
