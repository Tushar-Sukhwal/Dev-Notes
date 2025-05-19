```c++
#include <bits/stdc++.h>
using namespace std;
#define ll long long

bool dfs(int node, int par, vector<bool> &vis, vector<bool> &pathvis,
         vector<vector<int>> &gp) {
  bool ans = false;
  vis[node] = true;
  pathvis[node] = true;
  for (auto &child : gp[node]) {
    if (pathvis[child] == true) {
      // cout << "HERE" << endl;
      return true;
    }
    if (!vis[child]) ans |= dfs(child, node, vis, pathvis, gp);
    if (ans) {
      return true;
    }
  }
  pathvis[node] = false;
  return ans;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(0);
  int n, m;
  cin >> n >> m;
  vector<vector<int>> gp(n);
  while (m--) {
    int x, y;
    cin >> x >> y;
    gp[x].push_back(y);
  }
  vector<bool> vis(n, false), pathvis(n, false);
  bool ans = false;
  for (int i = 0; i < n; i++) {
    if (!vis[i]) {
      ans |= dfs(i, -1, vis, pathvis, gp);
    }
  }
  cout << ans << endl;
}

```

