class DisjointSetUnion {
  public p = [];
  constructor(public nodeCount: number) {
    this.p = Array(nodeCount)
      .fill(null)
      .map(() => -1);
  }
  fn(u: number) {
    if (this.p[u] === -1) {
      return u;
    } else {
      this.p[u] = this.fn(this.p[u]);
      return this.p[u];
    }
  }
  un(u: number, v: number) {
    u = this.fn(u);
    v = this.fn(v);
    if (u === v) {
      return false;
    }
    this.p[u] = v;
    return true;
  }
}

export const checkSpanningTree = (
  nodeCount: number,
  edges: [number, number, number, number][],
  selected: Set<number>
) => {
  if (selected.size !== nodeCount - 1) {
    return false;
  }
  const dsu = new DisjointSetUnion(nodeCount);
  selected.forEach((idx) => dsu.un(edges[idx][0], edges[idx][1]));
  const root = dsu.fn(0);
  for (let i = 1; i < nodeCount; i++) {
    if (dsu.fn(i) !== root) {
      return false;
    }
  }
  return true;
};

const trackMin = (
  a: [number, number, number, number],
  b: [number, number, number, number]
): [number, number, number, number] => (a[0] * a[1] > b[0] * b[1] ? b : a);

const computeValue = (
  a: number,
  b: number,
  points: [number, number][]
): [number, number, number, number] => [
  ...[...points].sort((x, y) => a * x[0] + b * x[1] - (a * y[0] + b * y[1]))[0],
  a,
  b,
];

const search = (
  lv: [number, number, number, number],
  rv: [number, number, number, number],
  points: [number, number][]
): [number, number][] => {
  const am = lv[1] - rv[1];
  const bm = rv[0] - lv[0];
  const mv = computeValue(am, bm, points);
  if (am * mv[0] + bm * mv[1] < am * lv[0] + bm * lv[1]) {
    return [
      ...search(lv, mv, points),
      [mv[0], mv[1]],
      ...search(mv, rv, points),
    ];
  }
  return [];
};
export const lowerLeftHull = (
  points: [number, number][]
): [number, number][] => {
  const lv = computeValue(1, 0, points);
  const rv = computeValue(0, 1, points);
  return [[lv[0], lv[1]], ...search(lv, rv, points), [rv[0], rv[1]]];
};
