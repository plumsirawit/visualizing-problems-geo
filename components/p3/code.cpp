#include <bits/stdc++.h>
using namespace std;
 
function<bool(tuple<int,int,int,int>,tuple<int,int,int,int>)> get_comp(int a, int b){
	return [a, b](tuple<int,int,int,int> x, tuple<int,int,int,int> y){
		return a*get<2>(x) + b*get<3>(x) < a*get<2>(y) + b*get<3>(y);
	};
}
 
int n, m;
vector<tuple<int,int,int,int> > edges;
 
class DSU{
	private:
		int p[256];
	public:
		DSU(){
			memset(p, -1, sizeof(p));
		}
		int f(int u){
			if(p[u] == -1) return u;
			else return p[u] = f(p[u]);
		}
		bool u(int x, int y){
			x = f(x); y = f(y);
			if(x == y) return false;
			p[x] = y;
			return true;
		}
};
 
tuple<int,int,int,int> compute_value(int a, int b){
	// Careful! This function takes O(M log M + N)
	sort(edges.begin(), edges.end(), get_comp(a,b));
	DSU d;
	int st = 0, sc = 0;
	for(auto e : edges){
		int x, y, t, c; tie(x, y, t, c) = e;
		if(d.u(x, y)){
			st += t;
			sc += c;
		}
	}
	return make_tuple(st, sc, a, b);
}
 
tuple<int,int,int,int> track_min(tuple<int,int,int,int> x, tuple<int,int,int,int> y){
	if(1ll*get<0>(x)*get<1>(x) > 1ll*get<0>(y)*get<1>(y)) return y;
	else return x;
}
 
tuple<int,int,int,int> search(tuple<int,int,int,int> lv, tuple<int,int,int,int> rv){
	int am = get<1>(lv) - get<1>(rv);
	int bm = get<0>(rv) - get<0>(lv);
	auto ret = track_min(lv, rv);
	auto mv = compute_value(am, bm);
	ret = track_min(ret, mv);
	if(am * get<0>(mv) + bm * get<1>(mv) < am * get<0>(lv) + bm * get<1>(lv)){
		ret = track_min(ret, search(lv, mv));
		ret = track_min(ret, search(mv, rv));
	}
	return ret;
}
 
int main(){
	scanf("%d%d",&n,&m);
	int x, y, t, c;
	for(int i = 0; i < m; i++){
		scanf("%d%d%d%d",&x,&y,&t,&c);
		edges.emplace_back(x,y,t,c);
	}
	auto lv = compute_value(1, 0);
	auto rv = compute_value(0, 1);
	auto ans = search(lv, rv);
	printf("%d %d\n", get<0>(ans), get<1>(ans));
	sort(edges.begin(), edges.end(), get_comp(get<2>(ans), get<3>(ans)));
	DSU d;
	for(auto e : edges){
		tie(x, y, t, c) = e;
		if(d.u(x, y)) printf("%d %d\n", x, y);
	}
	return 0;
}