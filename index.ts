import autoBind from "auto-bind";

class GWTHandler<T> {
  previous: Promise<void>;
  configuration: T = {} as T;

  constructor(previous = Promise.resolve()) {
    this.previous = previous;
    autoBind(this);
  }

  Given(configuration: T) {
    this.configuration = configuration;
    return this;
  }

  When(exp: Function) {
    this.previous = this.previous.then(() =>
    exp(this.configuration)
    );
    return this;
  }

  Then(exp: Function) {
    this.previous = this.previous.then(() => {
      return exp(this.configuration);
    });
    return this;
  }
}

export default GWTHandler;
