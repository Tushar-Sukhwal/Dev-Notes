```c++
int timer = 1;
void dfs(int node, int parent, vector<int> &vis, vector<int> adj[], int tin[],
         int low[], vector<pair<int, int>> &bridges) {
  vis[node] = 1;
  tin[node] = low[node] = timer++;
  for (auto it : adj[node]) {
    if (it == parent) continue;
    if (!vis[it]) {
      dfs(it, node, vis, adj, tin, low, bridges);
      low[node] = min(low[it], low[node]);
      if (low[it] > tin[node]) bridges.push_back({it, node});
    } else
      low[node] = min(low[node], low[it]);
  }
}

vector<pair<int, int>> findBridges(int n, vector<pair<int, int>> &edges) {
  vector<int> adj[n];
  for (auto [u, v] : edges) {
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  vector<int> vis(n);
  int tin[n], low[n];
  vector<pair<int, int>> bridges;
  dfs(0, -1, vis, adj, tin, low, bridges);
  return bridges;
}
```