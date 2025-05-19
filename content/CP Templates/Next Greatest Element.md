```c++
vector<int> NGE(vector<int> v) {  // O(2N) at worst possible case
  int n = v.size();
  vector<int> nge(n);
  stack<int> st;
  for (int i = n - 1; i >= 0; i--) {
    while (!st.empty() && st.top() <= v[i]) {
      st.pop();
    }
    if (st.empty()) {
      nge[i] = -1;
    } else {
      nge[i] = st.top();
    }
    st.push(v[i]);
  }
}
```