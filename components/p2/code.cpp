#include <bits/stdc++.h>
using namespace std;

pair<int,int> intersect_range(pair<int,int> r1, pair<int,int> r2){
	return make_pair(max(r1.first, r2.first), min(r1.second, r2.second));
}
pair<int,int> get_center(vector<pair<int,int> > v, int d){
	int n = v.size();
	pair<int,int> bB(0, 1000000000);
	pair<int,int> bN(0, 1000000000);
	pair<int,int> bD(-1000000000, 1000000000);
	for(int i = 0; i < n; i++){
		int nB, nN; tie(nB, nN) = v[i];
		bB = intersect_range(bB, make_pair(nB - d, nB + d));
		bN = intersect_range(bN, make_pair(nN - d, nN + d));
		bD = intersect_range(bD, make_pair(nN - nB - d, nN - nB + d));
	}
	// no such point satisfies the conditions
	if(bB.first > bB.second || bN.first > bN.second || bD.first > bD.second) return make_pair(-1, -1);
	bD = intersect_range(bD, make_pair(bN.first - bB.second, bN.second - bB.first));
	if(bD.first > bD.second) return make_pair(-1, -1);
	bN = intersect_range(bN, make_pair(bD.first + bB.first, bD.second + bB.second));
	if(bN.first > bN.second) return make_pair(-1, -1);
	bB = intersect_range(bB, make_pair(bN.first - bD.second, bN.second - bD.first));
	if(bB.first > bB.second) return make_pair(-1, -1);
	return make_pair(bB.second, bN.second);
}
char s[500005];
int main(){
	int n;
	scanf("%d",&n);
	vector<pair<int,int> > v;
	for(int i = 0; i < n; i++){
		scanf("%s", s);
		int nB = 0;
		int nN = 0;
		for(int j = 0; s[j]; j++){
			if(s[j] == 'B') nB++;
			else nN++;
		}
		v.emplace_back(nB, nN);
	}
	int lo = 0;
	int hi = 4e6;
	int mid;
	while(lo < hi){
		mid = (lo+hi)/2;
		auto ret = get_center(v, mid);
		if(ret.first < 0) lo = mid+1;
		else hi = mid;
	}
	auto ret = get_center(v, lo);
	printf("%d\n", lo);
	for(int i = 0; i < ret.first; i++) printf("B");
	for(int i = 0; i < ret.second; i++) printf("N");
	printf("\n");
	return 0;
}