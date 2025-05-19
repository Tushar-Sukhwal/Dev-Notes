```c++
template <typename Node, typename Update>
struct SegTree {
  vector<Node> tree;
  vector<int> arr;  // type may change
  int n;
  int s;
  SegTree(int a_len, vector<int> &a) {  // change if type updated
    arr = a;
    n = a_len;
    s = 1;
    while (s < 2 * n) {
      s = s << 1;
    }
    tree.resize(s);
    fill(tree.begin(), tree.end(), Node());
    build(0, n - 1, 1);
  }
  void build(int start, int end, int index)  // Never change this
  {
    if (start == end) {
      tree[index] = Node(arr[start]);
      return;
    }
    int mid = (start + end) / 2;
    build(start, mid, 2 * index);
    build(mid + 1, end, 2 * index + 1);
    tree[index].merge(tree[2 * index], tree[2 * index + 1]);
  }
  void update(int start, int end, int index, int query_index,
              Update &u)  // Never Change this
  {
    if (start == end) {
      u.apply(tree[index]);
      return;
    }
    int mid = (start + end) / 2;
    if (mid >= query_index)
      update(start, mid, 2 * index, query_index, u);
    else
      update(mid + 1, end, 2 * index + 1, query_index, u);
    tree[index].merge(tree[2 * index], tree[2 * index + 1]);
  }
  Node query(int start, int end, int index, int left,
             int right) {  // Never change this
    if (start > right || end < left) return Node();
    if (start >= left && end <= right) return tree[index];
    int mid = (start + end) / 2;
    Node l, r, ans;
    l = query(start, mid, 2 * index, left, right);
    r = query(mid + 1, end, 2 * index + 1, left, right);
    ans.merge(l, r);
    return ans;
  }
  void make_update(int index,
                   int val) {         // pass in as many parameters as required
    Update new_update = Update(val);  // may change
    update(0, n - 1, 1, index, new_update);
  }
  Node make_query(int left, int right) {
    return query(0, n - 1, 1, left, right);
  }
};

struct Node1 {
  int val;    // may change
  Node1() {   // Identity element
    val = 0;  // may change
  }
  Node1(int p1) {  // Actual Node
    val = p1;      // may change
  }
  void merge(Node1 &l, Node1 &r) {  // Merge two child nodes
    val = l.val ^ r.val;            // may change
  }
};

struct Update1 {
  int val;           // may change
  Update1(int p1) {  // Actual Update
    val = p1;        // may change
  }
  void apply(Node1 &a) {  // apply update to given node
    a.val = val;          // may change
  }
};

// compact

const int N = 2e5 + 5;
int tree[4 * N], a[N], n;

void build(int node, int start, int end) {
  if (start == end) {
    tree[node] = a[start];
    return;
  }
  int mid = (start + end) >> 1;
  build(2 * node, start, mid);
  build(2 * node + 1, mid + 1, end);
  tree[node] = tree[2 * node] ^ tree[2 * node + 1];  // Change operation here
}

void update(int node, int start, int end, int idx, int val) {
  if (start == end) {
    tree[node] = val;
    a[idx] = val;
    return;
  }
  int mid = (start + end) >> 1;
  if (idx <= mid)
    update(2 * node, start, mid, idx, val);
  else
    update(2 * node + 1, mid + 1, end, idx, val);
  tree[node] = tree[2 * node] ^ tree[2 * node + 1];  // Change operation here
}

int query(int node, int start, int end, int l, int r) {
  if (r < start || end < l) return 0;  // Change identity element
  if (l <= start && end <= r) return tree[node];
  int mid = (start + end) >> 1;
  return query(2 * node, start, mid, l, r) ^
         query(2 * node + 1, mid + 1, end, l, r);  // Change operation here
}

// Usage example:
// int n = array_size;
// for(int i = 0; i < n; i++) cin >> a[i];
// build(1, 0, n-1);
// update(1, 0, n-1, idx, val);
// int result = query(1, 0, n-1, left, right);

class SegmentTree {
 private:
  vector<int> tree;
  int n;

  void build(int node, int l, int r, const vector<int> &data) {
    if (l == r) {
      tree[node] = data[l];
    } else {
      int mid = (l + r) / 2;
      build(2 * node, l, mid, data);
      build(2 * node + 1, mid + 1, r, data);
      tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
  }

  int query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return tree[node];
    int mid = (l + r) / 2;
    return query(2 * node, l, mid, ql, qr) +
           query(2 * node + 1, mid + 1, r, ql, qr);
  }

  void update(int node, int l, int r, int idx, int val) {
    if (l == r) {
      tree[node] = val;
    } else {
      int mid = (l + r) / 2;
      if (idx <= mid)
        update(2 * node, l, mid, idx, val);
      else
        update(2 * node + 1, mid + 1, r, idx, val);
      tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
  }

 public:
  SegmentTree(int size) {
    n = size;
    tree.assign(4 * n, 0);
  }

  void build(const vector<int> &data) { build(1, 0, n - 1, data); }

  int query(int l, int r) { return query(1, 0, n - 1, l, r); }

  void update(int idx, int val) { update(1, 0, n - 1, idx, val); }
};
```