```c++
// compact implementaion

const int N = 2e5 + 5, L = 20;
vector<int> g[N];
int up[N][L], tin[N], tout[N], d[N], T;

void dfs(int u, int p) {
  tin[u] = ++T;
  up[u][0] = p;
  for (int i = 1; i < L; i++) up[u][i] = up[up[u][i - 1]][i - 1];
  for (int v : g[u])
    if (v != p) d[v] = d[u] + 1, dfs(v, u);
  tout[u] = ++T;
}

bool anc(int u, int v) { return tin[u] <= tin[v] && tout[u] >= tout[v]; }

int lca(int u, int v) {
  if (anc(u, v)) return u;
  if (anc(v, u)) return v;
  for (int i = L - 1; i >= 0; i--)
    if (!anc(up[u][i], v)) u = up[u][i];
  return up[u][0];
}

int dist(int u, int v) { return d[u] + d[v] - 2 * d[lca(u, v)]; }

int lift(int u, int k) {
  if (k > d[u]) return -1;
  for (int i = L - 1; i >= 0; i--)
    if (k >= (1 << i)) u = up[u][i], k -= (1 << i);
  return u;
}

// Call this in main before queries
void init(int root = 0) {
  T = 0;
  d[root] = 0;
  dfs(root, root);
}

//
//
//
//
//
//
//
//
//

// class implemenation
class LCA {
 private:
  vector<vector<int>> up;
  vector<int> tin, tout, depth;
  int n, timer, L;

  void dfs(int node, int parent, vector<vector<int>>& adj) {
    tin[node] = ++timer;
    up[node][0] = parent;

    // Build binary lifting table
    for (int i = 1; i < L; i++) {
      up[node][i] = up[up[node][i - 1]][i - 1];
    }

    // Process children
    for (int child : adj[node]) {
      if (child != parent) {
        depth[child] = depth[node] + 1;
        dfs(child, node, adj);
      }
    }

    tout[node] = ++timer;
  }

  bool is_ancestor(int u, int v) {
    return tin[u] <= tin[v] && tout[u] >= tout[v];
  }

  int get_lca(int u, int v) {
    if (is_ancestor(u, v)) return u;
    if (is_ancestor(v, u)) return v;

    for (int i = L - 1; i >= 0; i--) {
      if (!is_ancestor(up[u][i], v)) {
        u = up[u][i];
      }
    }
    return up[u][0];
  }

 public:
  // Initialize with number of nodes and adjacency list
  // Note: Works for both 0-indexed and 1-indexed
  LCA(int nodes, vector<vector<int>>& adj, int root = 0) {
    n = nodes;
    timer = 0;
    L = ceil(log2(n)) + 1;

    up.assign(n, vector<int>(L));
    tin.resize(n);
    tout.resize(n);
    depth.assign(n, 0);

    dfs(root, root, adj);
  }

  // Get LCA of two nodes
  int get_lca_nodes(int u, int v) { return get_lca(u, v); }

  // Get distance between two nodes
  int get_distance(int u, int v) {
    int lca = get_lca(u, v);
    return depth[u] + depth[v] - 2 * depth[lca];
  }

  // Lift node u by k levels
  int lift_node(int u, int k) {
    if (k > depth[u]) return -1;

    for (int i = L - 1; i >= 0; i--) {
      if (k >= (1 << i)) {
        u = up[u][i];
        k -= (1 << i);
      }
    }
    return u;
  }

  // Get kth ancestor of node u
  int get_kth_ancestor(int u, int k) { return lift_node(u, k); }

  // Get node level/depth
  int get_depth(int node) { return depth[node]; }
};
```