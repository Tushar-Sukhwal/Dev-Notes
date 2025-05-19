```c++
// Prefix that matches any substring of the string
// Largest prefix that matches a suffix

vector<int> kmp(string s) {
  vector<int> lps(s.size(), 0);
  for (int i = 1; i < s.size(); i++) {
    int prev_idx = lps[i - 1];
    while (prev_idx > 0 && s[i] != s[prev_idx]) {
      prev_idx = lps[prev_idx - 1];
    }
    if (s[i] == s[prev_idx]) {
      prev_idx++;
    }
    lps[i] = prev_idx;
  }
  return lps;
}

vector<int> kmp_search(string text, string pattern) {
  string combined = pattern + "#" + text;
  vector<int> lps = kmp(combined);
  vector<int> res;

  int m = pattern.size();
  for (int i = m + 1; i < lps.size(); i++) {
    if (lps[i] == m) {
      res.push_back(i - 2 * m);
    }
  }
  return res;
}
```