```c++
// Basic Kadane's - returns max sum
long long kadane(vector<int>& arr) {
  long long maxSoFar = arr[0], maxEndingHere = arr[0];
  for (int i = 1; i < arr.size(); i++) {
    maxEndingHere = max(1LL * arr[i], maxEndingHere + arr[i]);
    maxSoFar = max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

// Kadane's with subarray indices
array<long long, 3> kadaneWithIndex(vector<int>& arr) {
  long long maxSoFar = arr[0], maxEndingHere = arr[0];
  int start = 0, end = 0, s = 0;
  for (int i = 1; i < arr.size(); i++) {
    if (maxEndingHere + arr[i] < arr[i]) {
      maxEndingHere = arr[i];
      s = i;
    } else {
      maxEndingHere = maxEndingHere + arr[i];
    }
    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = s;
      end = i;
    }
  }
  return {maxSoFar, start, end};
}

// Circular array maximum sum
long long circularKadane(vector<int>& arr) {
  long long normalSum = kadane(arr);
  if (normalSum < 0) return normalSum;

  long long totalSum = 0;
  for (int i = 0; i < arr.size(); i++) {
    totalSum += arr[i];
    arr[i] = -arr[i];
  }
  long long circularSum = totalSum + kadane(arr);
  return max(normalSum, circularSum);
}
```