```c++
#include <bits/stdc++.h>
using namespace std;

struct DifferenceArray {
  vector<long long> diff, arr;
  int n;

  // Initialize with original array
  DifferenceArray(vector<int>& a) {
    n = a.size();
    diff.resize(n + 1, 0);
    arr = vector<long long>(a.begin(), a.end());
    build();
  }

  void build() {
    diff[0] = arr[0];
    for (int i = 1; i < n; i++) diff[i] = arr[i] - arr[i - 1];
  }

  // Add val to range [l,r]
  void update(int l, int r, long long val) {
    diff[l] += val;
    if (r + 1 < n) diff[r + 1] -= val;
  }

  // Get final array after updates
  vector<long long> getArray() {
    vector<long long> res(n);
    res[0] = diff[0];
    for (int i = 1; i < n; i++) res[i] = res[i - 1] + diff[i];
    return res;
  }

  // Get value at index after updates
  long long getValue(int idx) {
    long long sum = 0;
    for (int i = 0; i <= idx; i++) sum += diff[i];
    return sum;
  }
};

int main() {
  vector<int> arr = {1, 2, 3, 4, 5};
  DifferenceArray d(arr);

  // Add 2 to range [1,3]
  d.update(1, 3, 2);

  // Add -1 to range [2,4]
  d.update(2, 4, -1);

  vector<long long> result = d.getArray();
  // result: [1, 4, 5, 5, 4]

  cout << d.getValue(3) << "\n";  // prints 5
  return 0;
}
```