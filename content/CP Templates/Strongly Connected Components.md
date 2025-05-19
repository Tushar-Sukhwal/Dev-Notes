```c++
void dfs(int node, vector<int> &vis, vector<int> adj[], stack<int> &st) {
  vis[node] = 1;
  for (auto it : adj[node]) {
    if (!vis[it]) dfs(it, vis, adj, st);
  }
  st.push(node);
}

void dfs3(int node, vector<int> &vis, vector<int> adjT[], vector<int> &comp) {
  vis[node] = 1;
  comp.push_back(node);
  for (auto it : adjT[node]) {
    if (!vis[it]) dfs3(it, vis, adjT, comp);
  }
}

// Returns {number of SCCs, components}
pair<int, vector<vector<int>>> kosaraju(int V, vector<int> adj[]) {
  vector<int> vis(V, 0);
  stack<int> st;
  for (int i = 0; i < V; i++)
    if (!vis[i]) dfs(i, vis, adj, st);

  vector<int> adjT[V];
  for (int i = 0; i < V; i++) {
    vis[i] = 0;
    for (auto it : adj[i]) adjT[it].push_back(i);
  }

  vector<vector<int>> sccs;
  int scc_count = 0;
  while (!st.empty()) {
    int node = st.top();
    st.pop();
    if (!vis[node]) {
      vector<int> comp;
      dfs3(node, vis, adjT, comp);
      sccs.push_back(comp);
      scc_count++;
    }
  }
  return {scc_count, sccs};
}

// Usage:
// auto [count, components] = kosaraju(V, adj);
// count = number of SCCs
// components[i] = nodes in ith SCC
```