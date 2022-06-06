

export class Reader<T> {
  private stream: ReadableStreamDefaultReader<T>;

  constructor(private readble: ReadableStream<T>) {
    this.stream = readble.getReader();
  }

  onRead(func: (value: T) => void) {

    let run = async () => {
      while (true) {
        let readGen = await this.stream.read();
        if (readGen.done) {
          break;
        }
        func(readGen.value);
      }
    };
    run();
  }
}
