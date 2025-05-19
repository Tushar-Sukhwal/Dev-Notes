```c++
struct Node {
  Node* links[26];
  bool flag = false;
  bool containsref(char ch) { return links[ch - 'a'] != NULL; }
  void putref(char ch, Node* ref) { links[ch - 'a'] = ref; }
  Node* getref(char ch) { return links[ch - 'a']; }
  void setend() { flag = true; }
  bool isend() { return flag; }
};

class Trie {
 private:
  Node* root;

 public:
  Trie() { root = new Node(); }
  void insert(string word) {  // O(word.size())
    Node* curr = root;
    for (int i = 0; i < word.size(); i++) {
      if (!curr->containsref(word[i])) {
        curr->putref(word[i], new Node());
      }
      curr = curr->getref(word[i]);
    }
    curr->setend();
  }

  bool search(string word) {  // O(word.size())
    Node* curr = root;
    for (int i = 0; i < word.size(); i++) {
      if (!curr->containsref(word[i])) {
        return false;
      }
      curr = curr->getref(word[i]);
    }
    if (curr->isend()) {
      return true;
    }
    return false;
  }

  bool startswith(string prefix) {  // O(prefix.size())
    Node* curr = root;
    for (int i = 0; i < prefix.size(); i++) {
      if (!curr->containsref(prefix[i])) {
        return false;
      }
      curr = curr->getref(prefix[i]);
    }
    return true;
  }
};
```