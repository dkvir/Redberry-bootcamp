export const useFiltersStore = defineStore("sessionsFiltersStore", () => {
  const config = useRuntimeConfig();

  // fetch filters
  const options = ref(null);
  const optionsLoading = ref(false);
  let optionsPromise = null;

  const venues = computed(() => options.value?.venues ?? []);
  const formats = computed(() => options.value?.formats ?? []);
  const languages = computed(() => options.value?.languages ?? []);
  const timeBands = computed(() => options.value?.timeBands ?? []);
  const sorts = computed(() => options.value?.sorts ?? []);

  async function fetchOptions() {
    if (options.value) return options.value;
    if (optionsPromise) return optionsPromise;

    optionsLoading.value = true;
    optionsPromise = $fetch("/filter-options", {
      baseURL: config.public.apiBase,
    })
      .then((res) => {
        options.value = res.data;
        pruneFormats();
        return options.value;
      })
      .finally(() => {
        optionsLoading.value = false;
        optionsPromise = null;
      });

    return optionsPromise;
  }

  // selected state
  const PARAM_NAMES = {
    venues: "venues",
    formats: "formats",
    languages: "languages",
    timeBands: "bands",
  };

  const selected = reactive({
    venues: [],
    formats: [],
    languages: [],
    timeBands: [],
  });

  const date = ref(toDateString(new Date()));
  const sort = ref(null);
  const page = ref(1);

  function hydrateFromQuery(q) {
    for (const [key, param] of Object.entries(PARAM_NAMES)) {
      selected[key] = [].concat(q[`${param}[]`] ?? []);
    }
    date.value = q.date || toDateString(new Date());
    sort.value = q.sort || null;
    page.value = Number(q.page) || 1;

    if (options.value) pruneFormats();
  }

  const query = computed(() => {
    const q = {};
    for (const [key, param] of Object.entries(PARAM_NAMES)) {
      if (selected[key].length) q[`${param}[]`] = [...selected[key]];
    }
    if (date.value !== toDateString(new Date())) q.date = date.value;
    if (sort.value) q.sort = sort.value;
    if (page.value > 1) q.page = page.value;
    return q;
  });

  function isSelected(key, slug) {
    return selected[key].includes(slug);
  }

  const activeCount = computed(
    () =>
      Object.values(selected).reduce((sum, arr) => sum + arr.length, 0) +
      (sort.value ? 1 : 0),
  );

  const isDirty = computed(
    () =>
      activeCount.value > 0 ||
      date.value !== toDateString(new Date()) ||
      sort.value !== null,
  );

  function toggle(key, value) {
    if (value == null) {
      return;
    }
    const i = selected[key].indexOf(value);
    if (i === -1) selected[key].push(value);
    else selected[key].splice(i, 1);

    if (key === "venues") pruneFormats();
    page.value = 1;
  }

  function setDate(value) {
    date.value = value;
    page.value = 1;
  }

  function setSort(value) {
    if (value == null) return;
    sort.value = value === sorts.value[0]?.id ? null : value;
    page.value = 1;
  }

  function setPage(value) {
    page.value = value;
  }

  function reset() {
    Object.keys(PARAM_NAMES).forEach((key) => (selected[key] = []));
    date.value = toDateString(new Date());
    sort.value = null;
    page.value = 1;
  }

  const availableFormats = computed(() => {
    if (!selected.venues.length) return formats.value;

    const allowed = new Set(
      venues.value
        .filter((v) => selected.venues.includes(v.slug))
        .flatMap((v) => v.formats.map((f) => f.slug)),
    );
    return formats.value.filter((f) => allowed.has(f.slug));
  });

  function pruneFormats() {
    const allowed = new Set(availableFormats.value.map((f) => f.slug));
    selected.formats = selected.formats.filter((slug) => allowed.has(slug));
  }

  return {
    options,
    optionsLoading,
    venues,
    formats,
    languages,
    timeBands,
    sorts,
    availableFormats,
    fetchOptions,
    selected,
    date,
    sort,
    page,
    query,
    hydrateFromQuery,
    isSelected,
    toggle,
    setDate,
    setSort,
    setPage,
    reset,
    activeCount,
    isDirty,
  };
});
