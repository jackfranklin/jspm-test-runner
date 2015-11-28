let assertions = [];

function describe(name, fn) {
  assertions.push({ name, fn });
}

export { describe, assertions };
