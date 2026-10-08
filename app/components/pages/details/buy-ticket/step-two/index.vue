<template>
  <div class="step-two" flex-column>
    <form
      class="form flex-column"
      novalidate
      @submit.prevent="buyTicketStore.submitStepTwo()"
    >
      <div class="user-fields form-box">
        <tiny-form-field
          v-model="values.fullName"
          label="Full Name"
          :error="error('fullName')"
          :success="success('fullName')"
          @blur="touch('fullName')"
        />
        <tiny-form-field
          v-model="values.email"
          label="Email"
          type="email"
          :error="error('email')"
          :success="success('email')"
          @blur="touch('email')"
        />
        <tiny-form-field
          v-model="values.mobileNumber"
          label="Mobile Number"
          type="tel"
          :error="error('mobileNumber')"
          :success="success('mobileNumber')"
          @blur="touch('mobileNumber')"
        />
      </div>
      <div class="card-fields form-box">
        <tiny-form-field
          v-model="values.cardNumber"
          label="Card Number"
          type="tel"
          inputmode="numeric"
          placeholder="0000 0000 0000 0000"
          :error="error('cardNumber')"
          :success="success('cardNumber')"
          maxlength="19"
          @blur="touch('cardNumber')"
        />
        <tiny-form-field
          v-model="values.expiry"
          label="Expiry"
          type="tel"
          inputmode="numeric"
          placeholder="MM/YY"
          :error="error('expiry')"
          :success="success('expiry')"
          maxlength="5"
          @blur="touch('expiry')"
        />
        <tiny-form-field
          v-model="values.cvv"
          label="CVV"
          type="tel"
          inputmode="numeric"
          placeholder="123"
          :error="error('cvv')"
          :success="success('cvv')"
          maxlength="3"
          @blur="touch('cvv')"
        />
      </div>
      <p v-if="buyTicketStore.orderError" class="order-error">
        {{ buyTicketStore.orderError }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { useBuyTicketStore } from "~/stores/pages/details/buy-ticket/index";

const buyTicketStore = useBuyTicketStore();
const { values, error, success, touch } = buyTicketStore;

const digits = (v) => String(v ?? "").replace(/\D/g, "");

watch(
  () => values.cardNumber,
  (v) => {
    const f = digits(v)
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    if (f !== v) values.cardNumber = f;
  },
);

watch(
  () => values.expiry,
  (v) => {
    const d = digits(v).slice(0, 4);
    const f = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    if (f !== v) values.expiry = f;
  },
);

watch(
  () => values.cvv,
  (v) => {
    const f = digits(v).slice(0, 3);
    if (f !== v) values.cvv = f;
  },
);
</script>

<style lang="scss" scoped>
.step-two {
  margin-top: 35px;

  .form {
    gap: 30px;
  }

  .form-box {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 25px;

    > :first-child {
      grid-column: 1 / -1;
    }

    &.user-fields {
      padding-bottom: 30px;
      border-bottom: 1px solid var(--color-bg-card);
    }

    :deep(.form-field) {
      .input {
        height: 46px;
      }
    }
  }

  .order-error {
    color: var(--color-red);
  }
}
</style>
