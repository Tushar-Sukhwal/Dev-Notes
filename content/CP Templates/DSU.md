```c++
class DisjointSet {
  vector<int> rank, parent, size;

 public:
  DisjointSet(int n) {
    rank.resize(n + 1, 0);
    parent.resize(n + 1);
    size.resize(n + 1);
    for (int i = 0; i <= n; i++) {
      parent[i] = i;
      size[i] = 1;
    }
  }
  int findUPar(int node) {
    if (node == parent[node]) return node;
    return parent[node] = findUPar(parent[node]);
  }
  void unionByRank(int u, int v) {
    int ulp_u = findUPar(u);
    int ulp_v = findUPar(v);
    if (ulp_u == ulp_v) return;
    if (rank[ulp_u] < rank[ulp_v]) {
      parent[ulp_u] = ulp_v;
    } else if (rank[ulp_u] > rank[ulp_v]) {
      parent[ulp_v] = ulp_u;
    } else {
      parent[ulp_v] = ulp_u;
      rank[ulp_u]++;
    }
  }
  void unionBySize(int u, int v) {
    int ulp_u = findUPar(u);
    int ulp_v = findUPar(v);
    if (ulp_u == ulp_v) return;
    if (size[ulp_u] < size[ulp_v]) {
      parent[ulp_u] = ulp_v;
      size[ulp_v] += size[ulp_u];
    } else {
      parent[ulp_v] = ulp_u;
      size[ulp_u] += size[ulp_v];
    }
  }
};
// ------------------------------------------------------------------------------------------------------------------------
// compact implementaion
const int N = 1e5 + 5;
int parent[N], sz[N];

void make_set(int n) {
  for (int i = 0; i <= n; i++) {
    parent[i] = i;
    sz[i] = 1;
  }
}

int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }

void unite(int u, int v) {
  u = find(u), v = find(v);
  if (u == v) return;
  if (sz[u] < sz[v]) swap(u, v);
  parent[v] = u;
  sz[u] += sz[v];
}

// make_set(n);
// unite(u, v);
// find(u);


```