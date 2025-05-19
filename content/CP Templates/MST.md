```c++
int spanningTree(int V, vector<vector<int>> adj[]) {
  priority_queue<pair<int, int>, vector<pair<int, int>>,
                 greater<pair<int, int>>>
      pq;

  vector<int> vis(V, 0);
  // {wt, node}
  pq.push({0, 0});
  int sum = 0;
  while (!pq.empty()) {
    auto it = pq.top();
    pq.pop();
    int node = it.second;
    int wt = it.first;

    if (vis[node] == 1) continue;
    // add it to the mst
    vis[node] = 1;
    sum += wt;
    for (auto it : adj[node]) {
      int adjNode = it[0];
      int edW = it[1];
      if (!vis[adjNode]) {
        pq.push({edW, adjNode});
      }
    }
  }
  return sum;
}

// another version

// Returns {MST weight, MST edges}
pair<int, vector<pair<int, int>>> primMST(int V, vector<vector<int>> adj[]) {
  priority_queue<pair<int, int>, vector<pair<int, int>>,
                 greater<pair<int, int>>>
      pq;
  vector<int> vis(V, 0);
  vector<pair<int, int>> mst;  // stores edges in MST

  pq.push({0, 0});
  int sum = 0;
  vector<int> parent(V, -1);  // track parent for MST construction

  while (!pq.empty()) {
    auto it = pq.top();
    pq.pop();
    int node = it.second;
    int wt = it.first;

    if (vis[node]) continue;

    vis[node] = 1;
    sum += wt;
    if (parent[node] != -1) mst.push_back({parent[node], node});

    for (auto it : adj[node]) {
      int adjNode = it[0];
      int edW = it[1];
      if (!vis[adjNode]) {
        parent[adjNode] = node;
        pq.push({edW, adjNode});
      }
    }
  }
  return {sum, mst};
}

// Usage:
// auto [weight, tree] = primMST(V, adj);
// tree contains edges {u,v} in MST

int spanningTree(int V, vector<vector<int>> adj[]) {
  // 1 - 2 wt = 5
  /// 1 - > (2, 5)
  // 2 -> (1, 5)

  // 5, 1, 2
  // 5, 2, 1
  vector<pair<int, pair<int, int>>> edges;
  for (int i = 0; i < V; i++) {
    for (auto it : adj[i]) {
      int adjNode = it[0];
      int wt = it[1];
      int node = i;

      edges.push_back({wt, {node, adjNode}});
    }
  }
  DisjointSet ds(V);
  sort(edges.begin(), edges.end());
  int mstWt = 0;
  for (auto it : edges) {
    int wt = it.first;
    int u = it.second.first;
    int v = it.second.second;

    if (ds.findUPar(u) != ds.findUPar(v)) {
      mstWt += wt;
      ds.unionBySize(u, v);
    }
  }

  return mstWt;
}
```