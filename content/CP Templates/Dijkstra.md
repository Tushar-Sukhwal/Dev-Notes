```c++
vector<int> dijkstra(vector<vector<pair<int, int>>> &adj, int src) {
  int v = adj.size();
  vector<int> dist(v, INT_MAX);
  dist[src] = 0;

  priority_queue<int, vector<int>, greater<int>> pq;

  pq.push(src);

  while (!pq.empty()) {
    auto curr = pq.top();
    pq.pop();

    for (auto it : adj[curr]) {
      int u = it.first;
      int wt = it.second;

      if (wt + dist[curr] < dist[u]) {
        dist[u] = wt + dist[curr];
        pq.push(u);
      }
    }
  }
  return dist;
}
```