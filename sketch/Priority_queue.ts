const pq_top = 0;
const PARENT:any = (i:any) => ((i + 1) >>> 1) - 1;
const left = (i:any) => (i << 1) + 1;
const right = (i:any) => (i + 1) << 1;

function comp(a:any,b:any){
  if(a.f == b.f){
    return a.h < b.h;
  }
  return a.f < b.f;
}

class Priority_Queue {
    _heap:any;
    _comparator:any;
  // constructor(comparator = (a, b) => a.f < b.f) {
  constructor(comparator:any = comp) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  empty() {
    return this.size() == 0;
  }
  top() {
    return this._heap[pq_top];
  }
  insert(...values:any) {
    values.forEach((value:any) => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.top();
    const bottom = this.size() - 1;
    if (bottom > pq_top) {
      this._swap(pq_top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value:any) {
    const replacedValue = this.top();
    this._heap[pq_top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i:any, j:any) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i:any, j:any) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > pq_top && this._greater(node, PARENT(node))) {
      this._swap(node, PARENT(node));
      node = PARENT(node);
    }
  }
  _siftDown() {
    let node = pq_top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

/*
  This code implements a priority queue data structure using a binary heap. A priority queue is a data structure where elements are stored and removed based on their priority, as determined by a comparison function. In this implementation, the priority of an element is determined by the values of two properties f and h of the element object. The comparison function used to compare two elements is defined in the comp function.

  The Priority_Queue class has the following methods:

  constructor: creates a new instance of the priority queue with an empty heap and a comparison function passed as an argument or using the default comp function.
  size: returns the number of elements in the heap.
  empty: returns a boolean indicating whether the heap is empty.
  top: returns the element with the highest priority in the heap without removing it.
  insert: adds one or more elements to the heap and maintains the heap property by calling the _siftUp method.
  pop: removes and returns the element with the highest priority from the heap and maintains the heap property by calling the _siftDown method.
  replace: replaces the element with the highest priority in the heap with a new element and maintains the heap property by calling the _siftDown method.
  _greater: returns a boolean indicating whether the first element has a higher priority than the second element, as determined by the comparison function.
  _swap: swaps the positions of two elements in the heap.
  _siftUp: maintains the heap property by moving an element up the tree until its parent has a higher priority.
  _siftDown: maintains the heap property by moving an element down the tree until its children have a lower priority.
*/