export function useForm(initial, rules) {
  const keys = Object.keys(initial);
  const values = reactive({ ...initial });
  const touched = reactive(Object.fromEntries(keys.map((k) => [k, false])));
  const serverErrors = reactive({});

  const errors = computed(() =>
    Object.fromEntries(
      Object.keys(rules).map((k) => [k, rules[k](values[k], values)]),
    ),
  );
  const isValid = computed(() => Object.values(errors.value).every((e) => !e));

  const error = (k) =>
    touched[k] ? serverErrors[k] || errors.value[k] || "" : "";
  const success = (k) => touched[k] && !errors.value[k] && !serverErrors[k];

  const touch = (k) => (touched[k] = true);
  const touchAll = () => keys.forEach((k) => (touched[k] = true));
  const untouchAll = () => keys.forEach((k) => (touched[k] = false));

  const setServerErrors = (errs = {}, map = {}) => {
    const leftover = [];
    Object.entries(errs).forEach(([k, msgs]) => {
      const key = map[k] ?? k;
      if (key in values) {
        serverErrors[key] = msgs[0];
        touched[key] = true;
      } else {
        leftover.push(msgs[0]);
      }
    });
    return leftover;
  };

  keys.forEach((k) =>
    watch(
      () => values[k],
      () => delete serverErrors[k],
    ),
  );

  const reset = () => {
    Object.assign(values, initial);
    keys.forEach((k) => (touched[k] = false));
  };

  return {
    values,
    error,
    success,
    isValid,
    touch,
    touchAll,
    untouchAll,
    setServerErrors,
    reset,
  };
}
