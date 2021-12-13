import { bind } from "lodash";

interface LinkNode<T> {
  readonly data: T;
  next: LinkNode<T>;
  prev: LinkNode<T>;
}

function node<V = any, T extends LinkNode<V> = LinkNode<V>>(data: V): T {
  let newNode = {
    data: data,
    next: null,
    prev: null
  };
  newNode.next = newNode;
  newNode.prev = newNode;
  return newNode as T;
}


/* 
  view : <- node next ->  <- prev node -> null

*/

export class LinkedList<T> {

  private header: LinkNode<T> = null;
  private current: LinkNode<T> = null;

  get currentData() {
    return this.current.data;
  }


  push(data: T) {
    let nextNode = node(data);
    
    if (this.header === null) {
      this.header = nextNode;
      this.current = this.header;
      return;
    }

    nextNode.next = this.header.next;
    this.header.next.prev = nextNode;
    this.header.next = nextNode;
    nextNode.prev = this.header;

    this.header = nextNode;
  }

  next = bind(function next() {
    this.current = this.current.next;
  }, this);

  prev = bind(function next() {
    this.current = this.current.prev;
  }, this);


}
