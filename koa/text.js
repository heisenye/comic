async function foo() {
  return Promise.reject('error')
}

const bar = async () => {
  return foo()
    .then((res) => res)
    .catch((err)=> err)
}

const baz = async () => {
  const a = await bar()
  console.log(a)
}


baz()