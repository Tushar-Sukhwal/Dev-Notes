```c++
double f(double x) {
  return -x * x + 2 * x + 3;  // Change this function
}

// Returns x coordinate of maximum
double ternary_search(double l, double r) {
  const double eps = 1e-9;
  while (r - l > eps) {
    double m1 = l + (r - l) / 3;
    double m2 = r - (r - l) / 3;
    double f1 = f(m1);
    double f2 = f(m2);

    if (f1 < f2)
      l = m1;  // For maximum
    else
      r = m2;  // Change < to > for minimum
  }
  return l;
}

// For arrays/discrete values
int arr[100005];  // Global array
int discrete_ts(int l, int r) {
  while (r - l > 2) {
    int m1 = l + (r - l) / 3;
    int m2 = r - (r - l) / 3;

    if (arr[m1] < arr[m2])
      l = m1;  // For maximum
    else
      r = m2;  // Change < to > for minimum
  }

  int ans = arr[l], best = l;
  for (int i = l + 1; i <= r; i++) {
    if (arr[i] > ans) {
      ans = arr[i];
      best = i;
    }
  }
  return best;
}
```