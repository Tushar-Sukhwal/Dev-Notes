```c++
int timer = 1;
void dfs(int node, int parent, vector<int> &vis, int tin[], int low[],
         vector<int> &ap, vector<int> adj[]) {
  vis[node] = 1;
  tin[node] = low[node] = timer++;
  int child = 0;
  for (auto it : adj[node]) {
    if (it == parent) continue;
    if (!vis[it]) {
      dfs(it, node, vis, tin, low, ap, adj);
      low[node] = min(low[node], low[it]);
      if (low[it] >= tin[node] && parent != -1) ap[node] = 1;
      child++;
    } else
      low[node] = min(low[node], tin[it]);
  }
  if (child > 1 && parent == -1) ap[node] = 1;
}

vector<int> findArticulationPoints(int n, vector<pair<int, int>> &edges) {
  vector<int> adj[n];
  for (auto [u, v] : edges) {
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  vector<int> vis(n), ap(n);
  int tin[n], low[n];

  for (int i = 0; i < n; i++)
    if (!vis[i]) dfs(i, -1, vis, tin, low, ap, adj);

  vector<int> ans;
  for (int i = 0; i < n; i++)
    if (ap[i]) ans.push_back(i);

  return ans.empty() ? vector<int>{-1} : ans;
}
```
