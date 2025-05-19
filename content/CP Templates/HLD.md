```c++
// Author :- Tushar || 13-04-2025 10:43:52
#include <bits/stdc++.h>
#define int long long
using namespace std;
/*
    ∧＿∧
　 (｡･ω･｡)つ━☆・*。
  ⊂/　 /　   ・゜
　しーＪ　　　     °。+ * 。　
　　　　　                .・゜
*/

vector<vector<int>> adj; 
vector<int> size, heavy, parent, depth; 
//linear tree == lt, pos == position in linear tree
vector<int> head, lt, pos; 
int idx;

void dfsHLD(int node, int chain) {
  head[node] = chain; 
  // lt[idx] = value[node]; 
  pos[node] = idx; 
  idx++; 
  
  if(heavy[node] != 0) {
    dfsHLD(heavy[node], chain);
  }

  for(auto it : adj[node]) {
    if(heavy[node] != it) {
      dfsHLD(it, it); 
    }
  }
}

void dfs(int node) {
  for(auto it : adj[node]) {
    depth[it] = depth[node] + 1; 
    parent[it] = node; 
    dfs(it); 

    size[node] += size[it]; 
    if(size[it] > size[heavy[node]]) heavy[node] = it; 
  }
  size[node]++; 

}

int lca(int a, int b) {
  
}

void solve() {
  int n; 
  cin >> n; 

  size.resize(n + 1); 
  heavy.resize(n + 1); 
  parent.resize(n + 1); 
  depth.resize(n + 1); 

  dfs(1); 

  dfsHLD(1, 1); 
  head.resize(n + 1); 
  pos.resize(n + 1); 
  idx = 0; 

  int q; 
  cin >> q; 

  while(q--) {
    int a, b; 
    cin >> a >> b; 
    cout <<lca(a, b); 
  }

  while
}

int32_t main() {
ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
int tt = 0;
cin >> tt;
while(tt--) {
  solve();
  }
  return 0;
}

```