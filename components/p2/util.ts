export const phi = (s: string): [number, number] =>
  Array.from(s).reduce(
    (pre, cur) => {
      return cur === "B" ? [pre[0] + 1, pre[1]] : [pre[0], pre[1] + 1];
    },
    [0, 0]
  );

const intersectRange = (
  r1: [number, number],
  r2: [number, number]
): [number, number] => [Math.max(r1[0], r2[0]), Math.min(r1[1], r2[1])];

const getCenter = (v: [number, number][], d: number): [number, number] => {
  const n = v.length;
  let bB: [number, number] = [0, 1000000000];
  let bN: [number, number] = [0, 1000000000];
  let bD: [number, number] = [0, 1000000000];
  for (let i = 0; i < n; i++) {
    let [nB, nN] = v[i];
    bB = intersectRange(bB, [nB - d, nB + d]);
    bN = intersectRange(bN, [nN - d, nN + d]);
    bD = intersectRange(bD, [nN - nB - d, nN - nB + d]);
  }
  // no such point satisfies the conditions
  if (bB[0] > bB[1] || bN[0] > bN[1] || bD[0] > bD[1]) return [-1, -1];
  bD = intersectRange(bD, [bN[0] - bB[1], bN[1] - bB[0]]);
  if (bD[0] > bD[1]) return [-1, -1];
  bN = intersectRange(bN, [bD[0] + bB[0], bD[1] + bB[1]]);
  if (bN[0] > bN[1]) return [-1, -1];
  bB = intersectRange(bB, [bN[0] - bD[1], bN[1] - bD[0]]);
  if (bB[0] > bB[1]) return [-1, -1];
  return [bB[1], bN[1]];
};

export const solve = (strings: string[]): [number, number, number] => {
  let lo = 0;
  let hi = 4e6;
  const v = strings.map(phi);
  let ret: [number, number];
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    ret = getCenter(v, mid);
    if (ret[0] < 0) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  ret = getCenter(v, lo);
  return [...ret, lo];
};
