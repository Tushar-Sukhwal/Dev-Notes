```c++
vector<int> P;
void dfs(vector<int>& vis, int node, vector<vector<int>>& adj) {
  vis[node] = 1;
  for (int i = 0; i < adj[node].size(); i++) {
    if (!vis[adj[node][i]]) {
      vis[adj[node][i]] = 1;
      dfs(vis, adj[node][i], adj);
    }
  }
  P.push_back(node);
}
vector<int> topologicalSort(vector<vector<int>>& adj) {
  int N = adj.size();
  vector<int> vis(N, 0);
  for (int i = 0; i < adj.size(); i++) {
    if (!vis[i]) {
      dfs(vis, i, adj);
    }
  }
  reverse(P.begin(), P.end());
  return P;
}


vector<int> kahntopo(vector<bool>& vis, vector<vector<int>>& gp) {
  int n = gp.size();
  vector<int> degree(n, 0);
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < gp[i].size(); j++) {
      degree[gp[i][j]]++;
    }
  }
  queue<int> q;
  for (int i = 0; i < n; i++) {
    if (degree[i] == 0) {
      q.push(i);
    }
  }
  vector<int> topo;
  while (!q.empty()) {
    int node = q.front();
    topo.push_back(q.front());
    q.pop();
    for (auto child : gp[node]) {
      degree[child]--;
      if (degree[child] == 0) {
        q.push(child);
      }
    }
  }
  return topo;
}

```